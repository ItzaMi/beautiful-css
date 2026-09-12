import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/');
	await page.evaluate(() => document.fonts.ready);
});

test('catalogue hero', async ({ page }) => {
	await expect(page.locator('.hero')).toHaveScreenshot('catalogue-hero.png');
});

test('catalogue workbench', async ({ page }) => {
	await expect(page.locator('.explorer')).toHaveScreenshot('catalogue-workbench.png');
});
