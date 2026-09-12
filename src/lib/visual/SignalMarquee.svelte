<script lang="ts">
	export let items: string[] = ['Responsive', 'Accessible', 'Editable', 'Yours'];
	export let duration = 22;
	export let reverse = false;

	$: repeated = [...items, ...items];
</script>

<div
	class="signal-marquee"
	class:reverse
	style={`--marquee-duration: ${duration}s`}
	aria-label={items.join(', ')}
>
	<div class="track" aria-hidden="true">
		{#each repeated as item}
			<span>{item}<i /></span>
		{/each}
	</div>
</div>

<style>
	.signal-marquee {
		overflow: hidden;
		width: 100%;
		mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
	}

	.track {
		display: flex;
		width: max-content;
		animation: travel var(--marquee-duration) linear infinite;
	}

	.signal-marquee:hover .track {
		animation-play-state: paused;
	}

	.reverse .track {
		animation-direction: reverse;
	}

	.track span {
		display: inline-flex;
		align-items: center;
		gap: 2rem;
		padding-right: 2rem;
		white-space: nowrap;
	}

	.track i {
		width: 0.22em;
		height: 0.22em;
		background: currentColor;
		border-radius: 50%;
		opacity: 0.45;
	}

	@keyframes travel {
		to {
			transform: translateX(-50%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.track {
			animation-play-state: paused;
		}
	}
</style>
