import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'static',
  build: {
    format: 'directory',
  },
  vite: {
    optimizeDeps: {
      exclude: ['@astrojs/cloudflare/entrypoints'],
    },
  },
  integrations: [tailwind({
    configFile: './tailwind.config.mjs',
    applyBaseStyles: false,
  })],
  site: 'https://eventnexus.eu',
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
});
