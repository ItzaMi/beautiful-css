<script lang="ts">
	import { onMount } from 'svelte';

	export let count = 46;
	export let color = '#8fa1ff';
	export let strength = 1;

	let host: HTMLDivElement;
	let pointerX = 50;
	let pointerY = 50;
	let active = false;
	let points: Array<{ x: number; y: number; size: number; delay: number }> = [];

	function createPoints(total: number) {
		return Array.from({ length: total }, (_, index) => {
			const column = index % 9;
			const row = Math.floor(index / 9);
			return {
				x: 8 + column * 10.5 + ((row * 7 + column * 3) % 5),
				y: 9 + row * 17 + ((column * 5 + row * 2) % 8),
				size: 2 + ((index * 7) % 5),
				delay: (index * 37) % 900
			};
		});
	}

	$: points = createPoints(count);

	function updatePointer(event: PointerEvent) {
		const bounds = host.getBoundingClientRect();
		pointerX = ((event.clientX - bounds.left) / bounds.width) * 100;
		pointerY = ((event.clientY - bounds.top) / bounds.height) * 100;
		active = true;
	}

	onMount(() => {
		pointerX = 64;
		pointerY = 40;
	});
</script>

<div
	class="cursor-field"
	class:active
	bind:this={host}
	style={`--field-color: ${color}; --field-strength: ${strength}; --pointer-x: ${pointerX}%; --pointer-y: ${pointerY}%`}
	on:pointermove={updatePointer}
	on:pointerleave={() => (active = false)}
	aria-hidden="true"
>
	<div class="halo" />
	{#each points as point}
		<i
			style={`--x: ${point.x}%; --y: ${point.y}%; --size: ${point.size}px; --delay: ${point.delay}ms`}
		/>
	{/each}
</div>

<style>
	.cursor-field {
		position: absolute;
		inset: 0;
		overflow: hidden;
		background: var(--field-background, #0b0c0b);
	}

	.halo {
		position: absolute;
		top: var(--pointer-y);
		left: var(--pointer-x);
		width: 34rem;
		height: 34rem;
		background: radial-gradient(
			circle,
			color-mix(in srgb, var(--field-color) 18%, transparent),
			transparent 67%
		);
		border-radius: 50%;
		opacity: 0.55;
		transform: translate(-50%, -50%);
		transition: top 80ms linear, left 80ms linear, opacity 300ms ease;
	}

	.cursor-field:not(.active) .halo {
		opacity: 0.25;
	}

	i {
		position: absolute;
		top: var(--y);
		left: var(--x);
		width: var(--size);
		height: var(--size);
		background: var(--field-color);
		border-radius: 50%;
		opacity: calc(0.18 * var(--field-strength));
		box-shadow: 0 0 calc(var(--size) * 3) color-mix(in srgb, var(--field-color) 55%, transparent);
		animation: breathe 3.6s ease-in-out infinite alternate;
		animation-delay: var(--delay);
		transform: translate(-50%, -50%);
		transition: opacity 240ms ease, box-shadow 240ms ease;
	}

	.active i {
		opacity: calc(0.42 * var(--field-strength));
	}

	@keyframes breathe {
		to {
			opacity: calc(0.7 * var(--field-strength));
			transform: translate(-50%, -50%) scale(1.55);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		i {
			animation: none;
		}

		.halo {
			transition: none;
		}
	}
</style>
