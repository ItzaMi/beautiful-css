<script lang="ts">
	export let color = '#405cff';
	export let radius = 260;
	export let intensity = 0.18;

	let host: HTMLDivElement;
	let x = 50;
	let y = 50;
	let engaged = false;

	function updatePosition(event: PointerEvent) {
		const bounds = host.getBoundingClientRect();
		x = ((event.clientX - bounds.left) / bounds.width) * 100;
		y = ((event.clientY - bounds.top) / bounds.height) * 100;
		engaged = true;
	}

	function focusPosition(event: FocusEvent) {
		const target = event.target;
		if (!(target instanceof HTMLElement)) return;

		const bounds = host.getBoundingClientRect();
		const targetBounds = target.getBoundingClientRect();
		x = ((targetBounds.left + targetBounds.width / 2 - bounds.left) / bounds.width) * 100;
		y = ((targetBounds.top + targetBounds.height / 2 - bounds.top) / bounds.height) * 100;
		engaged = true;
	}
</script>

<div
	class="focus-beam"
	class:engaged
	bind:this={host}
	style={`--beam-color: ${color}; --beam-radius: ${radius}px; --beam-intensity: ${intensity}; --beam-x: ${x}%; --beam-y: ${y}%`}
	on:pointermove={updatePosition}
	on:pointerleave={() => (engaged = false)}
	on:focusin={focusPosition}
	on:focusout={() => (engaged = false)}
>
	<div class="beam" aria-hidden="true" />
	<div class="content"><slot /></div>
</div>

<style>
	.focus-beam {
		position: relative;
		overflow: hidden;
		isolation: isolate;
	}

	.beam {
		position: absolute;
		z-index: -1;
		inset: 0;
		background: radial-gradient(
			circle var(--beam-radius) at var(--beam-x) var(--beam-y),
			color-mix(in srgb, var(--beam-color) calc(var(--beam-intensity) * 100%), transparent),
			transparent 70%
		);
		opacity: 0.45;
		transition: opacity 320ms ease;
	}

	.engaged .beam,
	.focus-beam:focus-within .beam {
		opacity: 1;
	}

	.content {
		position: relative;
		z-index: 1;
	}

	@media (prefers-reduced-motion: reduce) {
		.beam {
			transition: none;
		}
	}
</style>
