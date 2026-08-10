import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: 'http://127.0.0.1:4321',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      webServer: {
        command: 'npx astro dev --host 127.0.0.1 --port 4321',
        url: 'http://127.0.0.1:4321',
        reuseExistingServer: true,
        timeout: 120000,
        env: {
          NODE_ENV: 'test',
          RESEND_WEBHOOK_SECRET: 'whsec_dGVzdC1zZWNyZXQtZm9yLXBsYXl3cmlnaHQ=',
          WEBHOOK_TEST_MODE: 'true',
        },
      },
    },
    {
      name: 'chromium-analytics',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://127.0.0.1:4325' },
      webServer: {
        command: 'node scripts/start-static-analytics.js',
        url: 'http://127.0.0.1:4325',
        reuseExistingServer: true,
        timeout: 120000,
      },
    },
  ],
});
