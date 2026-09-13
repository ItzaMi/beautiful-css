import { test } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

type MotionTrigger = 'load' | 'hover' | 'focus' | 'pointer';

const motionCases: Array<{
	id: string;
	trigger: MotionTrigger;
	checkpoints: number[];
	target?: string;
}> = [
	{ id: 'line-reveal', trigger: 'load', checkpoints: [120, 280, 620] },
	{ id: 'character-shift', trigger: 'hover', target: 'a', checkpoints: [80, 180, 380] },
	{ id: 'signal-marquee', trigger: 'load', checkpoints: [600, 1400] },
	{
		id: 'cursor-field',
		trigger: 'pointer',
		target: '.bc-cursor-field',
		checkpoints: [60, 180, 420]
	},
	{ id: 'focus-beam', trigger: 'focus', target: 'a', checkpoints: [60, 180, 460] },
	{
		id: 'proximity-grid',
		trigger: 'pointer',
		target: '.bc-proximity-grid',
		checkpoints: [60, 180, 420]
	},
	{ id: 'media-shutter', trigger: 'focus', target: 'a', checkpoints: [100, 280, 620] },
	{ id: 'edge-trace', trigger: 'focus', target: 'a', checkpoints: [100, 360, 900] }
];

for (const motionCase of motionCases) {
	test(`${motionCase.id} motion review`, async ({ page }, testInfo) => {
		await page.goto(`/preview/component/${motionCase.id}`, { waitUntil: 'domcontentloaded' });
		await page.evaluate(() => document.fonts.ready);
		const preview = page.locator('[data-component-root]');
		const artifactDirectory = path.join(process.cwd(), 'motion-artifacts', motionCase.id);
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
		const target = motionCase.target ? preview.locator(motionCase.target).first() : preview;
		if (motionCase.trigger === 'hover') await target.hover();
		if (motionCase.trigger === 'focus') await target.focus();
		if (motionCase.trigger === 'pointer') {
			await target.hover({ position: { x: 760, y: 270 } });
		}

		let elapsed = 0;
		for (const checkpoint of motionCase.checkpoints) {
			await page.waitForTimeout(checkpoint - elapsed);
			elapsed = checkpoint;
			await attachFrame(`${checkpoint}ms`);
		}
	});
}
