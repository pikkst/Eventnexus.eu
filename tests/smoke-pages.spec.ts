import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.request.post('/api/test/reset-rate-limit', {
    headers: { Origin: 'http://127.0.0.1:4321' },
  });
});

async function setFormLoadedAtToPast(page: Playwright.Page) {
  await page.evaluate(() => {
    const input = document.getElementById('formLoadedAt');
    if (input) input.value = new Date(Date.now() - 10000).toISOString();
    const contactInput = document.getElementById('contact-formLoadedAt');
    if (contactInput)
      contactInput.value = new Date(Date.now() - 10000).toISOString();
  });
}

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
    await page.goto(route.path);
    await expect(page).toHaveURL(new RegExp(`${route.expected}`));
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
  await setFormLoadedAtToPast(page);

  await page.click('#send-contact-btn');

  const response = await page.waitForResponse((response) =>
    response.url().includes('/api/submit-lead')
  );
  expect(response.status()).toBe(200);
  const result = await response.json();
  expect(result).toHaveProperty('ok', true);

  await expect(page.locator('#form-success')).toBeVisible();
});
