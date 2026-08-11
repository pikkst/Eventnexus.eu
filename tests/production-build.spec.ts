import { test, expect } from '@playwright/test';

test.describe('production build behavior', () => {
  test('critical pages load from built output', async ({ page }) => {
    await page.goto('/en');
    await expect(page.locator('h1').first()).toContainText(
      'Eventnexus builds your idea into a working web platform.'
    );

    await page.goto('/en/services');
    await expect(page.locator('h1').first()).toContainText(
      'Complete web-platform development from idea to launch.'
    );

    await page.goto('/en/work');
    await expect(page.locator('h1').first()).toContainText('Proof and work');

    await page.goto('/en/contact');
    await expect(page.locator('#project-request-form')).toBeVisible();
  });

  test('canonical unprefixed routes redirect to English locale', async ({
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
      expect(page.url()).toContain(route.expected);
    }
  });

  test('contact-only submission succeeds on built output', async ({ page }) => {
    await page.goto('/en/contact');

    await page.click('#toggle-contact-only');
    await page.waitForSelector('#contactName', { state: 'visible' });

    await page.fill('#contactName', 'Build Test User');
    await page.fill('#contactEmail', 'buildtest@example.com');
    await page.fill(
      '#contactMessage',
      'This is a test message that meets the minimum length requirement for the built output test.'
    );

    await page.route('**/api/submit-lead', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true }),
      });
    });

    await page.click('#send-contact-btn');

    await expect(page.locator('#form-success')).toBeVisible();
  });

  test('full project request form renders all steps on built output', async ({
    page,
  }) => {
    await page.goto('/en/contact');

    await page.fill('input[name="fullName"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.click('#next-btn');

    await page
      .locator('select[name="projectType"]')
      .selectOption('company_website');
    await page.fill('input[name="projectTitle"]', 'Test Project');
    await page.click('#next-btn');

    await page.fill(
      'textarea[name="ideaDescription"]',
      'This is a test description that is at least 80 characters long to pass validation.'
    );
    await page.click('#next-btn');

    await page.click('#next-btn');
    await page.click('#next-btn');
    await page.click('#next-btn');
    await page.locator('select[name="timeline"]').selectOption('asap');
    await page.locator('select[name="budgetRange"]').selectOption('under_500');
    await page
      .locator('select[name="projectStatus"]')
      .selectOption('idea_only');
    await page.click('#next-btn');
    await page.click('#next-btn');

    await expect(page.locator('#step-8')).toBeVisible();
    await expect(page.locator('#submit-btn')).toBeVisible();
  });
});
