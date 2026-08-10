import { test, expect } from '@playwright/test';

test.describe('analytics', () => {
  test('does not load beacon script when analytics is disabled', async ({ page }) => {
    if (test.info().project.name !== 'chromium-disabled') {
      test.skip(true, 'Analytics is enabled in this project');
    }

    const response = await page.goto('/');
    expect(response?.status()).toBe(200);

    await expect(page.locator('script[src*="static.cloudflareinsights.com/beacon.min.js"]')).toHaveCount(0);
    await expect(page.locator('meta[name="ga4-id"]')).toHaveCount(0);
  });

  test('loads beacon script when analytics is enabled and consent is granted', async ({ page }) => {
    if (test.info().project.name !== 'chromium-enabled') {
      test.skip(true, 'Analytics is disabled in this project');
    }

    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('analytics-consent', 'granted'));
    await page.reload();

    const response = await page.goto('/');
    expect(response?.status()).toBe(200);

    const beaconScript = page.locator('script[src*="static.cloudflareinsights.com/beacon.min.js"]');
    await expect(beaconScript).toHaveCount(1);
  });

  test('does not load beacon script when consent is denied', async ({ page }) => {
    if (test.info().project.name !== 'chromium-enabled') {
      test.skip(true, 'Analytics is disabled in this project');
    }

    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('analytics-consent', 'denied'));
    await page.reload();

    const response = await page.goto('/');
    expect(response?.status()).toBe(200);

    await expect(page.locator('script[src*="static.cloudflareinsights.com/beacon.min.js"]')).toHaveCount(0);
  });

  test('shows consent banner when no consent is stored', async ({ page }) => {
    if (test.info().project.name !== 'chromium-enabled') {
      test.skip(true, 'Analytics is disabled in this project');
    }

    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('analytics-consent'));
    await page.reload();

    const response = await page.goto('/');
    expect(response?.status()).toBe(200);

    const banner = page.locator('#privacy-consent-banner');
    await expect(banner).toHaveCount(1);
    await expect(banner).not.toHaveClass(/hidden/);
  });

  test('hides consent banner when consent is granted', async ({ page }) => {
    if (test.info().project.name !== 'chromium-enabled') {
      test.skip(true, 'Analytics is disabled in this project');
    }

    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('analytics-consent', 'granted'));
    await page.reload();

    const response = await page.goto('/');
    expect(response?.status()).toBe(200);

    const banner = page.locator('#privacy-consent-banner');
    await expect(banner).toHaveCount(1);
    await expect(banner).toHaveClass(/hidden/);
  });

  test('hides consent banner when consent is denied', async ({ page }) => {
    if (test.info().project.name !== 'chromium-enabled') {
      test.skip(true, 'Analytics is disabled in this project');
    }

    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('analytics-consent', 'denied'));
    await page.reload();

    const response = await page.goto('/');
    expect(response?.status()).toBe(200);

    const banner = page.locator('#privacy-consent-banner');
    await expect(banner).toHaveCount(1);
    await expect(banner).toHaveClass(/hidden/);
  });

  test('loads analytics on fresh page load with persisted granted consent', async ({ page }) => {
    if (test.info().project.name !== 'chromium-enabled') {
      test.skip(true, 'Analytics is disabled in this project');
    }

    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('analytics-consent', 'granted'));

    const response = await page.goto('/');
    expect(response?.status()).toBe(200);

    const beaconScript = page.locator('script[src*="static.cloudflareinsights.com/beacon.min.js"]');
    await expect(beaconScript).toHaveCount(1);
  });

  test('does not duplicate beacon script after consent change event', async ({ page }) => {
    if (test.info().project.name !== 'chromium-enabled') {
      test.skip(true, 'Analytics is disabled in this project');
    }

    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('analytics-consent', 'granted'));
    await page.reload();

    const response = await page.goto('/');
    expect(response?.status()).toBe(200);

    const beaconScript = page.locator('script[src*="static.cloudflareinsights.com/beacon.min.js"]');
    await expect(beaconScript).toHaveCount(1);

    await page.evaluate(() => window.dispatchEvent(new Event('analytics-consent-changed')));
    await expect(beaconScript).toHaveCount(1);
  });

  test('privacy settings button clears consent and reloads page', async ({ page }) => {
    if (test.info().project.name !== 'chromium-enabled') {
      test.skip(true, 'Analytics is disabled in this project');
    }

    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('analytics-consent', 'granted'));

    const response = await page.goto('/');
    expect(response?.status()).toBe(200);

    await page.getByRole('button', { name: 'Privacy settings' }).click();

    const consent = await page.evaluate(() => localStorage.getItem('analytics-consent'));
    expect(consent).toBeNull();
  });
});
