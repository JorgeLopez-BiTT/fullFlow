import { test, expect } from './fixtures/base.fixture';

test.describe('Autocomplete / Suggestion Example', () => {
  test('should show suggestions when typing partial country name', async ({ practicePage, screenshotDir }) => {
    await practicePage.countryInput.fill('Ind');
    await practicePage.page.waitForSelector('ul.ui-autocomplete li.ui-menu-item', { state: 'visible' });

    const count = await practicePage.autocompleteSuggestions.count();
    expect(count).toBeGreaterThan(0);

    await practicePage.page.screenshot({ path: `${screenshotDir}/suggestions-visible.png` });
  });

  test('should select India from suggestions', async ({ practicePage, screenshotDir }) => {
    await practicePage.selectAutocomplete('Ind', 'India');

    await expect(practicePage.countryInput).toHaveValue('India');
    await practicePage.page.screenshot({ path: `${screenshotDir}/india-selected.png` });
  });

  test('should select Indonesia from suggestions', async ({ practicePage, screenshotDir }) => {
    await practicePage.selectAutocomplete('Indo', 'Indonesia');

    await expect(practicePage.countryInput).toHaveValue('Indonesia');
    await practicePage.page.screenshot({ path: `${screenshotDir}/indonesia-selected.png` });
  });

  test('should show no suggestions for unrecognised input', async ({ practicePage, screenshotDir }) => {
    await practicePage.countryInput.fill('ZZZZZZ');

    await practicePage.page.waitForTimeout(500);
    const visible = await practicePage.autocompleteSuggestions.isVisible().catch(() => false);
    expect(visible).toBeFalsy();

    await practicePage.page.screenshot({ path: `${screenshotDir}/no-suggestions.png` });
  });

  test('should filter suggestions as user types more characters', async ({ practicePage, screenshotDir }) => {
    await practicePage.countryInput.fill('Un');
    await practicePage.page.waitForSelector('ul.ui-autocomplete li.ui-menu-item', { state: 'visible' });
    const countBroad = await practicePage.autocompleteSuggestions.count();

    await practicePage.countryInput.fill('United K');
    await practicePage.page.waitForTimeout(300);
    const countNarrow = await practicePage.autocompleteSuggestions.count();

    expect(countNarrow).toBeLessThanOrEqual(countBroad);
    await practicePage.page.screenshot({ path: `${screenshotDir}/filtered-suggestions.png` });
  });
});
