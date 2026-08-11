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
  webServer: {
    command: 'npx serve dist -l 4321',
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: true,
    timeout: 120000,
    env: {
      NODE_ENV: 'test',
      RESEND_WEBHOOK_SECRET: 'whsec_dGVzdC1zZWNyZXQtZm9yLXBsYXl3cmlnaHQ=',
      WEBHOOK_TEST_MODE: 'true',
      SUPABASE_URL: 'http://localhost:54321',
      SUPABASE_SERVICE_ROLE_KEY: 'fake-service-role-key',
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'chromium-mobile',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
