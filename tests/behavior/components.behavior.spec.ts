import { expect, test, type Page } from '@playwright/test';

const componentIds = [
	'line-reveal',
	'character-shift',
	'signal-marquee',
	'cursor-field',
	'focus-beam',
	'proximity-grid',
	'media-shutter',
	'edge-trace'
] as const;

async function openComponent(page: Page, id: (typeof componentIds)[number], scenario?: string) {
	const query = scenario ? `?scenario=${scenario}` : '';
	await page.goto(`/preview/component/${id}${query}`);
	await page.evaluate(() => document.fonts.ready);
	const root = page.locator('[data-component-root]');
	await expect(root).toBeVisible();
	return root;
}

test('all components render with their intended semantics', async ({ page }) => {
	const pageErrors: string[] = [];
	page.on('pageerror', (error) => pageErrors.push(error.message));

	for (const id of componentIds) {
		const root = await openComponent(page, id);
		await expect(root).toHaveAttribute('data-component-root', id);

		if (id === 'line-reveal') {
			await expect(root.locator('.bc-accessible-copy')).toHaveText(
				'Built slowly. Remembered quickly.'
			);
		}
		if (id === 'character-shift') {
			await expect(root.getByRole('link', { name: 'Read the journal' })).toHaveCount(1);
		}
		if (id === 'signal-marquee') {
			await expect(root.locator('.bc-accessible-copy')).toHaveText(
				'Independent, Responsive, Editable, Yours'
			);
			await expect(root.locator('.bc-signal-marquee__track')).toHaveAttribute(
				'aria-hidden',
				'true'
			);
		}
		if (id === 'cursor-field' || id === 'proximity-grid') {
			await expect(root.locator(`.bc-${id}`)).toHaveAttribute('aria-hidden', 'true');
		}
		if (id === 'focus-beam') {
			await expect(root.getByRole('navigation', { name: 'Example project index' })).toBeVisible();
			await expect(root.getByRole('link')).toHaveCount(3);
		}
		if (id === 'media-shutter') {
			await expect(
				root.getByRole('img', { name: 'Geometric study in blue, black, and white' })
			).toBeVisible();
		}
		if (id === 'edge-trace') {
			await expect(root.getByRole('link', { name: 'Start a conversation' })).toBeVisible();
		}
	}

	expect(pageErrors).toEqual([]);
});

test('keyboard and reduced-motion equivalents preserve meaning', async ({ page }) => {
	let root = await openComponent(page, 'character-shift');
	const characterLink = root.getByRole('link', { name: 'Read the journal' });
	await characterLink.focus();
	await expect(characterLink).toBeFocused();
	await expect
		.poll(() =>
			characterLink.locator('.is-target').evaluate((node) => getComputedStyle(node).clipPath)
		)
		.not.toContain('100%');

	root = await openComponent(page, 'focus-beam');
	await root.getByRole('link').first().focus();
	await expect(root.locator('.bc-focus-beam')).toHaveAttribute('data-engaged', 'true');

	root = await openComponent(page, 'media-shutter');
	await root.getByRole('link').focus();
	await expect(root.getByRole('link')).toBeFocused();

	await page.emulateMedia({ reducedMotion: 'reduce' });
	root = await openComponent(page, 'signal-marquee');
	await expect(root.locator('.bc-signal-marquee__track')).toHaveCSS('animation-name', 'none');
	root = await openComponent(page, 'media-shutter');
	await expect(root.locator('.bc-media-shutter__panes')).toHaveCSS('display', 'none');
	root = await openComponent(page, 'edge-trace');
	await expect(root.locator('.bc-edge-trace__line')).toHaveCSS('display', 'none');
});

test('consumer handlers compose and queued pointer work is cancelled on exit', async ({ page }) => {
	for (const id of ['cursor-field', 'focus-beam', 'proximity-grid'] as const) {
		const root = await openComponent(page, id, 'event-probe');
		const surface = root.locator(`.bc-${id}`);
		await surface.dispatchEvent('pointermove', { clientX: 120, clientY: 120 });
		await surface.dispatchEvent('pointermove', { clientX: 160, clientY: 160 });
		await expect(surface).toHaveAttribute('data-consumer-moves', '2');
		await surface.dispatchEvent('pointerout', { pointerType: 'mouse', relatedTarget: null });
		await expect(surface).toHaveAttribute('data-consumer-leaves', '1');

		if (id === 'cursor-field') {
			await expect(surface).toHaveAttribute('data-active', 'false');
			await expect
				.poll(() =>
					surface
						.locator('i')
						.first()
						.evaluate((node) => ({
							shift: getComputedStyle(node).getPropertyValue('--point-shift-x').trim(),
							scale: getComputedStyle(node).getPropertyValue('--point-scale').trim()
						}))
				)
				.toEqual({ shift: '0px', scale: '0.82' });
		}
		if (id === 'proximity-grid') {
			await expect
				.poll(() =>
					surface
						.locator('i')
						.first()
						.evaluate((node) => getComputedStyle(node).getPropertyValue('--proximity').trim())
				)
				.toBe('0');
		}
		if (id === 'focus-beam') {
			await expect(surface).toHaveAttribute('data-engaged', 'false');
			const firstLink = surface.getByRole('link').first();
			await firstLink.focus();
			await expect(surface).toHaveAttribute('data-consumer-focuses', '1');
			await firstLink.blur();
			await expect(surface).toHaveAttribute('data-consumer-blurs', '1');
		}
	}
});
