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
    path: '/services',
    assertions: ['Complete web-platform development from idea to launch.'],
  },
  {
    name: 'work',
    path: '/work',
    assertions: ['Proof and work'],
  },
  {
    name: 'contact',
    path: '/contact',
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

test('smoke: contact page contains project request form', async ({ page }) => {
  const response = await page.goto('/contact');
  expect(response?.status()).toBe(200);
  await expect(page.locator('#project-request-form')).toBeVisible();
});

test('smoke: services page contains project request CTA', async ({ page }) => {
  const response = await page.goto('/services');
  expect(response?.status()).toBe(200);
  await expect(page.getByRole('link', { name: 'Start a project request' }).first()).toBeVisible();
});
