import { test, expect } from '@playwright/test';
import { checkSupabaseConnectivity } from './supabase-helper';

const supabaseUrl = process.env.SUPABASE_URL || 'http://localhost:54340';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const anonKey = process.env.PUBLIC_SUPABASE_ANON_KEY || '';

let supabaseAvailable = false;

test.beforeAll(async () => {
  supabaseAvailable = await checkSupabaseConnectivity(
    supabaseUrl,
    serviceRoleKey,
    anonKey,
    process.env.CI === 'true'
  );
});

test.beforeEach(async ({ page }) => {
  if (!supabaseAvailable) {
    test.skip(true, 'Supabase is not reachable');
    return;
  }

  await page.request.post('/api/test/reset-rate-limit', {
    headers: { Origin: 'http://127.0.0.1:4321' },
  });
});

async function clickNext(page: Playwright.Page) {
  await page.evaluate(() => {
    const btn = document.getElementById('next-btn');
    if (btn) btn.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.click('#next-btn');
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
      await page.goto(route.path);
      await expect(page).toHaveURL(new RegExp(`${route.expected}`));
    }
  });

  test('contact-only submission succeeds on built output', async ({ page }) => {
    const unique = Date.now();
    await page.goto('/en/contact');

    await page.click('#toggle-contact-only');
    await page.waitForSelector('#contactName', { state: 'visible' });

    await page.fill('#contactName', 'Build Test User');
    await page.fill('#contactEmail', `buildtest-${unique}@example.com`);
    await page.fill(
      '#contactMessage',
      'This is a test message that meets the minimum length requirement for the built output test.'
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

  test('full project request form submits successfully on built output', async ({
    page,
  }) => {
    const unique = Date.now();
    await page.goto('/en/contact');

    await page.fill('input[name="fullName"]', 'Test User');
    await page.fill('input[name="email"]', `test-${unique}@example.com`);
    await clickNext(page);

    await page
      .locator('select[name="projectType"]')
      .selectOption('company_website');
    await page.fill('input[name="projectTitle"]', `Test Project ${unique}`);
    await clickNext(page);

    await page.fill(
      'textarea[name="ideaDescription"]',
      'This is a test description that is at least 80 characters long to pass validation.'
    );
    await clickNext(page);

    await clickNext(page);
    await clickNext(page);
    await clickNext(page);
    await page.locator('select[name="timeline"]').selectOption('asap');
    await page.locator('select[name="budgetRange"]').selectOption('under_500');
    await page
      .locator('select[name="projectStatus"]')
      .selectOption('idea_only');
    await clickNext(page);
    await clickNext(page);

    await page.check('#consent', { force: true });
    await setFormLoadedAtToPast(page);
    await page.evaluate(() => {
      const btn = document.getElementById('submit-btn');
      if (btn) btn.scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await page.click('#submit-btn', { force: true });

    const response = await page.waitForResponse((response) =>
      response.url().includes('/api/submit-lead')
    );
    expect(response.status()).toBe(200);
    const result = await response.json();
    expect(result).toHaveProperty('ok', true);

    await expect(page.locator('#form-success')).toBeVisible();
  });
});
