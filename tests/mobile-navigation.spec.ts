import { test, expect } from '@playwright/test';

test.describe('mobile navigation', () => {
  test('hamburger menu opens and shows nav links on mobile viewport', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/en');

    await expect(page.locator('#nav-toggle')).toBeVisible();
    await expect(page.locator('#nav-menu')).toBeHidden();

    await page.click('#nav-toggle');

    await expect(page.locator('#nav-mobile')).toBeVisible();
    await expect(page.locator('#nav-mobile a')).toHaveCount(4);

    await page.click('#nav-toggle');

    await expect(page.locator('#nav-mobile')).toBeHidden();
  });

  test('mobile nav links navigate to correct pages', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/en');

    await page.click('#nav-toggle');
    await page.click('#nav-mobile a:has-text("Services")');

    await expect(page).toHaveURL(/\/en\/services/);
  });

  test('mobile nav closes after link click', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/en');

    await page.click('#nav-toggle');
    await expect(page.locator('#nav-mobile')).toBeVisible();

    await page.click('#nav-mobile a:has-text("Start a Project")');
    await expect(page).toHaveURL(/\/en\/contact/);
    await expect(page.locator('#nav-mobile')).toBeHidden();
  });
});
