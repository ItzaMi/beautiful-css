<script>
	import Arrow from '../components/icons/Arrow.svelte';
	export const prerender = true;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<!-- <div class="h-screen flex flex-row justify-left items-center">
	<div class="w-2/4">
		<h3 class="text-3xl">Welcome to</h3>
		<h1 class="text-6xl font-black">Beautiful CSS</h1>
		<p class="mt-8 w-3/4">
			Here's a curated list of different components and CSS styles for you to use on your next work
		</p>
	</div>
	<div class="w-2/4 h-full  flex flex-col justify-center items-center">
		<div class="w-52 h-52 rounded-md" style="box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;" />
	</div>
</div> -->

<div class="relative h-screen flex flex-col justify-center items-center">
	<h3 class="text-3xl">Welcome to</h3>
	<h1 class="text-9xl font-black">Beautiful <span class="transform rotate-45">CSS</span></h1>
	<div class="mt-8 w-2/5 text-center">
		<p>
			A curated list of CSS styles and components that you can easily copy and use on your projects
		</p>
	</div>
	<div class="absolute bottom-5 flex flex-col justify-center items-center gap-4">
		<p class="text-xs">Start getting inspired</p>
		<Arrow />
	</div>
</div>
<div class="mt-16 flex flex-row flex-wrap justify-around gap-20">
	<a
		href="/box-shadows"
		class="flex flex-300 h-150 justify-center items-center text-regal-blue font-light border-2 border-regal-blue rounded-xl cursor-pointer transition duration-500 ease-in-out hover:bg-regal-blue hover:text-white"
	>
		Box-Shadows
	</a>
	<a
		href="/buttons"
		class="flex flex-300 h-150 justify-center items-center text-regal-blue font-light border-2 border-regal-blue rounded-xl cursor-pointer transition duration-500 ease-in-out hover:bg-regal-blue hover:text-white"
	>
		Buttons
	</a>
</div>
