<script lang="ts">
	import '../app.css';
	import Github from '$lib/components/icons/github.svelte';
</script>

<svelte:head>
	<title>Beautiful CSS — Modern interface components for any stack</title>
	<meta
		name="description"
		content="Original interface components built with modern CSS and just enough JavaScript."
	/>
	<meta name="robots" content="noindex" />
	<meta name="theme-color" content="#fcfcfc" />
</svelte:head>

<header class="site-header">
	<a class="brand" href="/">Beautiful CSS</a>
	<nav aria-label="Primary navigation">
		<a href="#components">Components</a>
		<a href="#model">How it grows</a>
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
	<p>Original components for the interfaces you want to remember.</p>
</footer>
