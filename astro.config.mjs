import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static',
  build: {
    format: 'directory',
  },
  integrations: [tailwind({
    applyBaseStyles: false,
  })],
  site: 'https://eventnexus.eu',
});
