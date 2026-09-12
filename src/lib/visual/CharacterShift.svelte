<script lang="ts">
	export let text = 'Character shift';
	export let alternate = 'Beautiful motion';
	export let duration = 420;
	export let href = '#';

	$: characters = Array.from(text);
	$: alternateCharacters = Array.from(
		alternate.padEnd(characters.length, ' ').slice(0, characters.length)
	);
</script>

<a {href} class="character-shift" style={`--shift-duration: ${duration}ms`} aria-label={alternate}>
	{#each characters as character, index}
		<span class="character" aria-hidden="true" style={`--character-index: ${index}`}>
			<span>{character === ' ' ? '\u00a0' : character}</span>
			<span>{alternateCharacters[index] === ' ' ? '\u00a0' : alternateCharacters[index]}</span>
		</span>
	{/each}
</a>

<style>
	.character-shift {
		display: inline-flex;
		padding: 0.1em 0;
		cursor: default;
		line-height: 1;
		outline: none;
		text-decoration: none;
	}

	.character {
		position: relative;
		display: inline-block;
		overflow: hidden;
	}

	.character span {
		display: block;
		transition: transform var(--shift-duration) cubic-bezier(0.16, 1, 0.3, 1);
		transition-delay: calc(var(--character-index) * 16ms);
	}

	.character span:last-child {
		position: absolute;
		top: 100%;
		left: 0;
		color: var(--character-accent, currentColor);
	}

	.character-shift:hover .character span,
	.character-shift:focus-visible .character span {
		transform: translateY(-100%);
	}

	.character-shift:focus-visible {
		box-shadow: 0 2px 0 var(--character-accent, currentColor);
	}

	@media (prefers-reduced-motion: reduce) {
		.character span {
			transition-duration: 1ms;
			transition-delay: 0ms;
		}
	}
</style>
