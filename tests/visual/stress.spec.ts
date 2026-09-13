import { expect, test } from '@playwright/test';

const stressCases = [
	{ id: 'line-reveal', scenario: 'long-content', project: 'mobile' },
	{ id: 'line-reveal', scenario: 'type-metrics', project: 'desktop' },
	{ id: 'word-cascade', scenario: 'long-content', project: 'mobile' },
	{ id: 'word-cascade', scenario: 'type-metrics', project: 'desktop' },
	{ id: 'character-shift', scenario: 'long-content', project: 'mobile' },
	{ id: 'character-shift', scenario: 'type-metrics', project: 'desktop' },
	{ id: 'counter-roll', scenario: 'large-number', project: 'mobile' },
	{ id: 'crop-shift', scenario: 'wide-travel', project: 'desktop' },
	{ id: 'cursor-field', scenario: 'dense', project: 'desktop' },
	{ id: 'focus-beam', scenario: 'tight', project: 'desktop' },
	{ id: 'proximity-grid', scenario: 'dense', project: 'desktop' },
	{ id: 'media-shutter', scenario: 'horizontal', project: 'desktop' },
	{ id: 'section-signal', scenario: 'complete', project: 'mobile' },
	{ id: 'edge-trace', scenario: 'active', project: 'reduced-motion' }
] as const;

for (const stressCase of stressCases) {
	test(`${stressCase.id} ${stressCase.scenario}`, async ({ page }, testInfo) => {
		test.skip(testInfo.project.name !== stressCase.project, `Runs in ${stressCase.project}.`);
		await page.goto(
			`/preview/component/${stressCase.id}?scenario=${encodeURIComponent(stressCase.scenario)}`
		);
		await page.evaluate(() => document.fonts.ready);
		const preview = page.locator('[data-component-root]');
		await expect(preview).toBeVisible();

		if (stressCase.scenario === 'long-content' || stressCase.scenario === 'type-metrics') {
			const treatment = preview.locator(
				stressCase.id === 'line-reveal'
					? '.bc-line-reveal'
					: stressCase.id === 'word-cascade'
						? '.bc-word-cascade'
						: '.bc-character-shift'
			);
			const fits = await treatment.evaluate((element) => {
				const container = element.closest('[data-component-root]');
				if (!container) return false;
				const contentBounds = element.getBoundingClientRect();
				const containerBounds = container.getBoundingClientRect();
				return (
					contentBounds.left >= containerBounds.left &&
					contentBounds.right <= containerBounds.right &&
					contentBounds.width <= containerBounds.width
				);
			});
			expect(fits).toBe(true);
		}

		await expect(preview).toHaveScreenshot(`${stressCase.id}-${stressCase.scenario}.png`);

		if (
			stressCase.id === 'character-shift' ||
			stressCase.id === 'media-shutter' ||
			stressCase.id === 'crop-shift'
		) {
			await preview.locator('a').first().focus();
			await expect(preview).toHaveScreenshot(
				`${stressCase.id}-${stressCase.scenario}-interaction.png`
			);
		}

		if (stressCase.id === 'focus-beam') {
			await preview.locator('a').first().focus();
			await expect(preview).toHaveScreenshot(
				`${stressCase.id}-${stressCase.scenario}-interaction.png`
			);
		}

		if (stressCase.id === 'cursor-field' || stressCase.id === 'proximity-grid') {
			const pointerSurface = preview.locator(
				stressCase.id === 'cursor-field' ? '.bc-cursor-field' : '.bc-proximity-grid'
			);
			await pointerSurface.hover({ position: { x: 760, y: 270 } });
			await expect(preview).toHaveScreenshot(
				`${stressCase.id}-${stressCase.scenario}-interaction.png`
			);
		}
	});
}
