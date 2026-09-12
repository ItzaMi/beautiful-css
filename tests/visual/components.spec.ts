import { expect, test } from '@playwright/test';
import { visualCases } from '../../src/data/visual-cases';

for (const visualCase of visualCases) {
	test(`${visualCase.id} baseline`, async ({ page }) => {
		await page.goto(`/preview/${visualCase.kind}/${visualCase.id}`);
		await page.evaluate(() => document.fonts.ready);
		const preview = page.locator(
			visualCase.kind === 'component' ? '[data-component-root]' : '[data-block-root]'
		);
		await expect(preview).toBeVisible();
		await expect(preview).toHaveScreenshot(`${visualCase.id}.png`);
	});

	test(`${visualCase.id} interaction`, async ({ page }, testInfo) => {
		test.skip(
			testInfo.project.name !== 'desktop',
			'Interaction snapshots use the desktop project.'
		);
		await page.goto(`/preview/${visualCase.kind}/${visualCase.id}`);
		await page.evaluate(() => document.fonts.ready);
		const component = page.locator(
			visualCase.kind === 'component' ? '[data-component-root]' : '[data-block-root]'
		);

		if (visualCase.kind === 'block') {
			test.skip(true, 'Register block-specific interaction setup with the block visual case.');
		}

		if (visualCase.id === 'cursor-field' || visualCase.id === 'proximity-grid') {
			const pointerSurface = component.locator(
				visualCase.id === 'cursor-field' ? '.bc-cursor-field' : '.bc-proximity-grid'
			);
			await pointerSurface.hover({ position: { x: 760, y: 270 } });
		} else if (visualCase.id === 'character-shift' || visualCase.id === 'media-shutter') {
			await component.locator('a').first().focus();
		} else if (visualCase.id === 'focus-beam' || visualCase.id === 'edge-trace') {
			await component.locator('a').first().focus();
		} else {
			test.skip(true, 'This component has no separate interaction state.');
		}

		await expect(component).toHaveScreenshot(`${visualCase.id}-interaction.png`);
	});
}
