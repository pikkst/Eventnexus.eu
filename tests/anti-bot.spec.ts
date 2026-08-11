import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.request.post('/api/test/reset-rate-limit', {
    headers: { Origin: 'http://127.0.0.1:4321' },
  });
});

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

async function clickNext(page: Playwright.Page) {
  await page.evaluate(() => {
    const btn = document.getElementById('next-btn');
    if (btn) btn.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.click('#next-btn');
}

async function navigateToStep8(page: Playwright.Page) {
  await fillStep1(page);
  await clickNext(page);

  await fillStep2(page);
  await clickNext(page);

  await fillStep3(page);
  await clickNext(page);

  await clickNext(page);
  await clickNext(page);
  await fillStep6(page);
  await clickNext(page);
  await clickNext(page);

  await page.check('#consent', { force: true });
}

async function setFormLoadedAtToPast(page: Playwright.Page) {
  await page.evaluate(() => {
    const input = document.getElementById('formLoadedAt');
    if (input) input.value = new Date(Date.now() - 10000).toISOString();
    const contactInput = document.getElementById('contact-formLoadedAt');
    if (contactInput)
      contactInput.value = new Date(Date.now() - 10000).toISOString();
  });
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

    await page.evaluate(() => {
    const btn = document.getElementById('submit-btn');
    if (btn) btn.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.click('#submit-btn', { force: true });

    const response = await page.waitForResponse((response) =>
      response.url().includes('/api/submit-lead')
    );
    expect(response.status()).toBe(400);
    const result = await response.json();
    expect(result).toHaveProperty('error', 'Submission rejected');
  });

  test('rejects submission that is too fast (minimum completion time)', async ({
    page,
  }) => {
    await page.goto('/en/contact');

    await navigateToStep8(page);

    await page.evaluate(() => {
      const input = document.getElementById('formLoadedAt');
      if (input) input.value = new Date(Date.now() - 1000).toISOString();
    });

    await page.evaluate(() => {
    const btn = document.getElementById('submit-btn');
    if (btn) btn.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.click('#submit-btn', { force: true });

    const response = await page.waitForResponse((response) =>
      response.url().includes('/api/submit-lead')
    );
    expect(response.status()).toBe(400);
    const result = await response.json();
    expect(result).toHaveProperty('error', 'Submission rejected');
  });

  test('rejects oversized request body', async ({ page }) => {
    await page.goto('/en/contact');

    await navigateToStep8(page);

    await page.evaluate(() => {
      const textarea = document.querySelector(
        'textarea[name="ideaDescription"]'
      ) as HTMLTextAreaElement | null;
      if (textarea) {
        textarea.value = 'A'.repeat(5000);
      }
    });

    await page.evaluate(() => {
    const btn = document.getElementById('submit-btn');
    if (btn) btn.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.click('#submit-btn', { force: true });

    const response = await page.waitForResponse((response) =>
      response.url().includes('/api/submit-lead')
    );
    expect(response.status()).toBe(400);
  });

  test('rejects invalid array field values', async ({ page }) => {
    await page.goto('/en/contact');

    await navigateToStep8(page);

    await page.evaluate(() => {
      const featuresInputs = document.querySelectorAll(
        'input[name="features"]'
      );
      if (featuresInputs.length > 0) {
        const checkbox = featuresInputs[0] as HTMLInputElement;
        checkbox.checked = true;
        checkbox.value = 'invalid_feature_id';
      }
    });

    await page.evaluate(() => {
    const btn = document.getElementById('submit-btn');
    if (btn) btn.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.click('#submit-btn', { force: true });

    const response = await page.waitForResponse((response) =>
      response.url().includes('/api/submit-lead')
    );
    expect(response.status()).toBe(400);
  });

  test('rejects rapid submissions (rate limiting)', async ({ page }) => {
    await page.request.post('/api/test/reset-rate-limit');

    const oldTimestamp = new Date(Date.now() - 10000).toISOString();

    for (let i = 0; i < 5; i++) {
      const response = await page.request.post('/api/submit-lead', {
        form: {
          fullName: 'Rate Test',
          email: 'ratetest@example.com',
          phoneOrChannel: '',
          companyName: '',
          region: 'EE',
          contactMessage: 'This is a rate limit test message.',
          consent: 'on',
          formLoadedAt: oldTimestamp,
        },
        headers: {
          Origin: 'http://127.0.0.1:4321',
        },
      });
      expect(response.status()).toBe(200);
    }

    const response = await page.request.post('/api/submit-lead', {
      form: {
        fullName: 'Rate Test',
        email: 'ratetest@example.com',
        phoneOrChannel: '',
        companyName: '',
        region: 'EE',
        contactMessage: 'This is a rate limit test message.',
        consent: 'on',
        formLoadedAt: oldTimestamp,
      },
      headers: {
        Origin: 'http://127.0.0.1:4321',
      },
    });
    expect(response.status()).toBe(429);
  });
});
