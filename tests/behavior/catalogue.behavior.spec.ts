import { expect, test } from '@playwright/test';

test('component deep links select correctly and participate in browser history', async ({
	page
}) => {
	await page.goto('/#media-shutter');
	await expect(page.getByRole('heading', { name: 'Media Shutter' })).toBeVisible();
	await expect(page.locator('[data-component-id="media-shutter"]')).toHaveAttribute(
		'aria-pressed',
		'true'
	);

	await page.locator('[data-component-id="edge-trace"]').click();
	await expect(page).toHaveURL(/#edge-trace$/);
	await expect(page.getByRole('heading', { name: 'Edge Trace' })).toBeVisible();

	await page.goBack();
	await expect(page).toHaveURL(/#media-shutter$/);
	await expect(page.getByRole('heading', { name: 'Media Shutter' })).toBeVisible();
});

test('selected components expose direct install and sharing actions', async ({ page }) => {
	await page.goto('/#focus-beam');
	await expect(page.getByLabel('Focus Beam install command')).toContainText(
		'npx shadcn@latest add ItzaMi/beautiful-css/focus-beam#concept/visual-component-library'
	);
	await expect(page.getByRole('button', { name: 'Copy command' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Copy link' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'Open preview' })).toHaveAttribute(
		'href',
		'/preview/component/focus-beam'
	);
});
