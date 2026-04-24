import { test, expect } from './fixtures/base.fixture';

test.describe('Mouse Hover Example', () => {
  test('should reveal Top and Reload links on hover', async ({ practicePage, screenshotDir }) => {
    await practicePage.mouseHoverBtn.hover();

    await expect(practicePage.hoverTopLink).toBeVisible();
    await expect(practicePage.hoverReloadLink).toBeVisible();

    await practicePage.page.screenshot({ path: `${screenshotDir}/hover-links-visible.png` });
  });

  test('should navigate to top of page when clicking Top link', async ({ practicePage, screenshotDir }) => {
    await practicePage.mouseHoverBtn.hover();
    await practicePage.hoverTopLink.click();

    await expect(practicePage.page).toHaveURL(/AutomationPractice/);
    await practicePage.page.screenshot({ path: `${screenshotDir}/after-top-click.png` });
  });

  test('should reload page when clicking Reload link in hover menu', async ({ practicePage, screenshotDir }) => {
    await practicePage.mouseHoverBtn.hover();

    await Promise.all([
      practicePage.page.waitForLoadState('load'),
      practicePage.hoverReloadLink.click(),
    ]);

    await expect(practicePage.page).toHaveTitle('Practice Page');
    await practicePage.page.screenshot({ path: `${screenshotDir}/after-reload.png` });
  });

  test('hover menu should hide when mouse moves away', async ({ practicePage, screenshotDir }) => {
    await practicePage.mouseHoverBtn.hover();
    await expect(practicePage.hoverTopLink).toBeVisible();

    // Move mouse away to another element
    await practicePage.countryInput.hover();
    await practicePage.page.waitForTimeout(300);

    await practicePage.page.screenshot({ path: `${screenshotDir}/hover-menu-hidden.png` });
  });
});
