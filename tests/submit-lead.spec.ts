import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.request.post('/api/test/reset-rate-limit', {
    headers: { Origin: 'http://127.0.0.1:4321' },
  });
});

const locales = ['en', 'ru', 'de', 'fi', 'et'];

async function fillStep1(page: Playwright.Page) {
  await page.fill('input[name="fullName"]', 'Test User');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="phone"]', '123456789');
  await page.fill('input[name="company"]', 'Test Co');
  await page.fill('input[name="region"]', 'EE');
}

async function fillStep2(page: Playwright.Page) {
  await page
    .locator('select[name="projectType"]')
    .selectOption('company_website');
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

async function navigateToSubmit(page: Playwright.Page) {
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

async function setFormLoadedAtToPast(page: Playwright.Page) {
  await page.evaluate(() => {
    const input = document.getElementById('formLoadedAt');
    if (input) input.value = new Date(Date.now() - 10000).toISOString();
    const contactInput = document.getElementById('contact-formLoadedAt');
    if (contactInput) contactInput.value = new Date(Date.now() - 10000).toISOString();
  });
}

for (const locale of locales) {
  test(`submit-lead: form validation and submission works in ${locale}`, async ({
    page,
  }) => {
    await page.goto(`/${locale}/contact`);

    await navigateToSubmit(page);
    await setFormLoadedAtToPast(page);

    await page.click('#submit-btn');

    const response = await page.waitForResponse((response) =>
      response.url().includes('/api/submit-lead')
    );
    expect(response.status()).toBe(200);
    const result = await response.json();
    expect(result).toHaveProperty('ok', true);
  });
}

test('submit-lead: contact-only submission works in all locales', async ({
  page,
}) => {
  for (const locale of locales) {
    await page.goto(`/${locale}/contact`);
    await page.click('#toggle-contact-only');

    await page.fill('#contactName', 'John Doe');
    await page.fill('#contactEmail', 'john@example.com');
    await page.fill(
      '#contactMessage',
      'This is a test contact message that meets the minimum length requirement.'
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

    await page.evaluate(() => {
      const success = document.getElementById('form-success');
      const contactForm = document.getElementById('contact-only-form');
      if (success) success.classList.add('hidden');
      if (contactForm) contactForm.classList.remove('hidden');
    });

    await page.click('#back-to-project-request');
  }
});

test('submit-lead: invalid project type ID is rejected', async ({ page }) => {
  await page.goto('/en/contact');

  await fillStep1(page);
  await page.click('#next-btn');

  await page
    .locator('select[name="projectType"]')
    .selectOption('company_website');
  await page.fill('input[name="projectTitle"]', 'Test Project');
  await page.click('#next-btn');

  await fillStep3(page);
  await page.click('#next-btn');

  await page.click('#next-btn');
  await page.click('#next-btn');
  await fillStep6(page);

  await page.click('#next-btn');
  await page.click('#next-btn');
  await page.check('#consent');

  await page.evaluate(() => {
    const select = document.querySelector('select[name="projectType"]');
    if (select) select.value = 'invalid_option_id';
  });

  await page.click('#submit-btn');

  const response = await page.waitForResponse((response) =>
    response.url().includes('/api/submit-lead')
  );
  expect(response.status()).toBe(400);
});

test('submit-lead: oversized field value is rejected', async ({ page }) => {
  await page.goto('/en/contact');

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

  await page.evaluate(() => {
    const textarea = document.querySelector(
      'textarea[name="ideaDescription"]'
    ) as HTMLTextAreaElement | null;
    if (textarea) {
      textarea.value = 'A'.repeat(5000);
    }
  });

  await page.evaluate(() => {
    const checkbox = document.getElementById('consent') as HTMLInputElement | null;
    if (checkbox) checkbox.checked = true;
  });

  await page.click('#submit-btn');

  const response = await page.waitForResponse((response) =>
    response.url().includes('/api/submit-lead')
  );
  expect(response.status()).toBe(400);
});
