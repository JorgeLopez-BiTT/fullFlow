import { test, expect } from './fixtures/base.fixture';

test.describe('Dropdown Example', () => {
  test('should have empty/default value on page load', async ({ practicePage, screenshotDir }) => {
    const value = await practicePage.dropdown.inputValue();
    expect(['', 'Select']).toContain(value);
    await practicePage.page.screenshot({ path: `${screenshotDir}/dropdown-default.png` });
  });

  test('should select Option1 by label', async ({ practicePage, screenshotDir }) => {
    await practicePage.dropdown.selectOption({ label: 'Option1' });
    await expect(practicePage.dropdown).toHaveValue('option1');
    await practicePage.page.screenshot({ path: `${screenshotDir}/dropdown-option1.png` });
  });

  test('should select Option2 by label', async ({ practicePage, screenshotDir }) => {
    await practicePage.dropdown.selectOption({ label: 'Option2' });
    await expect(practicePage.dropdown).toHaveValue('option2');
    await practicePage.page.screenshot({ path: `${screenshotDir}/dropdown-option2.png` });
  });

  test('should select Option3 by label', async ({ practicePage, screenshotDir }) => {
    await practicePage.dropdown.selectOption({ label: 'Option3' });
    await expect(practicePage.dropdown).toHaveValue('option3');
    await practicePage.page.screenshot({ path: `${screenshotDir}/dropdown-option3.png` });
  });

  test('should cycle through all options', async ({ practicePage, screenshotDir }) => {
    const options = [
      { label: 'Option1', value: 'option1' },
      { label: 'Option2', value: 'option2' },
      { label: 'Option3', value: 'option3' },
    ];
    for (const opt of options) {
      await practicePage.dropdown.selectOption({ label: opt.label });
      await expect(practicePage.dropdown).toHaveValue(opt.value);
    }
    await practicePage.page.screenshot({ path: `${screenshotDir}/dropdown-cycle-complete.png` });
  });

  test('should list exactly 4 options including Select', async ({ practicePage }) => {
    const allOptions = await practicePage.dropdown.locator('option').allTextContents();
    expect(allOptions).toEqual(['Select', 'Option1', 'Option2', 'Option3']);
  });
});
