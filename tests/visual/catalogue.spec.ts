import { expect, test } from '@playwright/test';

test('catalogue hero', async ({ page }) => {
	await page.goto('/');
	await page.evaluate(() => document.fonts.ready);
	await expect(page.locator('.hero')).toHaveScreenshot('catalogue-hero.png');
});

test('catalogue workbench', async ({ page }) => {
	await page.goto('/library');
	await page.evaluate(() => document.fonts.ready);
	await expect(page.locator('.explorer')).toHaveScreenshot('catalogue-workbench.png');
});
