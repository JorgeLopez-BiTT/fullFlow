import { test as base, expect, Page } from '@playwright/test';
import { PracticePage } from '../pages/PracticePage';
import * as fs from 'fs';
import * as path from 'path';

type Fixtures = {
  practicePage: PracticePage;
  screenshotDir: string;
};

export const test = base.extend<Fixtures>({
  screenshotDir: async ({}, use, testInfo) => {
    const dir = path.resolve('screenshots', testInfo.title.replace(/[^a-z0-9]/gi, '_').toLowerCase());
    fs.mkdirSync(dir, { recursive: true });
    await use(dir);
  },

  practicePage: async ({ page }, use) => {
    const pp = new PracticePage(page);
    await pp.goto();
    await use(pp);
  },
});

export { expect };
