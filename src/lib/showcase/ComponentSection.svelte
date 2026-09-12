<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { VisualComponent } from '$lib/visual/catalog';

	export let component: VisualComponent;
	export let theme: 'paper' | 'ink' | 'signal' = 'paper';
	export let index: number;

	let copied = false;
	let timer: ReturnType<typeof setTimeout>;

	async function copyUsage() {
		await navigator.clipboard.writeText(component.usage);
		copied = true;
		clearTimeout(timer);
		timer = setTimeout(() => (copied = false), 1200);
	}

	onDestroy(() => clearTimeout(timer));
</script>

<article class="component-section" id={component.id}>
	<header>
		<div class="component-name">
			<span>{String(index).padStart(2, '0')}</span>
			<div>
				<h2>{component.name}</h2>
				<p>{component.category}</p>
			</div>
		</div>
		<div class="component-meta">
			<span>{component.access}</span>
			<slot name="controls" />
		</div>
	</header>

	<div
		class="stage"
		class:paper={theme === 'paper'}
		class:ink={theme === 'ink'}
		class:signal={theme === 'signal'}
	>
		<slot />
	</div>

	<footer>
		<div class="description">
			<p>{component.description}</p>
			<span>{component.principle}</span>
		</div>

		<details>
			<summary>Usage</summary>
			<div class="code">
				<pre><code>{component.usage}</code></pre>
				<button type="button" on:click={copyUsage}>{copied ? 'Copied' : 'Copy example'}</button>
			</div>
		</details>
	</footer>
</article>

<style>
	.component-section {
		padding: 0 0 clamp(6rem, 10vw, 9rem);
		scroll-margin-top: 92px;
	}

	.component-section > header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		min-height: 64px;
		border-top: 1px solid #d9dbd5;
	}

	.component-name,
	.component-meta {
		display: flex;
		align-items: center;
	}

	.component-name {
		gap: 1rem;
	}

	.component-name > span {
		color: #9a9d96;
		font-size: 0.66rem;
		font-variant-numeric: tabular-nums;
	}

	h2,
	.component-name p {
		margin: 0;
	}

	h2 {
		font-size: 0.82rem;
		font-weight: 600;
		letter-spacing: -0.02em;
	}

	.component-name p {
		margin-top: 0.12rem;
		color: #868a83;
		font-size: 0.58rem;
	}

	.component-meta {
		gap: 0.8rem;
	}

	.component-meta > span {
		padding: 0.3rem 0.45rem;
		color: #5f625d;
		border: 1px solid #d9dbd5;
		border-radius: 3px;
		font-size: 0.56rem;
	}

	.stage {
		position: relative;
		display: grid;
		overflow: hidden;
		min-height: clamp(420px, 62vw, 680px);
		place-items: center;
	}

	.stage.paper {
		color: #111310;
		background: #edeee9;
	}

	.stage.ink {
		color: #f7f7f5;
		background: #0b0c0b;
	}

	.stage.signal {
		color: #f7f7f5;
		background: #405cff;
	}

	.component-section > footer {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(300px, 0.78fr);
		gap: clamp(2rem, 7vw, 7rem);
		padding-top: 1rem;
		border-top: 1px solid #d9dbd5;
	}

	.description p,
	.description span {
		display: block;
		max-width: 540px;
	}

	.description p {
		margin: 0;
		font-size: 0.76rem;
		line-height: 1.55;
	}

	.description span {
		margin-top: 0.45rem;
		color: #858981;
		font-size: 0.64rem;
		line-height: 1.55;
	}

	details {
		border-bottom: 1px solid #d9dbd5;
	}

	summary {
		padding: 0 0 0.8rem;
		color: #5f625d;
		font-size: 0.65rem;
		cursor: pointer;
		list-style-position: outside;
	}

	.code {
		position: relative;
		padding: 1rem;
		margin-bottom: 1rem;
		background: #111310;
	}

	pre {
		overflow-x: auto;
		margin: 0;
		color: #dfe2da;
		font-size: 0.6rem;
		line-height: 1.65;
	}

	code {
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
	}

	.code button {
		position: absolute;
		top: 0.65rem;
		right: 0.65rem;
		padding: 0.35rem 0.45rem;
		color: #dfe2da;
		background: #282b27;
		border: 0;
		border-radius: 3px;
		font-size: 0.55rem;
	}

	@media (max-width: 700px) {
		.component-section > footer {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.stage {
			min-height: 420px;
		}
	}
</style>
