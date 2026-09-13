import { test } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const blockCases = [
	{
		id: 'editorial-project-hero',
		target: '.bc-media-shutter',
		checkpoints: [100, 280, 620]
	},
	{
		id: 'project-index',
		target: '.bc-project-index__list a',
		checkpoints: [80, 180, 460]
	}
] as const;

for (const motionCase of blockCases) {
	test(`${motionCase.id} composed motion review`, async ({ page }, testInfo) => {
		await page.goto(`/preview/block/${motionCase.id}`, { waitUntil: 'domcontentloaded' });
		await page.evaluate(() => document.fonts.ready);
		const preview = page.locator('[data-block-root]');
		const artifactDirectory = path.join(process.cwd(), 'motion-artifacts', 'blocks', motionCase.id);
		await mkdir(artifactDirectory, { recursive: true });

		async function attachFrame(label: string) {
			const framePath = path.join(artifactDirectory, `${label}.png`);
			await preview.screenshot({ animations: 'allow', path: framePath });
			await testInfo.attach(`${motionCase.id}-${label}`, {
				path: framePath,
				contentType: 'image/png'
			});
		}

		await attachFrame('rest');
		await preview.locator(motionCase.target).first().focus();

		let elapsed = 0;
		for (const checkpoint of motionCase.checkpoints) {
			await page.waitForTimeout(checkpoint - elapsed);
			elapsed = checkpoint;
			await attachFrame(`${checkpoint}ms`);
		}
	});
}
