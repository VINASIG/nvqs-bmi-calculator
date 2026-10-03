import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { FileSystemConfigLoader, HtmlValidate } from 'html-validate';
import {
  digest,
  readLocal,
  record,
  parseJson,
  text,
  repositoryRoot,
  writeOutput,
} from './local.ts';

const routes = [
  { file: 'index.html', path: '', language: 'vi' },
  { file: 'en/index.html', path: 'en/', language: 'en' },
];
const sitemap = (
  await readLocal(repositoryRoot, 'dist/sitemap.xml')
).toString();
for (const route of routes) {
  const html = (await readLocal(repositoryRoot, 'dist/' + route.file)).toString(
    'utf8',
  );
  const validation = await new HtmlValidate(
    new FileSystemConfigLoader(),
  ).validateString(html, 'dist/' + route.file);
  assert(
    validation.valid,
    JSON.stringify(
      validation.results.flatMap((result) => result.messages),
      null,
      2,
    ),
  );
  const canonical =
    'https://vinasig.github.io/nvqs-bmi-calculator/' + route.path;
  assert(html.includes('href="' + canonical + '"'));
  assert(html.includes('<html lang="' + route.language + '"'));
  assert(
    html.includes('application/ld+json') && html.includes('WebApplication'),
  );
  assert(sitemap.includes('<loc>' + canonical + '</loc>'));
  assert.equal(
    (html.match(/hreflang=/g) ?? []).length,
    3,
    'Two actual translations and x-default',
  );
  assert(html.includes('id="other-tool"'));
  assert(!html.includes('data-profile='));
  const match = /<script type="application\/ld\+json">(.*?)<\/script>/s.exec(
    html,
  );
  assert(match?.[1]);
  const schema = record(parseJson(Buffer.from(match[1])));
  assert.equal(schema['url'], canonical);
  assert.equal(schema['inLanguage'], route.language);
  assert.equal(schema['@type'], 'WebApplication');
  for (const name of ['height', 'weight'])
    assert(!new RegExp('name="' + name + '"').test(html));
}
const manifest = record(
  parseJson(await readLocal(repositoryRoot, 'docs/asset-manifest.json')),
);
const assets = Object.entries(record(manifest['files']));
// Add only the reviewed Reversed export. Every existing digest stays fixed.
assert.equal(assets.length, 9);
for (const [file, expected] of assets) {
  assert(file.startsWith('public/'));
  const bytes = await readLocal(repositoryRoot, file);
  assert.equal(digest(bytes), text(expected), 'Changed asset ' + file);
  assert.deepEqual(
    await readLocal(repositoryRoot, 'dist/' + file.slice(7)),
    bytes,
    'Published asset differs ' + file,
  );
}
const notice = await readFile(
  path.join(repositoryRoot, 'node_modules/@lucide/astro/LICENSE'),
);
assert.deepEqual(
  await readLocal(repositoryRoot, 'public/licenses/lucide.txt'),
  notice,
);
assert.deepEqual(
  await readLocal(repositoryRoot, 'dist/licenses/lucide.txt'),
  notice,
);
await writeOutput(
  repositoryRoot,
  'output/checks/built.json',
  JSON.stringify({
    status: 'PASS',
    routes,
    preservedAssets: assets.length,
    preservedNotices: 1,
  }) + '\n',
);
console.log(
  'Both pages, metadata, source notices and preserved asset bytes passed.',
);
