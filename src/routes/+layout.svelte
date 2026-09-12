<script lang="ts">
	import '../app.css';
	import Github from '$lib/components/icons/github.svelte';
</script>

<svelte:head>
	<title>Beautiful CSS — Opinionated polish for the interface you already have</title>
	<meta
		name="description"
		content="Original CSS treatments that turn working interfaces into intentional ones. See the decisions, inspect the diff, and copy the code."
	/>
	<meta name="robots" content="index, follow" />
	<meta name="theme-color" content="#3157ff" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Beautiful CSS" />
	<meta
		name="twitter:description"
		content="Opinionated polish for the interface you already have."
	/>
	<meta name="twitter:url" content="https://beautifulcss.dev/" />
	<meta
		name="twitter:image"
		content="https://raw.githubusercontent.com/ItzaMi/beautiful-css/main/static/cover.jpeg"
	/>
</svelte:head>

<a class="skip-link" href="#main-content">Skip to the treatment</a>

<header class="site-header">
	<a class="wordmark" href="/" aria-label="Beautiful CSS home">
		<span class="wordmark-mark" aria-hidden="true">&#123; &#125;</span>
		<span>Beautiful CSS</span>
	</a>

	<nav aria-label="Primary navigation">
		<a href="/#workbench">Treatment</a>
		<a href="/#anatomy">Why it works</a>
	</nav>

	<a
		class="header-link"
		href="https://github.com/ItzaMi/beautiful-css"
		target="_blank"
		rel="noreferrer"
	>
		<span>View source</span>
		<Github />
	</a>
</header>

<main id="main-content">
	<slot />
</main>

<footer class="site-footer">
	<p>Beautiful CSS is an experiment by <a href="https://github.com/itzami">Rui Sousa</a>.</p>
	<p>One treatment. Zero dependencies.</p>
</footer>
