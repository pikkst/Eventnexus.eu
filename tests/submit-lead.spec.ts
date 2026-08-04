import { test, expect } from '@playwright/test';

const locales = ['en', 'ru', 'de', 'fi', 'et'];

for (const locale of locales) {
  test(`submit-lead: form validation and submission works in ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}/contact`);

    await page.fill('input[name="fullName"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="projectTitle"]', 'Test Project');
    await page.fill('input[name="ideaDescription"]', 'This is a test description that is at least 80 characters long to pass validation.');
    await page.selectOptions('select[name="projectType"]', 'company_website');
    await page.fill('textarea[name="targetUsers"]', 'Test users');
    await page.fill('textarea[name="problemToSolve"]', 'Test problem');
    await page.fill('textarea[name="desiredOutcome"]', 'Test outcome');
    await page.selectOptions('select[name="timeline"]', 'asap');
    await page.selectOptions('select[name="budgetRange"]', 'under_500');
    await page.selectOptions('select[name="projectStatus"]', 'idea_only');

    await page.click('#next-btn');
    await page.click('#next-btn');
    await page.click('#next-btn');
    await page.click('#next-btn');
    await page.click('#next-btn');
    await page.click('#next-btn');
    await page.click('#next-btn');

    await page.click('#submit-btn');

    const response = await page.waitForResponse((response) =>
      response.url().includes('/api/submit-lead')
    );
    const result = await response.json();

    if (response.status() === 429) {
      await page.waitForTimeout(2000);
      await page.click('#submit-btn');
      await page.waitForResponse((r) => r.url().includes('/api/submit-lead'));
    }

    await expect(result).toHaveProperty('ok', true);
  });
}

test('submit-lead: contact-only submission works in all locales', async ({ page }) => {
  for (const locale of locales) {
    await page.goto(`/${locale}/contact`);
    await page.click('#toggle-contact-only');

    await page.fill('#contactName', 'John Doe');
    await page.fill('#contactEmail', 'john@example.com');
    await page.fill('#contactMessage', 'This is a test contact message that meets the minimum length requirement.');

    await page.click('#send-contact-btn');

    const response = await page.waitForResponse((response) =>
      response.url().includes('/api/submit-lead')
    );
    const result = await response.json();

    if (response.status() === 429) {
      await page.waitForTimeout(2000);
      await page.click('#send-contact-btn');
      await page.waitForResponse((r) => r.url().includes('/api/submit-lead'));
    }

    await expect(result).toHaveProperty('ok', true);
    await page.waitForSelector('#form-success', { state: 'visible' });

    await page.click('#back-to-project-request');
  }
});

test('submit-lead: invalid project type ID is rejected', async ({ page }) => {
  await page.goto('/en/contact');

  await page.fill('input[name="fullName"]', 'Test User');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="projectTitle"]', 'Test Project');
  await page.fill('input[name="ideaDescription"]', 'This is a test description that is at least 80 characters long to pass validation.');

  const select = page.locator('select[name="projectType"]');
  await select.selectOption('invalid_option_id');
  await page.fill('textarea[name="targetUsers"]', 'Test users');
  await page.fill('textarea[name="problemToSolve"]', 'Test problem');
  await page.fill('textarea[name="desiredOutcome"]', 'Test outcome');
  await page.selectOptions('select[name="timeline"]', 'asap');
  await page.selectOptions('select[name="budgetRange"]', 'under_500');
  await page.selectOptions('select[name="projectStatus"]', 'idea_only');

  await page.click('#next-btn');
  await page.click('#next-btn');
  await page.click('#next-btn');
  await page.click('#next-btn');
  await page.click('#next-btn');
  await page.click('#next-btn');
  await page.click('#next-btn');

  await page.click('#submit-btn');

  const response = await page.waitForResponse((response) =>
    response.url().includes('/api/submit-lead')
  );
  expect(response.status()).toBe(400);
});

test('submit-lead: oversized request body is rejected', async ({ page }) => {
  await page.goto('/en/contact');

  await page.fill('input[name="fullName"]', 'Test User');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="projectTitle"]', 'Test Project');
  const longText = 'A'.repeat(5000);
  await page.fill('textarea[name="ideaDescription"]', longText);
  await page.selectOptions('select[name="projectType"]', 'company_website');
  await page.fill('textarea[name="targetUsers"]', 'Test users');
  await page.fill('textarea[name="problemToSolve"]', 'Test problem');
  await page.fill('textarea[name="desiredOutcome"]', 'Test outcome');
  await page.selectOptions('select[name="timeline"]', 'asap');
  await page.selectOptions('select[name="budgetRange"]', 'under_500');
  await page.selectOptions('select[name="projectStatus"]', 'idea_only');

  await page.click('#next-btn');
  await page.click('#next-btn');
  await page.click('#next-btn');
  await page.click('#next-btn');
  await page.click('#next-btn');
  await page.click('#next-btn');
  await page.click('#next-btn');

  await page.click('#submit-btn');

  const response = await page.waitForResponse((response) =>
    response.url().includes('/api/submit-lead')
  );
  expect(response.status()).toBe(400);
});
