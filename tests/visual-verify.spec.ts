import { test, expect } from '@playwright/test';

test('Visual snapshot of Catalog', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.screenshot({ path: 'catalog-snapshot.png' });
});

test('Visual snapshot of Course Dashboard', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.locator('.grid > div').first().click();
  await page.screenshot({ path: 'dashboard-snapshot.png' });
});

test('Visual snapshot of Lab Engine', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.locator('.grid > div').first().click();
  await page.getByRole('button', { name: /Start Lab/i }).first().click();
  await page.screenshot({ path: 'lab-snapshot.png' });
});
