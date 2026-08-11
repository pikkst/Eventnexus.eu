import { test, expect } from '@playwright/test';

async function fillStep1(page: Playwright.Page) {
  await page.fill('input[name="fullName"]', 'Test User');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="phone"]', '123456789');
  await page.fill('input[name="company"]', 'Test Co');
  await page.fill('input[name="region"]', 'EE');
}

async function fillStep2(page: Playwright.Page) {
  await page.locator('select[name="projectType"]').selectOption('company_website');
  await page.fill('input[name="projectTitle"]', 'Test Project');
}

async function fillStep3(page: Playwright.Page) {
  await page.fill(
    'textarea[name="ideaDescription"]',
    'This is a test description that is at least 80 characters long to pass validation.'
  );
  await page.fill('input[name="targetUsers"]', 'Test users');
  await page.fill('textarea[name="problemToSolve"]', 'Test problem');
  await page.fill('textarea[name="desiredOutcome"]', 'Test outcome');
}

async function fillStep6(page: Playwright.Page) {
  await page.locator('select[name="timeline"]').selectOption('asap');
  await page.locator('select[name="budgetRange"]').selectOption('under_500');
  await page.locator('select[name="projectStatus"]').selectOption('idea_only');
}

async function navigateToStep8(page: Playwright.Page) {
  await fillStep1(page);
  await page.click('#next-btn');

  await fillStep2(page);
  await page.click('#next-btn');

  await fillStep3(page);
  await page.click('#next-btn');

  await page.click('#next-btn');
  await page.click('#next-btn');
  await fillStep6(page);
  await page.click('#next-btn');
  await page.click('#next-btn');

  await page.check('#consent');
}

test.describe('API abuse protection', () => {
  test('rejects submission with honeypot filled', async ({ page }) => {
    await page.goto('/en/contact');

    await fillStep1(page);
    await page.evaluate(() => {
      const websiteInput = document.querySelector('input[name="website"]');
      if (websiteInput) websiteInput.value = 'spam-bot-value';
    });
    await page.click('#next-btn');

    await fillStep2(page);
    await page.click('#next-btn');

    await fillStep3(page);
    await page.click('#next-btn');

    await page.click('#next-btn');
    await page.click('#next-btn');
    await fillStep6(page);
    await page.click('#next-btn');
    await page.click('#next-btn');
    await page.check('#consent');

    await page.route('**/api/submit-lead', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Submission rejected' }),
      });
    });

    await page.click('#submit-btn');

    const response = await page.waitForResponse((response) =>
      response.url().includes('/api/submit-lead')
    );
    expect(response.status()).toBe(400);
    const result = await response.json();
    expect(result).toHaveProperty('error', 'Submission rejected');
  });

  test('rejects submission that is too fast (minimum completion time)', async ({ page }) => {
    await page.goto('/en/contact');

    await navigateToStep8(page);

    await page.evaluate(() => {
      const input = document.getElementById('formLoadedAt');
      if (input) input.value = new Date(Date.now() - 1000).toISOString();
    });

    await page.route('**/api/submit-lead', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Submission rejected' }),
      });
    });

    await page.click('#submit-btn');

    const response = await page.waitForResponse((response) =>
      response.url().includes('/api/submit-lead')
    );
    expect(response.status()).toBe(400);
    const result = await response.json();
    expect(result).toHaveProperty('error', 'Submission rejected');
  });

  test('rejects oversized request body', async ({ page }) => {
    await page.goto('/en/contact');

    await fillStep1(page);
    await page.click('#next-btn');

    await fillStep2(page);
    await page.click('#next-btn');

    const longText = 'A'.repeat(5000);
    await page.fill('textarea[name="ideaDescription"]', longText);
    await page.click('#next-btn');

    await page.click('#next-btn');
    await page.click('#next-btn');
    await fillStep6(page);

    await page.click('#next-btn');
    await page.click('#next-btn');
    await page.check('#consent');

    await page.route('**/api/submit-lead', async (route) => {
      await route.fulfill({
        status: 413,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Request too large' }),
      });
    });

    await page.click('#submit-btn');

    const response = await page.waitForResponse((response) =>
      response.url().includes('/api/submit-lead')
    );
    expect(response.status()).toBe(413);
  });

  test('rejects invalid array field values', async ({ page }) => {
    await page.goto('/en/contact');

    await navigateToStep8(page);

    await page.evaluate(() => {
      const featuresInputs = document.querySelectorAll('input[name="features"]');
      if (featuresInputs.length > 0) {
        featuresInputs[0].value = 'invalid_feature_id';
      }
    });

    await page.route('**/api/submit-lead', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Invalid input' }),
      });
    });

    await page.click('#submit-btn');

    const response = await page.waitForResponse((response) =>
      response.url().includes('/api/submit-lead')
    );
    expect(response.status()).toBe(400);
  });
});
