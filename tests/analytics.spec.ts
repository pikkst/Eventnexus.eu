import { test, expect } from '@playwright/test';

test.describe('analytics', () => {
  test('does not load gtag scripts when analytics is disabled', async ({ page }) => {
    if (test.info().project.name !== 'chromium') {
      test.skip(true, 'Analytics is enabled in this project');
    }

    const response = await page.goto('/');
    expect(response?.status()).toBe(200);

    await expect(page.locator('script[src*="googletagmanager.com/gtag/js"]')).toHaveCount(0);
    await expect(page.locator('[data-analytics-config]')).toHaveCount(0);
  });

  test('loads gtag scripts with correct ID when analytics is enabled', async ({ page }) => {
    if (test.info().project.name !== 'chromium-analytics') {
      test.skip(true, 'Analytics is disabled in this project');
    }

    const response = await page.goto('/');
    expect(response?.status()).toBe(200);

    const gtagScript = page.locator('script[src*="googletagmanager.com/gtag/js"]');
    await expect(gtagScript).toHaveCount(1);
    await expect(gtagScript).toHaveAttribute('src', /G-TEST123456/);

    const configScript = page.locator('[data-analytics-config]');
    await expect(configScript).toHaveCount(1);
    const content = await configScript.textContent();
    expect(content).toContain('G-TEST123456');
  });
});
