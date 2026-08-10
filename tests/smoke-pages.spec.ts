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
  test(`smoke: ${route.name} loads and contains key content`, async ({ page }) => {
    const response = await page.goto(route.path);
    expect(response?.status()).toBe(200);

    for (const text of route.assertions) {
      await expect(page.getByText(text, { exact: false })).toBeVisible();
    }
  });
}

test('smoke: canonical contact page contains project request form', async ({ page }) => {
  const response = await page.goto('/en/contact');
  expect(response?.status()).toBe(200);
  await expect(page.locator('#project-request-form')).toBeVisible();
});

test('smoke: canonical services page contains project request CTA', async ({ page }) => {
  const response = await page.goto('/en/services');
  expect(response?.status()).toBe(200);
  await expect(page.getByRole('link', { name: 'Start a project request' }).first()).toBeVisible();
});

test('smoke: unprefixed routes redirect to canonical English routes', async ({ page }) => {
  const routes = [
    { path: '/contact', expected: '/en/contact' },
    { path: '/services', expected: '/en/services' },
    { path: '/work', expected: '/en/work' },
  ];

  for (const route of routes) {
    const response = await page.goto(route.path);
    expect(response?.status()).toBe(200);
    expect(page.url()).toContain(route.expected);
  }
});
