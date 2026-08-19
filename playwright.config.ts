import { defineConfig, devices } from '@playwright/test';
import fs from 'fs';
import path from 'path';

function loadDevVars(): Record<string, string> {
  try {
    const content = fs.readFileSync(
      path.resolve(process.cwd(), '.dev.vars'),
      'utf8'
    );
    const vars: Record<string, string> = {};
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIndex = trimmed.indexOf('=');
      if (eqIndex === -1) continue;
      const key = trimmed.slice(0, eqIndex).trim();
      const value = trimmed.slice(eqIndex + 1).trim();
      vars[key] = value;
    }
    return vars;
  } catch {
    return {};
  }
}

const devVars = loadDevVars();

const webServerEnv: Record<string, string> = {
  NODE_ENV: 'test',
  RESEND_WEBHOOK_SECRET: 'whsec_dGVzdC1zZWNyZXQtZm9yLXBsYXl3cmlnaHQ=',
  WEBHOOK_TEST_MODE: 'true',
};

if (devVars.SUPABASE_URL) {
  webServerEnv.SUPABASE_URL = devVars.SUPABASE_URL;
} else if (!process.env.SUPABASE_URL) {
  webServerEnv.SUPABASE_URL = 'http://localhost:54340';
}

if (devVars.SUPABASE_SERVICE_ROLE_KEY) {
  webServerEnv.SUPABASE_SERVICE_ROLE_KEY = devVars.SUPABASE_SERVICE_ROLE_KEY;
} else if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  webServerEnv.SUPABASE_SERVICE_ROLE_KEY = '';
}

if (devVars.PUBLIC_SUPABASE_ANON_KEY) {
  webServerEnv.PUBLIC_SUPABASE_ANON_KEY = devVars.PUBLIC_SUPABASE_ANON_KEY;
} else if (!process.env.PUBLIC_SUPABASE_ANON_KEY) {
  webServerEnv.PUBLIC_SUPABASE_ANON_KEY = '';
}

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
    command: 'npx astro dev --host 127.0.0.1 --port 4321',
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: true,
    timeout: 120000,
    env: webServerEnv,
  },
  testIgnore: /analytics\.spec\.ts$/,
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
