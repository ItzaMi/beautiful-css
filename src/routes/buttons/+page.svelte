<script>
	import { buttons } from '$lib/content/button';
	import ButtonDiv from '$lib/components/button-div.svelte';
</script>

<main>
	<!-- https://saaslandingpage.com/nabla/ https://saaslandingpage.com/
	https://getcssscan.com/css-box-shadow-examples -->
	<div class="flex flex-col justify-center items-center">
		<div class="w-1/2 text-center">
			<h1 class="mt-32 mb-4 text-3xl font-bold">Hey there! 👋</h1>
			<p class="m-0">Here are some buttons for you to use on your next work!</p>
			<p class="m-0">Click on one of them to copy its style to your clipboard!</p>
		</div>
	</div>
	<div class="mt-16 flex flex-row flex-wrap justify-around gap-20">
		{#each buttons as button, i (i)}
			<ButtonDiv {button} index={i} />
		{/each}
	</div>
</main>
