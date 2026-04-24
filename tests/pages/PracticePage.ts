import { Page, Locator, expect } from '@playwright/test';
import * as path from 'path';

export class PracticePage {
  readonly page: Page;
  readonly url = 'https://rahulshettyacademy.com/AutomationPractice/';

  // Radio Buttons
  readonly radio1: Locator;
  readonly radio2: Locator;
  readonly radio3: Locator;

  // Autocomplete
  readonly countryInput: Locator;
  readonly autocompleteSuggestions: Locator;

  // Dropdown
  readonly dropdown: Locator;

  // Checkboxes
  readonly checkbox1: Locator;
  readonly checkbox2: Locator;
  readonly checkbox3: Locator;

  // Switch Window / Tab / Alert
  readonly openWindowBtn: Locator;
  readonly openTabLink: Locator;
  readonly alertNameInput: Locator;
  readonly alertBtn: Locator;
  readonly confirmBtn: Locator;

  // Hide / Show
  readonly hideBtn: Locator;
  readonly showBtn: Locator;
  readonly hideShowInput: Locator;

  // Mouse Hover
  readonly mouseHoverBtn: Locator;
  readonly hoverTopLink: Locator;
  readonly hoverReloadLink: Locator;

  // Web Table (courses)
  readonly coursesTable: Locator;

  // Fixed Header Table
  readonly fixedTable: Locator;
  readonly totalAmountText: Locator;

  constructor(page: Page) {
    this.page = page;

    this.radio1 = page.locator('#radio-btn-example input[value="radio1"]');
    this.radio2 = page.locator('#radio-btn-example input[value="radio2"]');
    this.radio3 = page.locator('#radio-btn-example input[value="radio3"]');

    this.countryInput = page.getByRole('textbox', { name: 'Type to Select Countries' });
    this.autocompleteSuggestions = page.locator('ul.ui-autocomplete li.ui-menu-item');

    this.dropdown = page.locator('#dropdown-class-example');

    this.checkbox1 = page.locator('#checkBoxOption1');
    this.checkbox2 = page.locator('#checkBoxOption2');
    this.checkbox3 = page.locator('#checkBoxOption3');

    this.openWindowBtn = page.getByRole('button', { name: 'Open Window' });
    this.openTabLink = page.getByRole('link', { name: 'Open Tab' });
    this.alertNameInput = page.getByRole('textbox', { name: 'Enter Your Name' });
    this.alertBtn = page.getByRole('button', { name: 'Alert' });
    this.confirmBtn = page.getByRole('button', { name: 'Confirm' });

    this.hideBtn = page.getByRole('button', { name: 'Hide' });
    this.showBtn = page.getByRole('button', { name: 'Show' });
    this.hideShowInput = page.locator('#displayed-text');

    this.mouseHoverBtn = page.getByRole('button', { name: 'Mouse Hover' });
    this.hoverTopLink = page.locator('.mouse-hover-content a[href="#top"]');
    this.hoverReloadLink = page.locator('.mouse-hover-content a[href=""]');

    this.coursesTable = page.locator('#product').first();
    this.fixedTable = page.locator('.tableFixHead table');
    this.totalAmountText = page.locator('.totalAmount');
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async takeScreenshot(name: string) {
    const dir = path.resolve('screenshots');
    await this.page.screenshot({ path: `${dir}/${name}.png`, fullPage: false });
  }

  async selectAutocomplete(query: string, optionText: string) {
    await this.countryInput.fill(query);
    await this.page.waitForSelector('ul.ui-autocomplete li.ui-menu-item', { state: 'visible' });
    await this.page.locator('ul.ui-autocomplete li.ui-menu-item div').filter({ hasText: new RegExp(`^${optionText}$`) }).click();
  }

  async getTableCellValue(rowIndex: number, colIndex: number): Promise<string> {
    const rows = this.coursesTable.locator('tr');
    const cell = rows.nth(rowIndex).locator('td').nth(colIndex);
    return (await cell.textContent()) ?? '';
  }

  async getFixedTableTotalAmount(): Promise<number> {
    const text = await this.totalAmountText.textContent();
    const match = text?.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  }
}
