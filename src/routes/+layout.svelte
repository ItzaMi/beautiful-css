<script lang="ts">
	import '../app.css';
	import Github from '$lib/components/icons/github.svelte';
</script>

<svelte:head>
	<title>Beautiful CSS — Visual components with character</title>
	<meta
		name="description"
		content="Original CSS-first text treatments, backgrounds, pointer effects, media reveals, and visual surfaces."
	/>
	<meta name="robots" content="noindex" />
	<meta name="theme-color" content="#f7f7f5" />
</svelte:head>

<header class="site-header">
	<a class="brand" href="/#top">Beautiful CSS</a>
	<nav aria-label="Primary navigation">
		<a href="/#collection">Components</a>
		<a href="/#principles">Principles</a>
		<a href="https://github.com/ItzaMi/beautiful-css" target="_blank" rel="noreferrer">
			<span>GitHub</span><Github />
		</a>
	</nav>
</header>

<main><slot /></main>

<footer class="site-footer">
	<strong>Beautiful CSS</strong>
	<p>Visual components for interfaces with something to say.</p>
	<a href="#top">Back to top</a>
</footer>
