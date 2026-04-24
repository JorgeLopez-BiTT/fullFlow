import { test, expect } from './fixtures/base.fixture';

test.describe('Switch Window / Tab Example', () => {
  test('should open a new window when clicking Open Window button', async ({ practicePage, screenshotDir }) => {
    const [newPage] = await Promise.all([
      practicePage.page.context().waitForEvent('page'),
      practicePage.openWindowBtn.click(),
    ]);

    await newPage.waitForLoadState('domcontentloaded').catch(() => {});
    expect(newPage.url()).toBeTruthy();
    await newPage.screenshot({ path: `${screenshotDir}/new-window.png` }).catch(() => {});
    await newPage.close();
  });

  test('original window should remain accessible after opening new window', async ({ practicePage, screenshotDir }) => {
    const [newPage] = await Promise.all([
      practicePage.page.context().waitForEvent('page'),
      practicePage.openWindowBtn.click(),
    ]);

    await newPage.waitForLoadState('load');
    await expect(practicePage.page).toHaveTitle('Practice Page');
    await practicePage.page.screenshot({ path: `${screenshotDir}/original-window-intact.png` });
    await newPage.close();
  });

  test('should open a new tab when clicking Open Tab link', async ({ practicePage, screenshotDir }) => {
    const [newTab] = await Promise.all([
      practicePage.page.context().waitForEvent('page'),
      practicePage.openTabLink.click(),
    ]);

    await newTab.waitForLoadState('load');
    expect(newTab.url()).toContain('qaclickacademy');
    await newTab.screenshot({ path: `${screenshotDir}/new-tab.png` });
    await newTab.close();
  });

  test('should switch back to original tab after opening new tab', async ({ practicePage, screenshotDir }) => {
    const [newTab] = await Promise.all([
      practicePage.page.context().waitForEvent('page'),
      practicePage.openTabLink.click(),
    ]);

    await newTab.waitForLoadState('load');
    await practicePage.page.bringToFront();
    await expect(practicePage.page).toHaveTitle('Practice Page');
    await practicePage.page.screenshot({ path: `${screenshotDir}/switch-back-to-original.png` });
    await newTab.close();
  });
});
