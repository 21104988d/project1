import { test, expect } from '@playwright/test';

test.describe('Frontend Application', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');

    // Check that the page loads successfully
    await expect(page).toHaveTitle(/TheProject/);

    // Check for key elements
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should navigate to swap interface', async ({ page }) => {
    await page.goto('/');

    // Navigate to swap if there's a navigation link
    if (await page.locator('text=Swap').isVisible()) {
      await page.click('text=Swap');
      await expect(page.url()).toContain('swap');
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check that the page is mobile-friendly
    await expect(page.locator('h1')).toBeVisible();
  });
});
