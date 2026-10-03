import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

const workflow = await readFile(
  new URL('../.github/workflows/deploy.yml', import.meta.url),
  'utf8',
);

await test('publication requires all six isolated browser and operating-system jobs', () => {
  const browsers = workflow.match(/browser:\s*\[([^\]]+)\]/u)?.[1];
  const systems = workflow.match(/os:\s*\[([^\]]+)\]/u)?.[1];
  assert(browsers && systems);
  assert.deepEqual(
    browsers.split(',').map((name) => name.trim()),
    ['chromium', 'firefox', 'webkit'],
  );
  assert.deepEqual(
    systems.split(',').map((name) => name.trim()),
    ['ubuntu-latest', 'windows-latest'],
  );
  assert.match(workflow, /^\s+fail-fast: false$/mu);
  assert(workflow.includes('install --with-deps ${{ matrix.browser }}'));
  assert(workflow.includes('test:browser -- --project=${{ matrix.browser }}'));
  assert.match(workflow, /^\s+needs: verify$/mu);
  assert(
    workflow.includes(
      "if: runner.os == 'Linux' && matrix.browser == 'chromium'",
    ),
  );
  assert(
    workflow.includes(
      'name: verification-${{ matrix.os }}-${{ matrix.browser }}',
    ),
  );
  assert.match(workflow, /^\s+cancel-in-progress: true$/mu);
});
