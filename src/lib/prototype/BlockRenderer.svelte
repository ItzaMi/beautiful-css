<script lang="ts">
	export let assetId: string;
	export let context: 'library' | 'plain' | 'project' = 'library';
	export let accent = '#244cc8';
	export let density: 'compact' | 'comfortable' = 'comfortable';
	export let motion: 'full' | 'reduced' = 'full';

	const projects = [
		['Elm House', 'Residential', '2026'],
		['Parallel', 'Workspace', '2025'],
		['Northbank', 'Hospitality', '2025']
	];
	const commands = [
		['Open project', '⌘ O'],
		['Create branch', '⌘ B'],
		['Run checks', '⌘ K'],
		['Review changes', '⌘ R']
	];

	let projectIndex = 0;
	let query = '';
	let commandIndex = 0;
	$: visibleCommands = commands.filter((command) =>
		command[0].toLowerCase().includes(query.toLowerCase())
	);
</script>

<div
	class="block"
	class:plain={context === 'plain'}
	class:project={context === 'project'}
	class:compact={density === 'compact'}
	class:reduced={motion === 'reduced'}
	style={`--block-accent: ${accent}`}
>
	{#if assetId === 'project-index-block'}
		<section class="project-block">
			<header><strong>Atlas</strong><span>Selected work</span></header>
			<div class="project-body">
				<div class="project-media" aria-hidden="true"><i class={`media-${projectIndex}`} /></div>
				<nav aria-label="Example projects">
					{#each projects as item, index}
						<button
							type="button"
							class:active={projectIndex === index}
							on:mouseenter={() => (projectIndex = index)}
							on:focus={() => (projectIndex = index)}
							on:click={() => (projectIndex = index)}
						>
							<span>{item[0]}</span><small>{item[1]}</small><i>{item[2]}</i>
						</button>
					{/each}
				</nav>
			</div>
		</section>
	{:else if assetId === 'launch-hero-block'}
		<section class="launch-block">
			<nav>
				<strong>Plainform</strong><span>Product&nbsp;&nbsp;Pricing&nbsp;&nbsp;Journal</span>
			</nav>
			<div class="launch-copy">
				<h3>Work moves.<br />Your notes should<br /><span>keep up.</span></h3>
				<p>A fast, local notebook for projects that refuse to stay in one place.</p>
				<button type="button"><span>Download for Mac</span><i aria-hidden="true" /></button>
			</div>
			<footer>
				<strong>42k</strong><span>notes written this week</span><small>Version 2.4</small>
			</footer>
		</section>
	{:else if assetId === 'command-surface-block'}
		<section class="command-block">
			<header>
				<div><strong>Beautiful CSS</strong><span>Atlas workspace</span></div>
				<kbd>esc</kbd>
			</header>
			<label>
				<span aria-hidden="true">⌕</span>
				<input bind:value={query} placeholder="Search actions" aria-label="Search actions" />
			</label>
			<div class="command-results">
				{#each visibleCommands as command, index}
					<button
						type="button"
						class:active={commandIndex === index}
						on:mouseenter={() => (commandIndex = index)}
						on:focus={() => (commandIndex = index)}
						on:click={() => (commandIndex = index)}
					>
						<span>{command[0]}</span><kbd>{command[1]}</kbd>
					</button>
				{:else}
					<p>No matching actions</p>
				{/each}
			</div>
			<footer><span>↑↓ navigate</span><span>↵ select</span></footer>
		</section>
	{/if}
</div>

<style>
	.block {
		width: 100%;
		color: #1a2428;
	}

	.block button,
	.block input {
		font: inherit;
	}

	.project-block,
	.launch-block,
	.command-block {
		width: 100%;
		box-sizing: border-box;
		background: #ffffff;
		border: 1px solid #d3dadd;
	}

	.project-block {
		padding: clamp(1.25rem, 3vw, 2rem);
	}

	.project-block > header,
	.launch-block > nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.project-block > header {
		margin-bottom: 2rem;
	}

	.project-block > header strong,
	.launch-block nav strong,
	.command-block header strong {
		font-size: 0.7rem;
		font-weight: 650;
	}

	.project-block > header span,
	.launch-block nav span,
	.command-block header span {
		color: #849095;
		font-size: 0.58rem;
	}

	.project-body {
		display: grid;
		grid-template-columns: minmax(10rem, 0.8fr) minmax(14rem, 1.2fr);
		gap: clamp(1.5rem, 4vw, 3rem);
		align-items: stretch;
	}

	.project-media {
		position: relative;
		min-height: 220px;
		overflow: hidden;
		background: #e2e7e8;
	}

	.project-media i {
		position: absolute;
		inset: 16%;
		display: block;
		background: var(--block-accent);
		transition: border-radius 300ms ease, transform 300ms ease, clip-path 300ms ease;
	}

	.project-media .media-0 {
		border-radius: 50% 50% 4% 50%;
		transform: rotate(-7deg);
	}

	.project-media .media-1 {
		clip-path: polygon(50% 0, 100% 82%, 12% 100%);
		transform: rotate(8deg);
	}

	.project-media .media-2 {
		border-radius: 50%;
		transform: scale(0.82);
	}

	.project-body nav {
		border-top: 1px solid #c8d0d3;
	}

	.project-body nav button {
		display: grid;
		grid-template-columns: 1fr 0.7fr auto;
		gap: 1rem;
		align-items: baseline;
		width: 100%;
		padding: 0.8rem 0;
		color: #a1a9ac;
		background: transparent;
		border: 0;
		border-bottom: 1px solid #c8d0d3;
		text-align: left;
		transition: color 180ms ease;
	}

	.project-body nav button.active {
		color: #1a2428;
	}

	.project-body nav button span {
		font-size: clamp(1rem, 2.5vw, 1.65rem);
		font-weight: 560;
		letter-spacing: -0.04em;
	}

	.project-body nav small,
	.project-body nav i {
		font-size: 0.55rem;
	}

	.project-body nav i {
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		font-style: normal;
	}

	.launch-block {
		padding: clamp(1.25rem, 4vw, 2.5rem);
	}

	.launch-copy {
		padding: clamp(3rem, 8vw, 6rem) 0 clamp(2rem, 5vw, 4rem);
	}

	.launch-copy h3,
	.launch-copy p {
		margin: 0;
	}

	.launch-copy h3 {
		font-size: clamp(2.4rem, 7vw, 5.4rem);
		font-weight: 580;
		line-height: 0.92;
		letter-spacing: -0.075em;
	}

	.launch-copy h3 span {
		color: var(--block-accent);
	}

	.launch-copy p {
		max-width: 320px;
		margin-top: 1.5rem;
		color: #768186;
		font-size: 0.68rem;
		line-height: 1.55;
	}

	.launch-copy button {
		display: inline-flex;
		align-items: center;
		gap: 1rem;
		margin-top: 1.5rem;
		padding: 0.7rem 0.85rem;
		color: #ffffff;
		background: #1a2428;
		border: 0;
		border-radius: 5px;
		font-size: 0.62rem;
	}

	.launch-copy button i {
		display: block;
		width: 1.3rem;
		height: 1px;
		background: #ffffff;
		transition: width 180ms ease;
	}

	.launch-copy button:hover i {
		width: 1.8rem;
	}

	.launch-block > footer {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 0.6rem;
		align-items: baseline;
		padding-top: 1rem;
		border-top: 1px solid #d3dadd;
	}

	.launch-block > footer strong {
		font-size: 1.2rem;
		font-weight: 560;
	}

	.launch-block > footer span,
	.launch-block > footer small {
		color: #849095;
		font-size: 0.55rem;
	}

	.command-block {
		max-width: 560px;
		margin: 0 auto;
		border-radius: 8px;
		box-shadow: 0 18px 50px rgba(26, 36, 40, 0.1);
	}

	.command-block > header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.8rem 1rem;
		border-bottom: 1px solid #dfe5e7;
	}

	.command-block > header > div {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.command-block kbd {
		color: #849095;
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		font-size: 0.55rem;
	}

	.command-block > label {
		display: flex;
		align-items: center;
		gap: 0.7rem;
		padding: 0 1rem;
		border-bottom: 1px solid #dfe5e7;
	}

	.command-block > label > span {
		color: #849095;
	}

	.command-block input {
		width: 100%;
		padding: 0.95rem 0;
		background: transparent;
		border: 0;
		outline: 0;
		font-size: 0.72rem;
	}

	.command-results {
		min-height: 190px;
		padding: 0.5rem;
	}

	.command-results button {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 0.7rem;
		color: #566166;
		background: transparent;
		border: 0;
		border-radius: 4px;
		font-size: 0.68rem;
		text-align: left;
	}

	.command-results button.active {
		color: #1a2428;
		background: color-mix(in srgb, var(--block-accent) 8%, #f1f3f4);
	}

	.command-results p {
		margin: 4rem 0;
		color: #849095;
		font-size: 0.65rem;
		text-align: center;
	}

	.command-block > footer {
		display: flex;
		gap: 1rem;
		padding: 0.7rem 1rem;
		color: #849095;
		border-top: 1px solid #dfe5e7;
		font-size: 0.52rem;
	}

	.compact .project-block,
	.compact .launch-block {
		padding: 1rem;
	}

	.plain .project-media,
	.plain .launch-copy h3 span {
		filter: grayscale(1);
	}

	.plain .project-body nav button {
		color: #1a2428;
	}

	.reduced *,
	.reduced *::before,
	.reduced *::after {
		transition-duration: 0.01ms !important;
		animation-duration: 0.01ms !important;
	}

	@media (max-width: 560px) {
		.project-body {
			grid-template-columns: 1fr;
		}

		.project-media {
			min-height: 140px;
		}

		.project-body nav button {
			grid-template-columns: 1fr auto;
		}

		.project-body nav small {
			display: none;
		}
	}
</style>
