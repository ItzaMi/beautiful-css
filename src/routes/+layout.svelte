<script lang="ts">
	import '../app.css';
	import Github from '$lib/components/icons/github.svelte';
</script>

<svelte:head>
	<title>Beautiful CSS — Components that belong in your codebase</title>
	<meta
		name="description"
		content="Browse original interface components and blocks, then adapt them to your product with context-aware tooling."
	/>
	<meta name="robots" content="noindex" />
	<meta name="theme-color" content="#fcfcfc" />
</svelte:head>

<header class="site-header">
	<a class="brand" href="/">Beautiful CSS</a>
	<nav aria-label="Primary navigation">
		<a href="/#components">Components</a>
		<a href="/#blocks">Blocks</a>
		<a href="/#studio">Studio</a>
		<a href="https://github.com/ItzaMi/beautiful-css" target="_blank" rel="noreferrer">
			<span>GitHub</span>
			<Github />
		</a>
	</nav>
</header>

<main>
	<slot />
</main>

<footer class="site-footer">
	<p>Beautiful CSS</p>
	<p>Original components. Deliberate composition. Context-aware adaptation.</p>
</footer>
