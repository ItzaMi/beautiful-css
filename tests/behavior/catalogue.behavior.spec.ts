import { expect, test } from '@playwright/test';

test('component deep links select correctly and participate in browser history', async ({
	page
}) => {
	await page.goto('/library#media-shutter');
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
	await page.goto('/library#focus-beam');
	await page.locator('.install-details').getByText('CLI install (optional)').click();
	await expect(page.getByLabel('Focus Beam install command')).toContainText(
		'npx shadcn@latest add ItzaMi/beautiful-css/focus-beam#concept/visual-component-library'
	);
	await expect(
		page.locator('.workbench').getByRole('button', { name: 'Copy command' })
	).toBeVisible();
	await expect(page.getByRole('button', { name: 'Copy link' })).toBeVisible();
	await expect(
		page.locator('.workbench').getByRole('link', { name: 'Open preview' })
	).toHaveAttribute('href', '/preview/component/focus-beam');
});

test('composed blocks expose install commands and isolated previews', async ({ page }) => {
	await page.goto('/library#blocks');
	await expect(page.getByRole('heading', { name: 'Editorial Project Hero' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Project Index', exact: true })).toBeVisible();
	await expect(page.getByLabel('Editorial Project Hero install command')).toContainText(
		'ItzaMi/beautiful-css/editorial-project-hero#concept/visual-component-library'
	);
	await expect(page.getByLabel('Project Index install command')).toContainText(
		'ItzaMi/beautiful-css/project-index#concept/visual-component-library'
	);
	await expect(page.locator('a[href="/preview/block/project-index"]')).toBeVisible();
});

test('homepage remains a showcase without component documentation', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('link', { name: 'Browse the library' })).toHaveAttribute(
		'href',
		'/library'
	);
	await expect(page.locator('.documentation')).toHaveCount(0);
	await expect(page.locator('.install-command')).toHaveCount(0);
	await expect(page.locator('.block-showcase__install')).toHaveCount(0);
});
