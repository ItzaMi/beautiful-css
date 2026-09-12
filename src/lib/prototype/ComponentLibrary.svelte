<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { CatalogAsset } from './catalog';
	import DemoRenderer from './DemoRenderer.svelte';

	export let assets: CatalogAsset[];

	const dispatch = createEventDispatcher<{ adapt: CatalogAsset }>();
	const categories = ['All', 'Text', 'Interaction', 'Navigation', 'Data', 'Utility'];

	let category = 'All';
	$: visibleAssets =
		category === 'All' ? assets : assets.filter((asset) => asset.category === category);
</script>

<section class="library-section" id="components">
	<header class="section-intro">
		<div>
			<h2>Free components</h2>
			<p>Original interactions you can use directly or ask the agent to adapt.</p>
		</div>
		<span>{assets.length} working previews</span>
	</header>

	<nav class="filters" aria-label="Filter components">
		{#each categories as item}
			<button
				type="button"
				class:active={category === item}
				aria-pressed={category === item}
				on:click={() => (category = item)}>{item}</button
			>
		{/each}
	</nav>

	<div class="component-grid">
		{#each visibleAssets as asset (asset.id)}
			<article class:wide={asset.id === 'focus-index' || asset.id === 'tracking-tabs'}>
				<div class="preview">
					<DemoRenderer assetId={asset.id} />
				</div>
				<footer>
					<div>
						<h3>{asset.name}</h3>
						<p>{asset.description}</p>
					</div>
					<div class="asset-actions">
						<span>{asset.format}</span>
						<button type="button" on:click={() => dispatch('adapt', asset)}>Adapt</button>
					</div>
				</footer>
			</article>
		{/each}
	</div>
</section>

<style>
	.library-section {
		padding-bottom: clamp(7rem, 12vw, 10rem);
	}

	.section-intro {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 2rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid #dfe5e7;
	}

	.section-intro h2,
	.section-intro p {
		margin: 0;
	}

	.section-intro h2 {
		font-size: 1rem;
		font-weight: 620;
		letter-spacing: -0.025em;
	}

	.section-intro p {
		margin-top: 0.45rem;
		color: #7a8489;
		font-size: 0.76rem;
		line-height: 1.5;
	}

	.section-intro > span {
		color: #8d969a;
		font-size: 0.68rem;
	}

	.filters {
		display: flex;
		gap: 0.2rem;
		margin: 1.25rem 0 2rem;
		overflow-x: auto;
	}

	.filters button {
		flex: 0 0 auto;
		padding: 0.5rem 0.7rem;
		color: #7a8489;
		background: transparent;
		border: 0;
		border-radius: 5px;
		font-size: 0.7rem;
	}

	.filters button:hover,
	.filters button.active {
		color: #1a2428;
		background: #f0f3f4;
	}

	.component-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1.25rem;
	}

	.component-grid > article {
		min-width: 0;
		overflow: hidden;
		background: #ffffff;
		border: 1px solid #dfe5e7;
		border-radius: 9px;
	}

	.component-grid > article.wide {
		grid-column: span 2;
	}

	.preview {
		display: grid;
		min-height: 330px;
		padding: clamp(1.5rem, 4vw, 3rem);
		box-sizing: border-box;
		place-items: center;
		background: #f4f6f7;
		border-bottom: 1px solid #dfe5e7;
	}

	.component-grid footer {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1.5rem;
		padding: 1rem;
	}

	.component-grid h3,
	.component-grid p {
		margin: 0;
	}

	.component-grid h3 {
		font-size: 0.78rem;
		font-weight: 620;
	}

	.component-grid p {
		max-width: 340px;
		margin-top: 0.35rem;
		color: #838d91;
		font-size: 0.68rem;
		line-height: 1.5;
	}

	.asset-actions {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		flex: 0 0 auto;
	}

	.asset-actions span {
		color: #8d969a;
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		font-size: 0.56rem;
	}

	.asset-actions button {
		padding: 0.5rem 0.65rem;
		color: #1a2428;
		background: #ffffff;
		border: 1px solid #ccd4d7;
		border-radius: 4px;
		font-size: 0.62rem;
		font-weight: 560;
	}

	.asset-actions button:hover {
		background: #f0f3f4;
	}

	@media (max-width: 720px) {
		.component-grid {
			grid-template-columns: 1fr;
		}

		.component-grid > article.wide {
			grid-column: 1;
		}

		.section-intro {
			align-items: flex-start;
			flex-direction: column;
			gap: 0.75rem;
		}
	}

	@media (max-width: 480px) {
		.preview {
			min-height: 280px;
			padding: 1.25rem;
		}

		.component-grid footer {
			flex-direction: column;
		}
	}
</style>
