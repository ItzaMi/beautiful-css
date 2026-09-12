<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { CatalogAsset } from './catalog';
	import BlockRenderer from './BlockRenderer.svelte';

	export let assets: CatalogAsset[];
	const dispatch = createEventDispatcher<{ adapt: CatalogAsset }>();
</script>

<section class="blocks-section" id="blocks">
	<header>
		<div>
			<h2>Pro blocks</h2>
			<p>Components composed into responsive sections with one coherent implementation.</p>
		</div>
		<span>Composition, states, and integration</span>
	</header>

	<div class="block-list">
		{#each assets as asset (asset.id)}
			<article>
				<div class="block-preview">
					<BlockRenderer assetId={asset.id} />
				</div>
				<footer>
					<div>
						<span>{asset.category}</span>
						<h3>{asset.name}</h3>
						<p>{asset.description}</p>
					</div>
					<button type="button" on:click={() => dispatch('adapt', asset)}>Adapt this block</button>
				</footer>
			</article>
		{/each}
	</div>
</section>

<style>
	.blocks-section {
		padding: clamp(6rem, 11vw, 9rem) 0;
		border-top: 1px solid #dfe5e7;
	}

	.blocks-section > header {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 2rem;
		margin-bottom: 2.5rem;
	}

	.blocks-section header h2,
	.blocks-section header p {
		margin: 0;
	}

	.blocks-section header h2 {
		font-size: 1rem;
		font-weight: 620;
	}

	.blocks-section header p {
		margin-top: 0.45rem;
		color: #7a8489;
		font-size: 0.76rem;
	}

	.blocks-section header > span {
		color: #8d969a;
		font-size: 0.68rem;
	}

	.block-list {
		display: grid;
		gap: 4rem;
	}

	.block-list article {
		border-top: 1px solid #cfd6da;
	}

	.block-preview {
		display: grid;
		min-height: 560px;
		padding: clamp(1.25rem, 6vw, 5rem);
		place-items: center;
		background: #f4f6f7;
		border-bottom: 1px solid #dfe5e7;
	}

	.block-list footer {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 2rem;
		padding-top: 1rem;
	}

	.block-list footer span,
	.block-list footer h3,
	.block-list footer p {
		margin: 0;
	}

	.block-list footer span {
		color: #8d969a;
		font-size: 0.62rem;
	}

	.block-list footer h3 {
		margin-top: 0.3rem;
		font-size: 0.82rem;
		font-weight: 620;
	}

	.block-list footer p {
		max-width: 480px;
		margin-top: 0.35rem;
		color: #7a8489;
		font-size: 0.68rem;
		line-height: 1.5;
	}

	.block-list footer button {
		padding: 0.6rem 0.75rem;
		color: #ffffff;
		background: #1a2428;
		border: 0;
		border-radius: 5px;
		font-size: 0.64rem;
		font-weight: 560;
	}

	@media (max-width: 640px) {
		.blocks-section > header,
		.block-list footer {
			align-items: flex-start;
			flex-direction: column;
		}

		.block-preview {
			min-height: 480px;
			padding: 1rem;
		}
	}
</style>
