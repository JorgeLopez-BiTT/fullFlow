import { test, expect } from './fixtures/base.fixture';

test.describe('Switch To Alert Example', () => {
  test('should trigger simple alert with name and accept it', async ({ practicePage, screenshotDir }) => {
    await practicePage.alertNameInput.fill('TestUser');

    let dialogMessage = '';
    let dialogType = '';
    practicePage.page.once('dialog', async dialog => {
      dialogType = dialog.type();
      dialogMessage = dialog.message();
      await dialog.accept();
    });

    await practicePage.alertBtn.click();
    await practicePage.page.waitForTimeout(300);

    expect(dialogType).toBe('alert');
    expect(dialogMessage).toContain('TestUser');
    await practicePage.page.screenshot({ path: `${screenshotDir}/after-alert-accepted.png` });
  });

  test('should trigger alert with empty name', async ({ practicePage, screenshotDir }) => {
    let triggered = false;
    practicePage.page.once('dialog', async dialog => {
      triggered = true;
      await dialog.accept();
    });

    await practicePage.alertBtn.click();
    await practicePage.page.waitForTimeout(300);

    expect(triggered).toBe(true);
    await practicePage.page.screenshot({ path: `${screenshotDir}/alert-empty-name.png` });
  });

  test('should accept confirm dialog', async ({ practicePage, screenshotDir }) => {
    await practicePage.alertNameInput.fill('ConfirmUser');

    let dialogType = '';
    practicePage.page.once('dialog', async dialog => {
      dialogType = dialog.type();
      await dialog.accept();
    });

    await practicePage.confirmBtn.click();
    await practicePage.page.waitForTimeout(300);

    expect(dialogType).toBe('confirm');
    await practicePage.page.screenshot({ path: `${screenshotDir}/after-confirm-accepted.png` });
  });

  test('should dismiss confirm dialog', async ({ practicePage, screenshotDir }) => {
    await practicePage.alertNameInput.fill('DismissUser');

    let dismissed = false;
    practicePage.page.once('dialog', async dialog => {
      dismissed = true;
      await dialog.dismiss();
    });

    await practicePage.confirmBtn.click();
    await practicePage.page.waitForTimeout(300);

    expect(dismissed).toBe(true);
    await practicePage.page.screenshot({ path: `${screenshotDir}/after-confirm-dismissed.png` });
  });

  test('confirm dialog message should reference entered name', async ({ practicePage }) => {
    const name = 'Rahul';
    await practicePage.alertNameInput.fill(name);

    let message = '';
    practicePage.page.once('dialog', async dialog => {
      message = dialog.message();
      await dialog.dismiss();
    });

    await practicePage.confirmBtn.click();
    await practicePage.page.waitForTimeout(300);

    expect(message).toContain(name);
  });
});
