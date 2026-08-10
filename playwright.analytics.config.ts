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
  webServer: {
    command: 'node scripts/start-static-analytics-enabled.js',
    url: 'http://127.0.0.1:4325',
    reuseExistingServer: true,
    timeout: 120000,
  },
  projects: [
    {
      name: 'chromium-analytics',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  testMatch: /analytics\.spec\.ts$/,
});
