import { test, expect } from './fixtures/base.fixture';

test.describe('Checkbox Example', () => {
  test('should check Option1', async ({ practicePage, screenshotDir }) => {
    await practicePage.checkbox1.check();
    await expect(practicePage.checkbox1).toBeChecked();
    await practicePage.page.screenshot({ path: `${screenshotDir}/checkbox1-checked.png` });
  });

  test('should check Option2', async ({ practicePage, screenshotDir }) => {
    await practicePage.checkbox2.check();
    await expect(practicePage.checkbox2).toBeChecked();
    await practicePage.page.screenshot({ path: `${screenshotDir}/checkbox2-checked.png` });
  });

  test('should check Option3', async ({ practicePage, screenshotDir }) => {
    await practicePage.checkbox3.check();
    await expect(practicePage.checkbox3).toBeChecked();
    await practicePage.page.screenshot({ path: `${screenshotDir}/checkbox3-checked.png` });
  });

  test('should check multiple checkboxes simultaneously', async ({ practicePage, screenshotDir }) => {
    await practicePage.checkbox1.check();
    await practicePage.checkbox2.check();
    await practicePage.checkbox3.check();

    await expect(practicePage.checkbox1).toBeChecked();
    await expect(practicePage.checkbox2).toBeChecked();
    await expect(practicePage.checkbox3).toBeChecked();

    await practicePage.page.screenshot({ path: `${screenshotDir}/all-checked.png` });
  });

  test('should uncheck a previously checked checkbox', async ({ practicePage, screenshotDir }) => {
    await practicePage.checkbox1.check();
    await expect(practicePage.checkbox1).toBeChecked();

    await practicePage.checkbox1.uncheck();
    await expect(practicePage.checkbox1).not.toBeChecked();

    await practicePage.page.screenshot({ path: `${screenshotDir}/checkbox-unchecked.png` });
  });

  test('should allow independent check/uncheck of each option', async ({ practicePage, screenshotDir }) => {
    await practicePage.checkbox1.check();
    await practicePage.checkbox3.check();

    await expect(practicePage.checkbox1).toBeChecked();
    await expect(practicePage.checkbox2).not.toBeChecked();
    await expect(practicePage.checkbox3).toBeChecked();

    await practicePage.page.screenshot({ path: `${screenshotDir}/mixed-checkboxes.png` });
  });
});
