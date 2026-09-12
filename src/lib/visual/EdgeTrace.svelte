<script lang="ts">
	export let color = '#405cff';
	export let width = 1;
	export let radius = 2;
	export let duration = 4.5;
	export let active = true;
</script>

<div
	class="edge-trace"
	class:active
	style={`--trace-color: ${color}; --trace-width: ${width}px; --trace-radius: ${radius}px; --trace-duration: ${duration}s`}
>
	<div class="trace" aria-hidden="true" />
	<div class="trace-content"><slot /></div>
</div>

<style>
	@property --trace-angle {
		syntax: '<angle>';
		inherits: false;
		initial-value: 0deg;
	}

	.edge-trace {
		position: relative;
		padding: var(--trace-width);
		overflow: hidden;
		border-radius: var(--trace-radius);
		isolation: isolate;
	}

	.trace {
		position: absolute;
		z-index: -2;
		inset: -120%;
		background: conic-gradient(
			from var(--trace-angle),
			transparent 0 42%,
			var(--trace-color) 48% 52%,
			transparent 58% 100%
		);
		animation: trace var(--trace-duration) linear infinite paused;
	}

	.active .trace,
	.edge-trace:hover .trace,
	.edge-trace:focus-within .trace {
		animation-play-state: running;
	}

	.trace-content {
		height: 100%;
		background: var(--trace-background, #111310);
		border-radius: max(0px, calc(var(--trace-radius) - var(--trace-width)));
	}

	@keyframes trace {
		to {
			--trace-angle: 360deg;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.trace {
			animation: none;
			background: var(--trace-color);
			opacity: 0.8;
		}
	}
</style>
