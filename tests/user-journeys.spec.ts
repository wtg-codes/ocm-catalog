import { test, expect } from '@playwright/test';

test.describe('OCM LMS User Journeys', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('Catalog navigation and enrollment', async ({ page }) => {
    // 1. Check Catalog Heading
    await expect(page.getByText('Course Catalog', { exact: true })).toBeVisible();

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

    // 4. Go back to catalog and verify "My Enrolled Courses" tab
    await page.getByText(/Back to/).click();
    await expect(page.getByText('My Enrolled Courses')).toBeVisible();
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
    await expect(page.getByText(/Step 1 of/)).toBeVisible();

    // 4. Navigate steps
    await page.getByRole('button', { name: /Mark Complete & Continue/i }).click();
    await expect(page.getByText(/Step 2 of/)).toBeVisible();

    // 5. Return to course
    await page.getByRole('button', { name: /Course/i }).click();
    await expect(page.getByText(/Back to/)).toBeVisible();
  });

  test('Theme and view mode switching', async ({ page }) => {
    // 1. Toggle view mode
    await page.getByRole('button').filter({ has: page.locator('svg.lucide-list') }).click();
    await expect(page.locator('.space-y-6')).toBeVisible();

    // 2. Open settings and change theme
    await page.getByRole('button').filter({ has: page.locator('svg.lucide-settings') }).click();

    // Ensure modal is visible
    await expect(page.getByText('Portal Settings')).toBeVisible();

    await page.getByRole('button', { name: 'Kitten' }).click();

    // Verify theme class on body
    await expect(page.locator('body')).toHaveClass(/theme-kitten/);

    // Close settings by clicking overlay or the close button
    // The close button has rotate-90 on the icon
    await page.getByRole('button').filter({ has: page.locator('svg.rotate-90') }).click();
    await expect(page.getByText('Portal Settings')).not.toBeVisible();
  });
});
