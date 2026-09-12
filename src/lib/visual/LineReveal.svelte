<script lang="ts">
	export let lines: string[] = ['Made to move.', 'Built to belong.'];
	export let delay = 90;
	export let duration = 720;
	export let replayKey = 0;
</script>

<span
	class="line-reveal"
	style={`--line-delay: ${delay}ms; --line-duration: ${duration}ms`}
	aria-label={lines.join(' ')}
>
	{#key replayKey}
		{#each lines as line, index}
			<span class="line" aria-hidden="true">
				<span style={`--line-index: ${index}`}>{line}</span>
			</span>
		{/each}
	{/key}
</span>

<style>
	.line-reveal {
		display: inline-grid;
		line-height: 0.94;
		letter-spacing: -0.065em;
	}

	.line {
		display: block;
		overflow: hidden;
		padding: 0.06em 0.04em 0.1em;
		margin: -0.06em -0.04em -0.1em;
	}

	.line > span {
		display: block;
		white-space: nowrap;
		animation: reveal var(--line-duration) cubic-bezier(0.22, 1, 0.36, 1) both;
		animation-delay: calc(var(--line-index) * var(--line-delay));
		transform-origin: left bottom;
	}

	@keyframes reveal {
		from {
			opacity: 0;
			transform: translateY(105%) rotate(1.5deg);
		}
		to {
			opacity: 1;
			transform: translateY(0) rotate(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.line > span {
			animation: none;
		}
	}
</style>
