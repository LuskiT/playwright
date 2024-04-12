//@ts-check
import { test, expect } from "@playwright/test"

test.beforeEach( async ({ page, browser }) => {
    test.info().annotations.push({
        type: 'browser version',
        description: browser.version(),
    });
    await page.goto('/');
});

test('Click on the Get started button.', { tag: '@mvp' }, async ({ page }) => {
    console.log('test that depends on the database');
    await expect(page).toHaveTitle(/Playwright/);
    await page.getByRole('link', { name: 'Get started', }).click();
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});