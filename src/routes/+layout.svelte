<script lang="ts">
	import { page } from '$app/stores';
	let path: string;

	$: path = $page.url.pathname;

	import '../app.css';

	import Github from '$lib/components/icons/github.svelte';
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Beautiful CSS" />
	<meta
		name="twitter:description"
		content="A curated list of CSS styles and components that you can easily copy and use on your projects!"
	/>
	<meta name="twitter:url" content="https://beautifulcss.dev/" />
	<meta
		name="twitter:image"
		content="https://raw.githubusercontent.com/ItzaMi/beautiful-css/main/static/cover.jpeg"
	/>
	<meta name="twitter:image:alt" content="Beautiful CSS" />
	<meta name="twitter:creator" content="@HeyItzaMi" />
	<meta name="twitter:site" content="@HeyItzaMi" />
</svelte:head>

<nav class="navBar">
	<a href="." class={`navLink ${path === '/' ? 'font-semibold' : 'font-normal'}`}>Home</a>
	<a
		href="/box-shadows"
		class={`navLink ${path === '/box-shadows' ? 'font-semibold' : 'font-normal'}`}>Box-Shadows</a
	>
	<a href="/buttons" class={`navLink ${path === '/buttons' ? 'font-semibold' : 'font-normal'}`}
		>Buttons</a
	>
</nav>
<div class="max-w-screen-xl m-auto">
	<slot />
</div>
<footer class="footer">
	<div>
		Made by <a href="https://github.com/itzami" target="_blank" class="navLink font-semibold"
			>Rui Sousa</a
		>
	</div>
	<a
		href="https://github.com/itzami"
		target="_blank"
		class="hover:opacity-70 transition-opacity duration-500 ease-in-out"
	>
		<Github />
	</a>
</footer>
