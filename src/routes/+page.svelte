<script lang="ts">
	import { tick } from 'svelte';
	import AdaptationStudio from '$lib/prototype/AdaptationStudio.svelte';
	import BlockLibrary from '$lib/prototype/BlockLibrary.svelte';
	import ComponentLibrary from '$lib/prototype/ComponentLibrary.svelte';
	import { blocks, components, type CatalogAsset } from '$lib/prototype/catalog';

	let selectedAsset = components[0];

	async function openInStudio(asset: CatalogAsset) {
		selectedAsset = asset;
		await tick();
		document.querySelector('#studio')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

<section class="page-intro">
	<div class="intro-copy">
		<h1>A library that meets your codebase.</h1>
		<p>
			Find an interaction you like. Use the source directly, compose it into a larger block, or let
			the agent adapt it to the structure and rules of your product.
		</p>
	</div>

	<div class="intro-actions">
		<a class="primary-link" href="#components">Browse components</a>
		<a href="#studio">See a complete adaptation</a>
	</div>
</section>

<section class="product-map" aria-labelledby="product-map-title">
	<header>
		<h2 id="product-map-title">One system, three layers</h2>
		<p>The library is the raw material. The agent is the integration layer.</p>
	</header>

	<div class="layer-table">
		<div>
			<span>01</span>
			<strong>Components</strong>
			<p>Small original interactions, available as editable source.</p>
			<em>Free</em>
		</div>
		<div>
			<span>02</span>
			<strong>Blocks</strong>
			<p>Components composed into complete, responsive product sections.</p>
			<em>Pro</em>
		</div>
		<div>
			<span>03</span>
			<strong>Agent</strong>
			<p>Reads your project, adapts the asset, proposes a patch, and verifies it.</p>
			<em>Pro</em>
		</div>
	</div>
</section>

<div class="page-width">
	<ComponentLibrary assets={components} on:adapt={(event) => openInStudio(event.detail)} />
	<BlockLibrary assets={blocks} on:adapt={(event) => openInStudio(event.detail)} />
	<AdaptationStudio {selectedAsset} />
</div>

<section class="closing-statement">
	<p>Not another folder of snippets.</p>
	<h2>Good source, composed well, adapted with context.</h2>
	<a href="#components">Return to the library</a>
</section>
