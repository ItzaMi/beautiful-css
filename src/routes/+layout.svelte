<script lang="ts">
	import '../app.css';
	import Github from '$lib/components/icons/github.svelte';
</script>

<svelte:head>
	<title>Beautiful CSS — Adapt a component to your project</title>
	<meta
		name="description"
		content="See how Beautiful CSS adapts an interface component to an existing codebase."
	/>
	<meta name="robots" content="noindex" />
	<meta name="theme-color" content="#fcfcfc" />
</svelte:head>

<header class="site-header">
	<a class="brand" href="/">Beautiful CSS</a>
	<nav aria-label="Primary navigation">
		<a href="/#walkthrough">Walkthrough</a>
		<a href="/#why-agent">Why the agent</a>
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
	<p>Find an interaction you like. Make it belong in your product.</p>
</footer>
