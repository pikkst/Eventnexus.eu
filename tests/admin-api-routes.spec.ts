import { test, expect } from '@playwright/test';

const adminBase = 'http://127.0.0.1:4321/api/admin';

async function adminRequest(
  page: Playwright.Page,
  options: {
    path: string;
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    body?: Record<string, unknown>;
    expectStatus?: number;
  }
) {
  const { path, method = 'GET', body, expectStatus = 200 } = options;

  const response = await page.request.fetch(`${adminBase}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    data: body ? JSON.stringify(body) : undefined,
  });

  expect(response.status()).toBe(expectStatus);
  return response;
}

test.describe('admin API routes', () => {
  test('GET /api/admin/projects returns 401 without admin session', async ({
    page,
  }) => {
    const response = await page.request.get(`${adminBase}/projects`);
    expect(response.status()).toBe(401);
  });

  test('GET /api/admin/projects/:id returns 401 without admin session', async ({
    page,
  }) => {
    const response = await page.request.get(`${adminBase}/projects/00000000-0000-0000-0000-000000000000`);
    expect(response.status()).toBe(401);
  });

  test('POST /api/admin/projects/:id/status returns 401 without admin session', async ({
    page,
  }) => {
    const response = await page.request.post(
      `${adminBase}/projects/00000000-0000-0000-0000-000000000000/status`,
      {
        data: { status: 'reviewed' },
      }
    );
    expect(response.status()).toBe(401);
  });

  test('GET /api/admin/projects/:id/messages returns 401 without admin session', async ({
    page,
  }) => {
    const response = await page.request.get(
      `${adminBase}/projects/00000000-0000-0000-0000-000000000000/messages`
    );
    expect(response.status()).toBe(401);
  });

  test('POST /api/admin/projects/:id/messages returns 401 without admin session', async ({
    page,
  }) => {
    const response = await page.request.post(
      `${adminBase}/projects/00000000-0000-0000-0000-000000000000/messages`,
      {
        data: { subject: 'Test', body: 'Test body' },
      }
    );
    expect(response.status()).toBe(401);
  });

  test('POST /api/admin/projects/:id/status rejects invalid status', async ({
    page,
  }) => {
    const response = await page.request.post(
      `${adminBase}/projects/00000000-0000-0000-0000-000000000000/status`,
      {
        data: { status: 'invalid_status' },
      }
    );
    expect(response.status()).toBe(401);
  });
});
