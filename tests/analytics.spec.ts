import { test, expect } from '@playwright/test';

test.describe('analytics', () => {
  test('does not load gtag scripts when analytics is disabled', async ({ page }) => {
    if (test.info().project.name !== 'chromium') {
      test.skip(true, 'Analytics is enabled in this project');
    }

    const response = await page.goto('/');
    expect(response?.status()).toBe(200);

    await expect(page.locator('script[src*="googletagmanager.com/gtag/js"]')).toHaveCount(0);
    await expect(page.locator('script[src*="analytics-init.js"]')).toHaveCount(0);
    await expect(page.locator('meta[name="ga4-id"]')).toHaveCount(0);
  });

  test('loads gtag scripts and initializes dataLayer when analytics is enabled', async ({ page }) => {
    if (test.info().project.name !== 'chromium-analytics') {
      test.skip(true, 'Analytics is disabled in this project');
    }

    const pageErrors: string[] = [];
    page.on('pageerror', (err) => pageErrors.push(err.message));

    const response = await page.goto('/');
    expect(response?.status()).toBe(200);

    const gtagScript = page.locator('script[src*="googletagmanager.com/gtag/js"]');
    await expect(gtagScript).toHaveCount(1);
    await expect(gtagScript).toHaveAttribute('src', /G-TEST123456/);

    const initScript = page.locator('script[src*="analytics-init.js"]');
    await expect(initScript).toHaveCount(1);

    const metaTag = page.locator('meta[name="ga4-id"]');
    await expect(metaTag).toHaveCount(1);
    await expect(metaTag).toHaveAttribute('content', 'G-TEST123456');

    await page.waitForTimeout(1000);

    const dataLayer = await page.evaluate(() => (window as any).dataLayer);
    expect(Array.isArray(dataLayer)).toBe(true);

    const hasConfigEntry = dataLayer.some((item: any) => {
      if (Array.isArray(item) && item[0] === 'config' && item[1] === 'G-TEST123456') {
        return true;
      }
      if (item && typeof item === 'object' && item[0] === 'config' && item[1] === 'G-TEST123456') {
        return true;
      }
      return false;
    });

    expect(hasConfigEntry).toBe(true);
    expect(pageErrors).toHaveLength(0);
  });
});
