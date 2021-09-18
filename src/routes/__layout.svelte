<script>
	import { page } from '$app/stores';

	import '../tailwind.css';
	import '../app.css';

	import GitHub from '../components/icons/GitHub.svelte';
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>

<nav class="navBar">
	<a href="." class={`navLink ${$page.path === '/' ? 'font-semibold' : 'font-normal'}`}>Home</a>
	<a
		href="/box-shadows"
		class={`navLink ${$page.path === '/box-shadows' ? 'font-semibold' : 'font-normal'}`}
		>Box-Shadows</a
	>
	<a
		href="/buttons"
		class={`navLink ${$page.path === '/buttons' ? 'font-semibold' : 'font-normal'}`}>Buttons</a
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
		<GitHub />
	</a>
</footer>
