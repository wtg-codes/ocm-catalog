import { test, expect } from '@playwright/test';

test.describe('OCM LMS User Journeys', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('Catalog navigation and enrollment', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Catalog' })).toBeVisible();

    // 1. Enroll from catalog card
    const enrollBtn = page.getByRole('button', { name: /Assign to Me/i }).first();
    await enrollBtn.click();

    // 2. Check if we switched to My Courses tab
    const myCoursesTab = page.locator('nav button').filter({ hasText: 'My Courses' });
    await expect(myCoursesTab).toHaveClass(/bg-panel/);

    // 3. Verify course is there
    await expect(page.getByText('Start Course')).toBeVisible();
  });

  test('Lab execution and step navigation', async ({ page }) => {
    // 1. Start a course
    await page.locator('h3').filter({ hasText: 'Agentic Developer Toolkit Workshop' }).click();

    // 2. Enroll if needed (on dashboard)
    const enrollBtn = page.getByRole('button', { name: /Enroll in Track/i });
    if (await enrollBtn.isVisible()) {
        await enrollBtn.click();
    }

    // 3. Start the first lab
    await page.getByRole('button', { name: /Start Lab/i }).first().click();

    // 4. Verify Lab Engine
    await expect(page.locator('aside')).toBeVisible(); // Sidebar
    await expect(page.getByText(/Step 1 \//i)).toBeVisible();

    // 5. Navigate steps
    await page.getByRole('button', { name: /Continue/i }).click();
    await expect(page.getByText(/Step 2 \//i)).toBeVisible();

    // 6. Return to course
    await page.getByRole('button', { name: /Exit Lab/i }).click();
    await expect(page.getByRole('button', { name: /Back to/i })).toBeVisible();
  });

  test('Theme and view mode switching', async ({ page }) => {
    await expect(page.getByText('Developer & Engineering')).toBeVisible();

    // 1. Toggle view mode
    const listBtn = page.locator('button').filter({ has: page.locator('svg.lucide-list') }).first();
    await listBtn.click();

    // 2. Open settings and change theme
    await page.locator('button').filter({ has: page.locator('svg.lucide-settings') }).click();
    await expect(page.getByText('Settings')).toBeVisible();

    await page.getByRole('button', { name: 'Kitten' }).click();
    await expect(page.locator('body')).toHaveClass(/theme-kitten/);

    // Close settings
    await page.locator('button').filter({ has: page.locator('svg.lucide-x') }).click();
    await expect(page.getByText('Settings')).not.toBeVisible();
  });
});
