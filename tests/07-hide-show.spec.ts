import { test, expect } from './fixtures/base.fixture';

test.describe('Element Displayed Example (Hide/Show)', () => {
  test('input should be visible on page load', async ({ practicePage, screenshotDir }) => {
    await expect(practicePage.hideShowInput).toBeVisible();
    await practicePage.page.screenshot({ path: `${screenshotDir}/input-visible-on-load.png` });
  });

  test('should hide the input field when clicking Hide button', async ({ practicePage, screenshotDir }) => {
    await practicePage.hideBtn.click();
    await expect(practicePage.hideShowInput).toBeHidden();
    await practicePage.page.screenshot({ path: `${screenshotDir}/input-hidden.png` });
  });

  test('should show the input field when clicking Show button after hiding', async ({ practicePage, screenshotDir }) => {
    await practicePage.hideBtn.click();
    await expect(practicePage.hideShowInput).toBeHidden();

    await practicePage.showBtn.click();
    await expect(practicePage.hideShowInput).toBeVisible();
    await practicePage.page.screenshot({ path: `${screenshotDir}/input-shown-again.png` });
  });

  test('should toggle hide/show multiple times correctly', async ({ practicePage, screenshotDir }) => {
    for (let i = 0; i < 3; i++) {
      await practicePage.hideBtn.click();
      await expect(practicePage.hideShowInput).toBeHidden();

      await practicePage.showBtn.click();
      await expect(practicePage.hideShowInput).toBeVisible();
    }
    await practicePage.page.screenshot({ path: `${screenshotDir}/toggle-multiple-times.png` });
  });

  test('Show button should not cause an error when input is already visible', async ({ practicePage, screenshotDir }) => {
    await expect(practicePage.hideShowInput).toBeVisible();
    await practicePage.showBtn.click();
    await expect(practicePage.hideShowInput).toBeVisible();
    await practicePage.page.screenshot({ path: `${screenshotDir}/show-when-visible.png` });
  });
});
