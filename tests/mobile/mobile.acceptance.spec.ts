import { expect, test, type Locator, type Page } from '@playwright/test';

async function expectNoHorizontalOverflow(page: Page, root: Locator = page.locator('html')) {
	await expect
		.poll(() => root.evaluate((element) => element.scrollWidth <= element.clientWidth))
		.toBe(true);
}

test('homepage stays visual and contained', async ({ page }) => {
	await page.goto('/');
	await page.evaluate(() => document.fonts.ready);
	await expectNoHorizontalOverflow(page);
	await expect(page.locator('.documentation')).toHaveCount(0);
	await expect(page.locator('.hero')).toHaveScreenshot('homepage-hero.png');

	for (const preview of await page.locator('.block-showcase__preview').all()) {
		await expect(preview).toBeVisible();
		await expectNoHorizontalOverflow(page, preview);
	}
});

test('library uses a touch-native component selector', async ({ page }) => {
	await page.goto('/library');
	await page.evaluate(() => document.fonts.ready);
	const picker = page.locator('.component-mobile-picker');
	const select = picker.getByLabel('Choose a component');

	await expect(picker).toBeVisible();
	await expect(page.locator('.component-picker')).toBeHidden();
	await select.selectOption('media-shutter');
	await expect(page.getByRole('heading', { name: 'Media Shutter' })).toBeVisible();
	await picker.getByRole('button', { name: 'Next' }).click();
	await expect(page.getByRole('heading', { name: 'Edge Trace' })).toBeVisible();
	await picker.getByRole('button', { name: 'Previous' }).click();
	await expect(page.getByRole('heading', { name: 'Media Shutter' })).toBeVisible();

	for (const control of [
		select,
		picker.getByRole('button', { name: 'Previous' }),
		picker.getByRole('button', { name: 'Next' })
	]) {
		const bounds = await control.boundingBox();
		expect(bounds?.height ?? 0).toBeGreaterThanOrEqual(44);
	}

	await expectNoHorizontalOverflow(page);
	await expect(page.locator('.explorer')).toHaveScreenshot('library-workbench.png');
});

test('editorial hero uses a bounded mobile media frame', async ({ page }) => {
	await page.goto('/preview/block/editorial-project-hero');
	await page.evaluate(() => document.fonts.ready);
	const root = page.locator('[data-block-root]');
	const media = root.locator('.bc-editorial-hero__media');
	const bounds = await media.boundingBox();

	await expectNoHorizontalOverflow(page, root);
	expect(bounds).not.toBeNull();
	expect((bounds?.height ?? 0) / (bounds?.width ?? 1)).toBeGreaterThan(1.2);
	expect((bounds?.height ?? 0) / (bounds?.width ?? 1)).toBeLessThan(1.3);
	await expect(root).toHaveScreenshot('editorial-project-hero.png');
});

test('project index keeps metadata and removes hover-only fields', async ({ page }) => {
	await page.goto('/preview/block/project-index');
	await page.evaluate(() => document.fonts.ready);
	const root = page.locator('[data-block-root]');

	await expectNoHorizontalOverflow(page, root);
	await expect(root.locator('.bc-project-index__details').first()).toContainText('Residential');
	await expect(root.locator('.bc-project-index__details').first()).toContainText('Aljezur, PT');
	await expect(root.locator('.bc-focus-beam__field')).toHaveCSS('display', 'none');
	await expect(root.locator('.bc-character-shift .is-target').first()).toHaveCSS('display', 'none');
	await expect(root).toHaveScreenshot('project-index.png');
});
