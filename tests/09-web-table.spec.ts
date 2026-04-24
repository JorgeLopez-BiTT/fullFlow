import { test, expect } from './fixtures/base.fixture';

test.describe('Web Table Example (Courses)', () => {
  test('should display table headers: Instructor, Course, Price', async ({ practicePage, screenshotDir }) => {
    const headers = practicePage.coursesTable.locator('th');
    await expect(headers.nth(0)).toHaveText('Instructor');
    await expect(headers.nth(1)).toHaveText('Course');
    await expect(headers.nth(2)).toHaveText('Price');
    await practicePage.page.screenshot({ path: `${screenshotDir}/table-headers.png` });
  });

  test('should have at least 5 data rows in the courses table', async ({ practicePage }) => {
    // tbody has an empty header row at index 0, real data starts at index 1
    const dataRows = practicePage.coursesTable.locator('tbody tr td:first-child');
    const count = await dataRows.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('should contain Selenium Webdriver course row', async ({ practicePage, screenshotDir }) => {
    const row = practicePage.coursesTable.locator('tr', {
      hasText: 'Selenium Webdriver with Java',
    });
    await expect(row).toBeVisible();
    await practicePage.page.screenshot({ path: `${screenshotDir}/selenium-course-row.png` });
  });

  test('should show price 30 for Selenium Webdriver course', async ({ practicePage }) => {
    const row = practicePage.coursesTable.locator('tr', {
      hasText: 'Selenium Webdriver with Java',
    });
    const priceCell = row.locator('td').last();
    await expect(priceCell).toHaveText('30');
  });

  test('should find the free course (price = 0)', async ({ practicePage, screenshotDir }) => {
    // Use JS evaluation to find the row with price 0 — avoids strict wait on each cell
    const found = await practicePage.page.evaluate(() => {
      const table = document.getElementById('product');
      if (!table) return false;
      const cells = Array.from(table.querySelectorAll('tbody tr td:last-child'));
      return cells.some(cell => cell.textContent?.trim() === '0');
    });
    expect(found).toBe(true);
    await practicePage.page.screenshot({ path: `${screenshotDir}/free-course-found.png` });
  });

  test('all data rows should have Rahul Shetty as instructor', async ({ practicePage }) => {
    const names = await practicePage.page.evaluate(() => {
      const table = document.getElementById('product');
      if (!table) return [];
      return Array.from(table.querySelectorAll('tbody tr td:first-child'))
        .map(td => td.textContent?.trim() ?? '');
    });
    expect(names.length).toBeGreaterThan(0);
    for (const name of names) {
      expect(name).toBe('Rahul Shetty');
    }
  });
});
