import { test, expect } from './fixtures/base.fixture';

test.describe('iFrame Example', () => {
  test('should load the iframe successfully', async ({ practicePage, screenshotDir }) => {
    const iframeLocator = practicePage.page.frameLocator('iframe');
    await expect(iframeLocator.locator('body')).toBeVisible();
    await practicePage.page.screenshot({ path: `${screenshotDir}/iframe-loaded.png` });
  });

  test('should display navigation links inside the iframe', async ({ practicePage, screenshotDir }) => {
    const frame = practicePage.page.frameLocator('iframe');
    await expect(frame.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(frame.getByRole('link', { name: 'Courses', exact: true })).toBeVisible();
    await practicePage.page.screenshot({ path: `${screenshotDir}/iframe-nav-links.png` });
  });

  test('should show JOIN NOW link inside the iframe', async ({ practicePage, screenshotDir }) => {
    const frame = practicePage.page.frameLocator('iframe');
    const joinNowLinks = frame.getByRole('link', { name: 'JOIN NOW' });
    await expect(joinNowLinks.first()).toBeVisible();
    await practicePage.page.screenshot({ path: `${screenshotDir}/iframe-join-now.png` });
  });

  test('should display student count inside iframe', async ({ practicePage, screenshotDir }) => {
    const frame = practicePage.page.frameLocator('iframe');
    const studentCount = frame.locator('text=600,000 +');
    await expect(studentCount).toBeVisible();
    await practicePage.page.screenshot({ path: `${screenshotDir}/iframe-student-count.png` });
  });

  test('should show Register and Login links inside iframe', async ({ practicePage, screenshotDir }) => {
    const frame = practicePage.page.frameLocator('iframe');
    await expect(frame.getByRole('link', { name: /Register/ })).toBeVisible();
    await expect(frame.getByRole('link', { name: /Login/ })).toBeVisible();
    await practicePage.page.screenshot({ path: `${screenshotDir}/iframe-register-login.png` });
  });
});
