import { test, expect } from '@playwright/test';

const criticalPages = [
  {
    name: 'homepage',
    path: '/',
    assertions: [
      'Eventnexus builds your idea into a working web platform.',
      'Start a project request',
    ],
  },
  {
    name: 'services',
    path: '/en/services',
    assertions: ['Complete web-platform development from idea to launch.'],
  },
  {
    name: 'work',
    path: '/en/work',
    assertions: ['Proof and work'],
  },
  {
    name: 'contact',
    path: '/en/contact',
    assertions: ['Tell us what you want to build.'],
  },
];

for (const route of criticalPages) {
  test(`smoke: ${route.name} loads and contains key content`, async ({
    page,
  }) => {
    const response = await page.goto(route.path);
    expect(response?.status()).toBe(200);

    for (const text of route.assertions) {
      await expect(page.getByText(text, { exact: false })).toBeVisible();
    }
  });
}

test('smoke: canonical contact page contains project request form', async ({
  page,
}) => {
  const response = await page.goto('/en/contact');
  expect(response?.status()).toBe(200);
  await expect(page.locator('#project-request-form')).toBeVisible();
});

test('smoke: canonical services page contains project request CTA', async ({
  page,
}) => {
  const response = await page.goto('/en/services');
  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole('link', { name: 'Start a project request' }).first()
  ).toBeVisible();
});

test('smoke: unprefixed routes redirect to canonical English routes', async ({
  page,
}) => {
  const routes = [
    { path: '/contact', expected: '/en/contact' },
    { path: '/services', expected: '/en/services' },
    { path: '/work', expected: '/en/work' },
  ];

  for (const route of routes) {
    const responsePromise = page.waitForResponse(
      (response) =>
        response.url().endsWith(route.path) && response.status() === 301
    );
    await page.goto(route.path);
    const response = await responsePromise;
    expect(response.status()).toBe(301);
    expect(response.headers()['location']).toBe(route.expected);
    expect(page.url()).toContain(route.expected);
  }
});

test('smoke: isolated contact-only submission succeeds on canonical route', async ({
  page,
}) => {
  await page.goto('/en/contact');

  await page.click('#toggle-contact-only');
  await page.waitForSelector('#contactName', { state: 'visible' });

  await page.fill('#contactName', 'Test User');
  await page.fill('#contactEmail', 'test@example.com');
  await page.fill(
    '#contactMessage',
    'This is a test message that meets the minimum length requirement.'
  );

  let capturedPayload: string | null = null;

  await page.route('**/api/submit-lead', async (route) => {
    const request = route.request();
    capturedPayload = request.postData() || '';
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true }),
    });
  });

  await page.click('#send-contact-btn');

  await expect(page.locator('#form-success')).toBeVisible();

  expect(capturedPayload).toBeTruthy();
  expect(capturedPayload!).toContain('fullName');
  expect(capturedPayload!).toContain('Test User');
  expect(capturedPayload!).toContain('email');
  expect(capturedPayload!).toContain('test@example.com');
  expect(capturedPayload!).toContain('contactMessage');
  expect(capturedPayload!).toContain(
    'This is a test message that meets the minimum length requirement.'
  );
  expect(capturedPayload!).toContain('consent');
  expect(capturedPayload!).toContain('on');
  expect(capturedPayload!).toContain('formLoadedAt');
  expect(capturedPayload!).toMatch(/formLoadedAt"\s*\n\s*\d{4}-\d{2}-\d{2}T/);
  expect(capturedPayload!).toContain('website');
  if (process.env.PUBLIC_TURNSTILE_SITE_KEY) {
    expect(capturedPayload!).toContain('turnstileToken');
  }
});
