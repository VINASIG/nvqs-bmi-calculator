import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://vinasig.github.io',
  base: '/nvqs-bmi-calculator',
  output: 'static',
  build: { format: 'directory', inlineStylesheets: 'never' },
});
