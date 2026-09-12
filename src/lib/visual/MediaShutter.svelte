<script lang="ts">
	export let src = '/media-poster.svg';
	export let alt = 'Geometric study in blue, black, and white';
	export let panes = 7;
	export let direction: 'vertical' | 'horizontal' = 'vertical';
	export let label = 'Reveal image';
	export let href = '#';

	$: shutterPanes = Array.from({ length: panes }, (_, index) => index);
</script>

<a
	{href}
	class="media-shutter"
	class:horizontal={direction === 'horizontal'}
	style={`--panes: ${panes}`}
>
	<img {src} {alt} />
	<div class="shutters" aria-hidden="true">
		{#each shutterPanes as pane}
			<i style={`--pane-index: ${pane}`} />
		{/each}
	</div>
	<span class="caption">{label}</span>
</a>

<style>
	.media-shutter {
		position: relative;
		overflow: hidden;
		width: 100%;
		height: 100%;
		margin: 0;
		background: #111310;
		cursor: crosshair;
		outline: none;
		text-decoration: none;
	}

	img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: saturate(0.72) contrast(1.05);
		transform: scale(1.04);
		transition: filter 700ms ease, transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.shutters {
		position: absolute;
		inset: 0;
		display: grid;
		grid-template-columns: repeat(var(--panes, 7), 1fr);
		pointer-events: none;
	}

	.shutters i {
		background: #111310;
		transform-origin: top;
		transition: transform 760ms cubic-bezier(0.77, 0, 0.18, 1);
		transition-delay: calc(var(--pane-index) * 48ms);
	}

	.media-shutter:hover .shutters i,
	.media-shutter:focus-visible .shutters i {
		transform: scaleY(0);
	}

	.media-shutter:hover img,
	.media-shutter:focus-visible img {
		filter: saturate(1) contrast(1);
		transform: scale(1);
	}

	.caption {
		position: absolute;
		right: 1rem;
		bottom: 1rem;
		padding: 0.45rem 0.6rem;
		color: #111310;
		background: #f7f7f5;
		font-size: 0.65rem;
		transform: translateY(160%);
		transition: transform 480ms cubic-bezier(0.16, 1, 0.3, 1) 400ms;
	}

	.media-shutter:hover .caption,
	.media-shutter:focus-visible .caption {
		transform: translateY(0);
	}

	.horizontal .shutters {
		grid-template-rows: repeat(var(--panes, 7), 1fr);
		grid-template-columns: 1fr;
	}

	.horizontal .shutters i {
		transform-origin: left;
	}

	.horizontal:hover .shutters i,
	.horizontal:focus-visible .shutters i {
		transform: scaleX(0);
	}

	@media (prefers-reduced-motion: reduce) {
		img,
		.shutters i,
		.caption {
			transition-duration: 1ms;
			transition-delay: 0ms;
		}
	}
</style>
