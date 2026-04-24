import { test, expect } from './fixtures/base.fixture';

test.describe('Radio Button Example', () => {
  test('should select Radio1 and verify only it is checked', async ({ practicePage, screenshotDir }) => {
    await practicePage.radio1.check();

    await expect(practicePage.radio1).toBeChecked();
    await expect(practicePage.radio2).not.toBeChecked();
    await expect(practicePage.radio3).not.toBeChecked();

    await practicePage.page.screenshot({ path: `${screenshotDir}/radio1-selected.png` });
  });

  test('should select Radio2 and verify only it is checked', async ({ practicePage, screenshotDir }) => {
    await practicePage.radio2.check();

    await expect(practicePage.radio2).toBeChecked();
    await expect(practicePage.radio1).not.toBeChecked();
    await expect(practicePage.radio3).not.toBeChecked();

    await practicePage.page.screenshot({ path: `${screenshotDir}/radio2-selected.png` });
  });

  test('should select Radio3 and verify only it is checked', async ({ practicePage, screenshotDir }) => {
    await practicePage.radio3.check();

    await expect(practicePage.radio3).toBeChecked();
    await expect(practicePage.radio1).not.toBeChecked();
    await expect(practicePage.radio2).not.toBeChecked();

    await practicePage.page.screenshot({ path: `${screenshotDir}/radio3-selected.png` });
  });

  test('should switch selection between radio buttons', async ({ practicePage, screenshotDir }) => {
    await practicePage.radio1.check();
    await expect(practicePage.radio1).toBeChecked();

    await practicePage.radio2.check();
    await expect(practicePage.radio2).toBeChecked();
    await expect(practicePage.radio1).not.toBeChecked();

    await practicePage.page.screenshot({ path: `${screenshotDir}/radio-switch.png` });
  });
});
