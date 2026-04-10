import { test, expect } from '@playwright/test';

test.describe('OCM LMS User Journeys', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('Catalog navigation and enrollment', async ({ page }) => {
    // 1. Check Catalog Heading
    await expect(page.getByRole('heading', { name: 'Catalog' })).toBeVisible();

    // 2. View Details of the first course (Clicking the card area)
    const firstCourseCard = page.locator('.grid > div').first();
    await firstCourseCard.click();

    // Check if we are on Course Dashboard
    await expect(page.getByText(/Back to/)).toBeVisible();

    // 3. Enroll in the course
    const enrollBtn = page.getByRole('button', { name: /Enroll in Track/i });
    await enrollBtn.click();

    // Check if "Enroll in Track" button is gone
    await expect(enrollBtn).not.toBeVisible();

    // 4. Go back to catalog and verify "My Tracks" tab
    await page.getByText(/Back to/).click();
    await expect(page.getByRole('heading', { name: 'My Tracks' })).toBeVisible();
    await expect(page.getByText('Continue Track')).toBeVisible();
  });

  test('Lab execution and step navigation', async ({ page }) => {
    // 1. Start a course
    const firstCourseCard = page.locator('.grid > div').first();
    await firstCourseCard.click();

    // 2. Start the first lab
    await page.getByRole('button', { name: /Start Lab/i }).first().click();

    // 3. Verify Lab Engine
    await expect(page.locator('aside')).toBeVisible(); // Sidebar
    await expect(page.getByText(/Step 1 \//i)).toBeVisible();

    // 4. Navigate steps
    await page.getByRole('button', { name: /Continue/i }).click();
    await expect(page.getByText(/Step 2 \//i)).toBeVisible();

    // 5. Return to course
    await page.getByRole('button', { name: /Exit Lab/i }).click();
    await expect(page.getByText(/Back to/)).toBeVisible();
  });

  test('Theme and view mode switching', async ({ page }) => {
    // 1. Toggle view mode
    await page.getByRole('button').filter({ has: page.locator('svg.lucide-list') }).click();
    await expect(page.locator('.space-y-4')).toBeVisible();

    // 2. Open settings and change theme
    await page.getByRole('button').filter({ has: page.locator('svg.lucide-settings') }).click();

    // Ensure modal is visible
    await expect(page.getByText('SETTINGS', { exact: false })).toBeVisible();

    await page.getByRole('button', { name: 'Kitten' }).click();

    // Verify theme class on body
    await expect(page.locator('body')).toHaveClass(/theme-kitten/);

    // Close settings
    await page.getByRole('button').filter({ has: page.locator('svg.lucide-x') }).click();
    await expect(page.getByText('SETTINGS', { exact: false })).not.toBeVisible();
  });
});
