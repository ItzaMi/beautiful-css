<script lang="ts">
	import ComponentWorkbench from '$lib/showcase/ComponentWorkbench.svelte';
	import CursorField from '$lib/visual/CursorField.svelte';
</script>

<section class="hero" id="top">
	<CursorField count={54} color="#8fa1ff" strength={1.1} />
	<div class="hero-content">
		<p>Beautiful CSS</p>
		<h1>Components with something to say.</h1>
		<div class="hero-bottom">
			<p>
				Original visual effects for the part of an interface people remember. Copy the source,
				change it, and keep your existing primitives.
			</p>
			<a href="#collection">Explore the collection</a>
		</div>
	</div>
</section>

<ComponentWorkbench />

<section class="boundary" id="principles">
	<h2>Bring the primitives you trust.</h2>
	<p>
		Keep Radix, shadcn/ui, Bits UI, or native HTML underneath. Beautiful CSS is the visual and
		motion layer that makes those foundations feel specific to your product.
	</p>
	<div>
		<span>Behaviour underneath</span>
		<strong>Your existing primitives</strong>
	</div>
	<div>
		<span>Expression above</span>
		<strong>Beautiful CSS</strong>
	</div>
</section>
