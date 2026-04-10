import { test, expect } from '@playwright/test';

test.describe('Visual Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
    // Ensure catalog is loaded
    await expect(page.getByText('Developer & Engineering')).toBeVisible();
  });

  test('Catalog view screenshots', async ({ page }) => {
    await page.screenshot({ path: 'test-results/catalog-grid.png' });

    const listBtn = page.locator('button').filter({ has: page.locator('svg.lucide-list') }).first();
    await listBtn.click();
    await page.screenshot({ path: 'test-results/catalog-list.png' });
  });

  test('Course Dashboard screenshots', async ({ page }) => {
    await page.locator('h3').filter({ hasText: 'Agentic Developer Toolkit Workshop' }).click();
    await expect(page.getByText(/Back to/)).toBeVisible();
    await page.screenshot({ path: 'test-results/course-dashboard.png' });
  });

  test('Lab Engine screenshots', async ({ page }) => {
    await page.locator('h3').filter({ hasText: 'Agentic Developer Toolkit Workshop' }).click();
    await page.getByRole('button', { name: /Start Lab/i }).first().click();
    await expect(page.locator('aside')).toBeVisible();
    await page.screenshot({ path: 'test-results/lab-engine.png' });

    // Test DeepDive toggle
    const deepDive = page.getByText('Deep Dive: Architecture & Extension Compatibility');
    if (await deepDive.isVisible()) {
        await deepDive.click();
        await page.screenshot({ path: 'test-results/lab-engine-deepdive.png' });
    }
  });

  test('Course Builder Modal screenshot', async ({ page }) => {
    await page.getByRole('button', { name: /Create Custom Course/i }).click();
    await expect(page.getByText('Course Authoring Builder')).toBeVisible();
    await page.screenshot({ path: 'test-results/course-builder.png' });
  });
});
