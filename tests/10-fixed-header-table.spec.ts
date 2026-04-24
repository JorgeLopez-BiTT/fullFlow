import { test, expect } from './fixtures/base.fixture';

test.describe('Web Table Fixed Header', () => {
  test('should display headers: Name, Position, City, Amount', async ({ practicePage, screenshotDir }) => {
    const headers = practicePage.fixedTable.locator('thead th');
    await expect(headers.nth(0)).toHaveText('Name');
    await expect(headers.nth(1)).toHaveText('Position');
    await expect(headers.nth(2)).toHaveText('City');
    await expect(headers.nth(3)).toHaveText('Amount');
    await practicePage.page.screenshot({ path: `${screenshotDir}/fixed-table-headers.png` });
  });

  test('should have 9 data rows', async ({ practicePage }) => {
    const rows = practicePage.fixedTable.locator('tbody tr');
    await expect(rows).toHaveCount(9);
  });

  test('should display correct total amount of 296', async ({ practicePage, screenshotDir }) => {
    const total = await practicePage.getFixedTableTotalAmount();
    expect(total).toBe(296);
    await practicePage.page.screenshot({ path: `${screenshotDir}/total-amount.png` });
  });

  test('should show Alex as Engineer in Chennai', async ({ practicePage }) => {
    const alexRow = practicePage.fixedTable.locator('tbody tr', { hasText: 'Alex' });
    await expect(alexRow.locator('td').nth(1)).toHaveText('Engineer');
    await expect(alexRow.locator('td').nth(2)).toHaveText('Chennai');
  });

  test('should calculate sum of Amount column equal to displayed total', async ({ practicePage }) => {
    const sum = await practicePage.page.evaluate(() => {
      const table = document.querySelector('.tableFixHead table') as HTMLTableElement;
      if (!table) return 0;
      const cells = Array.from(table.querySelectorAll('tbody tr td:last-child'));
      return cells.reduce((acc, cell) => acc + parseInt(cell.textContent?.trim() || '0'), 0);
    });
    const displayedTotal = await practicePage.getFixedTableTotalAmount();
    expect(sum).toBe(displayedTotal);
  });

  test('Chennai employees should appear multiple times in the table', async ({ practicePage, screenshotDir }) => {
    const chennaiRows = practicePage.fixedTable.locator('tbody tr td:nth-child(3)', {
      hasText: 'Chennai',
    });
    const count = await chennaiRows.count();
    expect(count).toBeGreaterThan(1);
    await practicePage.page.screenshot({ path: `${screenshotDir}/chennai-rows.png` });
  });
});
