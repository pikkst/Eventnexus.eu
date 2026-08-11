import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const criticalPages = [
  {
    name: 'homepage',
    path: '/',
  },
  {
    name: 'services',
    path: '/en/services',
  },
  {
    name: 'work',
    path: '/en/work',
  },
  {
    name: 'contact',
    path: '/en/contact',
  },
];

for (const route of criticalPages) {
  test(`accessibility: ${route.name} passes axe checks`, async ({ page }) => {
    const response = await page.goto(route.path);
    expect(response?.status()).toBe(200);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    const violationSummary = results.violations
      .map((violation) => `  ${violation.id}: ${violation.description}`)
      .join('\n');

    expect(
      results.violations,
      `Accessibility violations found on ${route.name}:\n${violationSummary}`
    ).toEqual([]);
  });
}
