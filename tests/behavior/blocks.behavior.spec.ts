import { expect, test, type Page } from '@playwright/test';

async function openBlock(page: Page, id: 'editorial-project-hero' | 'project-index') {
	await page.goto(`/preview/block/${id}`);
	await page.evaluate(() => document.fonts.ready);
	const root = page.locator('[data-block-root]');
	await expect(root).toHaveAttribute('data-preview-id', id);
	return root;
}

test('editorial hero preserves content and native link semantics', async ({ page }) => {
	const root = await openBlock(page, 'editorial-project-hero');
	await expect(root.getByRole('heading', { name: 'A house shaped by weather.' })).toBeVisible();
	await expect(
		root.getByRole('img', {
			name: 'Geometric architectural study in blue, black, and white'
		})
	).toBeVisible();
	await expect(root.getByRole('link', { name: 'View the case study', exact: true })).toBeVisible();

	const mediaLink = root.locator('.bc-media-shutter');
	await mediaLink.focus();
	await expect(mediaLink).toBeFocused();
	await expect
		.poll(() =>
			mediaLink
				.locator('.bc-media-shutter__panes i')
				.first()
				.evaluate((node) => getComputedStyle(node).transform)
		)
		.not.toBe('none');
});

test('project index exposes every project and follows keyboard focus', async ({ page }) => {
	const root = await openBlock(page, 'project-index');
	await expect(root.getByRole('heading', { name: 'Selected index / 2024—26' })).toBeVisible();
	await expect(root.locator('.bc-project-index__list > li')).toHaveCount(4);

	const firstProject = root.getByRole('link', { name: 'View House of Tides' });
	await firstProject.focus();
	await expect(firstProject).toBeFocused();
	await expect(root.locator('.bc-focus-beam')).toHaveAttribute('data-engaged', 'true');
	await expect
		.poll(() =>
			firstProject.locator('.is-target').evaluate((node) => getComputedStyle(node).clipPath)
		)
		.not.toContain('100%');
});

test('blocks retain readable end states with reduced motion', async ({ page }) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });

	let root = await openBlock(page, 'editorial-project-hero');
	await expect(root.locator('.bc-media-shutter__panes')).toHaveCSS('display', 'none');
	await expect(root.locator('.bc-edge-trace__line')).toHaveCSS('display', 'none');
	await expect(root.getByRole('heading', { name: 'A house shaped by weather.' })).toBeVisible();

	root = await openBlock(page, 'project-index');
	await expect(root.getByRole('link', { name: 'View House of Tides' })).toBeVisible();
	await expect(root.locator('.bc-focus-beam__field')).toHaveCSS('transition-duration', '0s');
});
