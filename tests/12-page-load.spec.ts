import { test, expect } from './fixtures/base.fixture';

test.describe('Page Load & General UI', () => {
  test('should have correct page title', async ({ practicePage }) => {
    await expect(practicePage.page).toHaveTitle('Practice Page');
  });

  test('should display Practice Page heading', async ({ practicePage, screenshotDir }) => {
    await expect(practicePage.page.getByRole('heading', { name: 'Practice Page' })).toBeVisible();
    await practicePage.page.screenshot({ path: `${screenshotDir}/page-heading.png` });
  });

  test('should display all section headings', async ({ practicePage, screenshotDir }) => {
    const sections = [
      'Radio Button Example',
      'Suggession Class Example',
      'Dropdown Example',
      'Checkbox Example',
      'Switch Window Example',
      'Switch Tab Example',
      'Switch To Alert Example',
      'Web Table Example',
      'Element Displayed Example',
      'Web Table Fixed header',
      'Mouse Hover Example',
      'iFrame Example',
    ];

    for (const section of sections) {
      await expect(
        practicePage.page.locator(`text=${section}`).first()
      ).toBeVisible();
    }

    await practicePage.page.screenshot({ path: `${screenshotDir}/all-sections.png`, fullPage: true });
  });

  test('should display top navigation bar', async ({ practicePage, screenshotDir }) => {
    await expect(practicePage.page.getByRole('button', { name: 'Practice' })).toBeVisible();
    await expect(practicePage.page.getByRole('button', { name: 'Login' })).toBeVisible();
    await expect(practicePage.page.getByRole('button', { name: 'Signup' })).toBeVisible();
    await practicePage.page.screenshot({ path: `${screenshotDir}/navbar.png` });
  });

  test('should load without critical JavaScript errors', async ({ practicePage }) => {
    const errors: string[] = [];
    practicePage.page.on('pageerror', err => {
      if (!err.message.includes('favicon')) {
        errors.push(err.message);
      }
    });
    await practicePage.page.reload();
    await practicePage.page.waitForLoadState('networkidle');
    expect(errors.length).toBe(0);
  });

  test('full page screenshot on load', async ({ practicePage, screenshotDir }) => {
    await practicePage.page.screenshot({ path: `${screenshotDir}/full-page.png`, fullPage: true });
  });
});
