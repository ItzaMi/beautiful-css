import { expect, test } from '@playwright/test';

test('editorial project hero media focus', async ({ page }, testInfo) => {
	test.skip(testInfo.project.name !== 'desktop', 'Interaction snapshot uses the desktop project.');
	await page.goto('/preview/block/editorial-project-hero');
	await page.evaluate(() => document.fonts.ready);
	const root = page.locator('[data-block-root]');
	await root.locator('.bc-media-shutter').focus();
	await expect(root).toHaveScreenshot('editorial-project-hero-media-focus.png');
});

test('project index keyboard focus', async ({ page }, testInfo) => {
	test.skip(testInfo.project.name !== 'desktop', 'Interaction snapshot uses the desktop project.');
	await page.goto('/preview/block/project-index');
	await page.evaluate(() => document.fonts.ready);
	const root = page.locator('[data-block-root]');
	await root.getByRole('link', { name: 'View Mora Workshop' }).focus();
	await expect(root).toHaveScreenshot('project-index-keyboard-focus.png');
});
