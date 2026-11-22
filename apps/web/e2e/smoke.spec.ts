import { test, expect } from '@playwright/test';

test.describe('Home Page Smoke & Responsiveness', () => {
  test('renders portfolio dashboard with primary headings and currency', async ({ page }) => {
    await page.goto('/');

    // Check header and titles
    await expect(page.getByRole('heading', { name: 'Family Insurance Portfolio', level: 1 })).toBeVisible();
    await expect(page.getByText('Alice Tan')).toBeVisible();
    await expect(page.getByText('Lucas Tan')).toBeVisible();

    // Check financial figures in SGD (S$)
    await expect(page.getByText('S$ 1,500,000')).toBeVisible();
    await expect(page.getByText('S$ 3,770 / yr')).toBeVisible();
  });

  test('enforces mobile-first responsive constraints without horizontal scrolling', async ({ page }) => {
    await page.goto('/');

    // Verify viewport has no horizontal overflow
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    expect(hasHorizontalScroll).toBe(false);
  });

  test('verifies interactive touch targets exist for primary actions', async ({ page }) => {
    await page.goto('/');

    // Add Policy button
    const addPolicyBtn = page.getByRole('button', { name: 'Add Policy' });
    await expect(addPolicyBtn).toBeVisible();

    // Add Child Profile card
    const addChildProfile = page.getByText('+ Add Child Profile');
    await expect(addChildProfile).toBeVisible();
  });
});
