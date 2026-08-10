import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: 'http://127.0.0.1:4325',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium-disabled',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://127.0.0.1:4327' },
      webServer: {
        command: 'node scripts/serve-disabled.js',
        url: 'http://127.0.0.1:4327',
        reuseExistingServer: false,
        timeout: 120000,
      },
    },
    {
      name: 'chromium-enabled',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://127.0.0.1:4325' },
      webServer: {
        command: 'node scripts/serve-enabled.js',
        url: 'http://127.0.0.1:4325',
        reuseExistingServer: false,
        timeout: 120000,
      },
    },
  ],
  testMatch: /analytics\.spec\.ts$/,
});
