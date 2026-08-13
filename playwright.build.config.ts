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
    timeout: 60000,
    env: {
      SUPABASE_URL: 'http://localhost:54340',
      PUBLIC_SUPABASE_URL: 'http://localhost:54340',
      PUBLIC_SUPABASE_ANON_KEY: process.env.PUBLIC_SUPABASE_ANON_KEY || '',
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
      SUPABASE_PROJECT_ID: 'local',
      SUPABASE_MOCK_MODE: 'false',
      RESEND_API_KEY: 'fake-resend-key',
      RESEND_FROM_EMAIL: 'test@eventnexus.eu',
      LEAD_NOTIFICATION_EMAIL: 'test@eventnexus.eu',
      RESEND_WEBHOOK_SECRET: 'whsec_dGVzdC1zZWNyZXQtZm9yLXBsYXl3cmlnaHQ=',
      TURNSTILE_SITE_KEY: 'fake-site-key',
      TURNSTILE_SECRET_KEY: '',
      PUBLIC_ANALYTICS_ID: 'G-TEST123456',
      PUBLIC_ANALYTICS_ENABLED: 'false',
      RETENTION_LEAD_DAYS: '30',
      RETENTION_WEBHOOK_EVENT_DAYS: '30',
      RETENTION_APP_LOG_DAYS: '30',
    },
  },
  webServer: {
    command: 'npx wrangler pages dev dist --port 4321',
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: true,
    timeout: 180000,
    env: {
      NODE_ENV: 'test',
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'chromium-mobile',
      use: { ...devices['Pixel 5'] },
    },
  ],
});
