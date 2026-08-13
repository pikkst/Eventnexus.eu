import { test, expect } from '@playwright/test';

const supabaseUrl = process.env.SUPABASE_URL || 'http://localhost:54340';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const anonKey = process.env.PUBLIC_SUPABASE_ANON_KEY || '';

async function createTestUser(
  email: string,
  password: string,
  role: 'admin' | 'user'
) {
  const signupResponse = await fetch(`${supabaseUrl}/auth/v1/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: anonKey,
    },
    body: JSON.stringify({ email, password }),
  });

  if (
    !signupResponse.ok &&
    signupResponse.status !== 400 &&
    signupResponse.status !== 422
  ) {
    const text = await signupResponse.text();
    throw new Error(`Signup failed: ${signupResponse.status} ${text}`);
  }

  let userId: string | undefined;

  if (signupResponse.ok) {
    const signupData = await signupResponse.json();
    userId = signupData.user?.id;
  }

  if (!userId) {
    const tokenResponse = await fetch(
      `${supabaseUrl}/auth/v1/token?grant_type=password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: anonKey,
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (tokenResponse.ok) {
      const tokenData = await tokenResponse.json();
      userId = tokenData.user?.id;
    }
  }

  if (userId) {
    await fetch(`${supabaseUrl}/rest/v1/profiles`, {
      method: 'POST',
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ id: userId, role, full_name: email, email }),
    });
  }

  return { email, password };
}

async function getSessionTokens(email: string, password: string) {
  const response = await fetch(
    `${supabaseUrl}/auth/v1/token?grant_type=password`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: anonKey,
      },
      body: JSON.stringify({ email, password }),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Password grant failed: ${response.status} ${text}`);
  }

  const data = await response.json();
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  };
}

async function setAuthCookies(
  page: Playwright.Page,
  accessToken: string,
  refreshToken: string
) {
  await page.context().addCookies([
    {
      name: 'sb-access-token',
      value: accessToken,
      domain: '127.0.0.1',
      path: '/',
      httpOnly: true,
      sameSite: 'Lax',
    },
    {
      name: 'sb-refresh-token',
      value: refreshToken,
      domain: '127.0.0.1',
      path: '/',
      httpOnly: true,
      sameSite: 'Lax',
    },
  ]);
}

async function loginAs(page: Playwright.Page, email: string, password: string) {
  await page.goto('/admin/login');
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);

  const [response] = await Promise.all([
    page.waitForResponse('**/api/admin/auth/login'),
    page.click('button[type="submit"]'),
  ]);

  expect(response.status()).toBe(303);

  await page.waitForTimeout(3000);
  expect(page.url()).toContain('/admin');
}

async function adminRequest(
  page: Playwright.Page,
  path: string,
  expectStatus: number
) {
  const status = await page.evaluate(
    async (args) => {
      const { url } = args;
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return res.status;
    },
    { url: `http://127.0.0.1:4321${path}` }
  );

  expect(status).toBe(expectStatus);
  return status;
}

test.describe('admin API role boundaries', () => {
  test.beforeAll(async () => {
    await createTestUser('nonadmin@example.com', 'password123', 'user');
    await createTestUser('admin@example.com', 'password123', 'admin');
  });

  test('authenticated non-admin is denied access to admin projects list', async ({
    page,
  }) => {
    const tokens = await getSessionTokens(
      'nonadmin@example.com',
      'password123'
    );
    await page.goto('/');
    await setAuthCookies(page, tokens.accessToken, tokens.refreshToken);
    await adminRequest(page, '/api/admin/projects', 403);
  });

  test('authenticated non-admin is denied access to admin project detail', async ({
    page,
  }) => {
    const tokens = await getSessionTokens(
      'nonadmin@example.com',
      'password123'
    );
    await page.goto('/');
    await setAuthCookies(page, tokens.accessToken, tokens.refreshToken);
    await adminRequest(
      page,
      '/api/admin/projects/00000000-0000-0000-0000-000000000000',
      403
    );
  });

  test('authenticated admin is allowed to access admin projects list', async ({
    page,
  }) => {
    await loginAs(page, 'admin@example.com', 'password123');
    await adminRequest(page, '/api/admin/projects', 200);
  });

  test('authenticated admin is allowed to access admin project detail', async ({
    page,
  }) => {
    await loginAs(page, 'admin@example.com', 'password123');
    await adminRequest(
      page,
      '/api/admin/projects/00000000-0000-0000-0000-000000000000',
      404
    );
  });
});
