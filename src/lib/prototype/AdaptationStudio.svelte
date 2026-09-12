<script lang="ts">
	import type { CatalogAsset } from './catalog';
	import BlockRenderer from './BlockRenderer.svelte';
	import DemoRenderer from './DemoRenderer.svelte';

	export let selectedAsset: CatalogAsset;

	type Density = 'compact' | 'comfortable';
	type Motion = 'full' | 'reduced';
	type PreviewMode = 'source' | 'adapted';
	type PreviewContext = 'library' | 'project';

	const stages = ['Select', 'Inspect', 'Configure', 'Review', 'Apply'];
	const accentOptions = [
		{ name: 'Ink', value: '#1a2428' },
		{ name: 'Blue', value: '#244cc8' },
		{ name: 'Moss', value: '#356441' }
	];

	let selectedId = selectedAsset.id;
	let stage = 0;
	let furthestStage = 0;
	let density: Density = 'comfortable';
	let motion: Motion = 'full';
	let accent = '#244cc8';
	let previewMode: PreviewMode = 'adapted';
	let context: PreviewContext = 'project';
	let applying = false;

	$: if (selectedAsset.id !== selectedId) {
		selectedId = selectedAsset.id;
		resetStudio();
	}

	$: targetFile =
		selectedAsset.kind === 'block'
			? `src/routes/${selectedAsset.id.replace('-block', '')}/+page.svelte`
			: `src/lib/components/${toPascalCase(selectedAsset.id)}.svelte`;
	$: styleFile = targetFile.replace('.svelte', '.css');
	$: context = previewMode === 'source' ? 'library' : 'project';
	$: changeCount = selectedAsset.kind === 'block' ? '+94 −18' : '+42 −9';

	function toPascalCase(value: string) {
		return value
			.split('-')
			.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
			.join('');
	}

	function moveTo(nextStage: number) {
		stage = nextStage;
		furthestStage = Math.max(furthestStage, nextStage);
		if (nextStage === 1) previewMode = 'source';
		if (nextStage >= 2) previewMode = 'adapted';
	}

	function resetStudio() {
		stage = 0;
		furthestStage = 0;
		density = 'comfortable';
		motion = 'full';
		accent = '#244cc8';
		previewMode = 'adapted';
		applying = false;
	}

	async function applyPatch() {
		applying = true;
		await new Promise((resolve) => setTimeout(resolve, 900));
		applying = false;
		moveTo(4);
	}
</script>

<section class="studio-section" id="studio">
	<header class="studio-intro">
		<div>
			<h2>Adaptation studio</h2>
			<p>Where a library asset becomes an implementation for one specific product.</p>
		</div>
		<span>Interactive simulation · no files are changed</span>
	</header>

	<div class="studio">
		<nav class="stage-nav" aria-label="Adaptation stages">
			{#each stages as item, index}
				<button
					type="button"
					class:active={stage === index}
					class:complete={stage > index}
					disabled={index > furthestStage}
					on:click={() => moveTo(index)}
				>
					<span>{index + 1}</span>{item}
				</button>
			{/each}
		</nav>

		<div class="studio-body">
			<div class="preview-pane">
				<div class="preview-toolbar">
					<div>
						<strong>{selectedAsset.name}</strong>
						<span>{previewMode === 'source' ? 'Library source' : 'Atlas project'}</span>
					</div>

					{#if stage >= 2}
						<div class="view-switch" aria-label="Preview version">
							<button
								type="button"
								class:active={previewMode === 'source'}
								aria-pressed={previewMode === 'source'}
								on:click={() => (previewMode = 'source')}>Source</button
							>
							<button
								type="button"
								class:active={previewMode === 'adapted'}
								aria-pressed={previewMode === 'adapted'}
								on:click={() => (previewMode = 'adapted')}>Adapted</button
							>
						</div>
					{/if}
				</div>

				<div class="preview-canvas" class:source={previewMode === 'source'}>
					{#if selectedAsset.kind === 'component'}
						<DemoRenderer assetId={selectedAsset.id} {context} {accent} {density} {motion} />
					{:else}
						<BlockRenderer assetId={selectedAsset.id} {context} {accent} {density} {motion} />
					{/if}
				</div>

				<div class="activity" aria-label="Agent activity">
					<span class:done={stage >= 1}>Read project structure</span>
					<span class:done={stage >= 2}>Map tokens and behaviour</span>
					<span class:done={stage >= 3}>Prepare reversible patch</span>
					<span class:done={stage >= 4}>Run project checks</span>
				</div>
			</div>

			<aside class="agent-pane" aria-live="polite">
				{#if stage === 0}
					<div class="agent-content">
						<p class="status">Selected {selectedAsset.kind}</p>
						<h3>{selectedAsset.name}</h3>
						<p>{selectedAsset.description}</p>

						<dl>
							<div>
								<dt>Access</dt>
								<dd>{selectedAsset.access}</dd>
							</div>
							<div>
								<dt>Format</dt>
								<dd>{selectedAsset.format}</dd>
							</div>
							<div>
								<dt>Dependencies</dt>
								<dd>{selectedAsset.dependencies}</dd>
							</div>
						</dl>

						<ul class="capabilities">
							{#each selectedAsset.capabilities as capability}
								<li>{capability}</li>
							{/each}
						</ul>
					</div>
					<div class="agent-action">
						<button type="button" on:click={() => moveTo(1)}>Use Atlas example project</button>
					</div>
				{:else if stage === 1}
					<div class="agent-content">
						<p class="status">Inspection complete</p>
						<h3>The target has constraints.</h3>
						<p>The agent reads them before producing code.</p>

						<dl>
							<div>
								<dt>Framework</dt>
								<dd>SvelteKit 2</dd>
							</div>
							<div>
								<dt>Target</dt>
								<dd><code>{targetFile}</code></dd>
							</div>
							<div>
								<dt>Tokens</dt>
								<dd><code>--ink · --accent · --space-*</code></dd>
							</div>
							<div>
								<dt>Contract</dt>
								<dd>Routes, events, content props</dd>
							</div>
							<div>
								<dt>Policy</dt>
								<dd>No new runtime dependency</dd>
							</div>
						</dl>

						<p class="note">
							Found existing reduced-motion handling and project analytics. Both must survive the
							adaptation.
						</p>
					</div>
					<div class="agent-action">
						<button type="button" on:click={() => moveTo(2)}>Configure adaptation</button>
					</div>
				{:else if stage === 2}
					<div class="agent-content configure-content">
						<p class="status">Live configuration</p>
						<h3>Decide how it should belong.</h3>

						<fieldset>
							<legend>Density</legend>
							<div class="segmented">
								<button
									type="button"
									class:active={density === 'compact'}
									on:click={() => (density = 'compact')}>Compact</button
								>
								<button
									type="button"
									class:active={density === 'comfortable'}
									on:click={() => (density = 'comfortable')}>Comfortable</button
								>
							</div>
						</fieldset>

						<fieldset>
							<legend>Motion</legend>
							<div class="segmented">
								<button
									type="button"
									class:active={motion === 'full'}
									on:click={() => (motion = 'full')}>Full</button
								>
								<button
									type="button"
									class:active={motion === 'reduced'}
									on:click={() => (motion = 'reduced')}>Reduced</button
								>
							</div>
						</fieldset>

						<fieldset>
							<legend>Project accent</legend>
							<div class="swatches">
								{#each accentOptions as option}
									<button
										type="button"
										class:active={accent === option.value}
										aria-label={option.name}
										aria-pressed={accent === option.value}
										style={`--swatch: ${option.value}`}
										on:click={() => (accent = option.value)}><span />{option.name}</button
									>
								{/each}
							</div>
						</fieldset>

						<p class="note">
							The preview is using Atlas content, tokens, and preferences. Switch between Source and
							Adapted above.
						</p>
					</div>
					<div class="agent-action">
						<button type="button" on:click={() => moveTo(3)}>Review proposed patch</button>
					</div>
				{:else if stage === 3}
					<div class="agent-content review-content">
						<p class="status">Patch ready</p>
						<h3>Review before anything changes.</h3>
						<p>Two local files. No packages, routes, or global styles added.</p>

						<div class="files">
							<span><code>{targetFile}</code><strong>{changeCount}</strong></span>
							<span><code>{styleFile}</code><strong>modified</strong></span>
						</div>

						<pre aria-label="Proposed code patch"><code
								><span class="context"> const projectTokens = readTokens();</span>
<span class="add">+ const density = '{density}';</span>
<span class="add">+ const motion = '{motion}';</span>
<span class="add">+ style:--accent={'{'}projectTokens.accent{'}'}</span>
<span class="keep">  on:click={'{'}trackExistingEvent{'}'}</span></code
							></pre>

						<ul class="checklist">
							<li>Existing content API preserved</li>
							<li>Keyboard and focus behaviour preserved</li>
							<li>Patch can be reverted as one change</li>
						</ul>
					</div>
					<div class="agent-action split">
						<button class="secondary" type="button" on:click={() => moveTo(2)}>Edit choices</button>
						<button type="button" disabled={applying} on:click={applyPatch}
							>{applying ? 'Applying…' : 'Apply locally'}</button
						>
					</div>
				{:else}
					<div class="agent-content result-content">
						<p class="success">Applied and verified</p>
						<h3>{selectedAsset.name} now belongs to Atlas.</h3>
						<p>
							The component remains editable source code. The project profile is kept for the next
							adaptation.
						</p>

						<div class="verification">
							<span><strong>Type check</strong><em>Passed</em></span>
							<span><strong>Build</strong><em>Passed</em></span>
							<span><strong>Accessibility</strong><em>Passed</em></span>
						</div>

						<section class="profile">
							<header><strong>Atlas project profile</strong><span>Saved</span></header>
							<dl>
								<div>
									<dt>Framework</dt>
									<dd>SvelteKit 2</dd>
								</div>
								<div>
									<dt>Density</dt>
									<dd>{density}</dd>
								</div>
								<div>
									<dt>Motion</dt>
									<dd>{motion}</dd>
								</div>
								<div>
									<dt>Accent</dt>
									<dd><i style={`--profile-accent: ${accent}`} />{accent}</dd>
								</div>
							</dl>
						</section>
					</div>
					<div class="agent-action">
						<button type="button" on:click={resetStudio}>Run this adaptation again</button>
					</div>
				{/if}
			</aside>
		</div>
	</div>
</section>

<style>
	.studio-section {
		padding: clamp(6rem, 11vw, 9rem) 0 clamp(7rem, 12vw, 10rem);
		border-top: 1px solid #dfe5e7;
	}

	.studio-intro {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 2rem;
		margin-bottom: 2.5rem;
	}

	.studio-intro h2,
	.studio-intro p {
		margin: 0;
	}

	.studio-intro h2 {
		font-size: 1rem;
		font-weight: 620;
		letter-spacing: -0.025em;
	}

	.studio-intro p {
		margin-top: 0.45rem;
		color: #7a8489;
		font-size: 0.76rem;
		line-height: 1.5;
	}

	.studio-intro > span {
		color: #8d969a;
		font-size: 0.68rem;
	}

	.studio {
		overflow: hidden;
		background: #fff;
		border: 1px solid #cfd6da;
		border-radius: 10px;
	}

	.stage-nav {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		border-bottom: 1px solid #dfe5e7;
	}

	.stage-nav button {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.85rem 1rem;
		color: #929b9f;
		background: transparent;
		border: 0;
		border-right: 1px solid #e7ebed;
		font-size: 0.66rem;
		text-align: left;
	}

	.stage-nav button:last-child {
		border-right: 0;
	}

	.stage-nav button span {
		display: grid;
		width: 1.15rem;
		height: 1.15rem;
		border: 1px solid #cfd6da;
		border-radius: 50%;
		font-size: 0.56rem;
		place-items: center;
	}

	.stage-nav button.active {
		color: #1a2428;
		background: #f7f8f8;
	}

	.stage-nav button.complete span {
		color: #fff;
		background: #1a2428;
		border-color: #1a2428;
	}

	.stage-nav button:disabled {
		color: #b7bdc0;
	}

	.studio-body {
		display: grid;
		grid-template-columns: minmax(0, 1.6fr) minmax(330px, 0.85fr);
		min-height: 680px;
	}

	.preview-pane {
		display: grid;
		grid-template-rows: auto 1fr auto;
		min-width: 0;
		background: #f4f6f7;
		border-right: 1px solid #dfe5e7;
	}

	.preview-toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		min-height: 58px;
		padding: 0 1.15rem;
		background: #fff;
		border-bottom: 1px solid #dfe5e7;
	}

	.preview-toolbar > div:first-child {
		display: grid;
		gap: 0.15rem;
	}

	.preview-toolbar strong {
		font-size: 0.7rem;
		font-weight: 620;
	}

	.preview-toolbar span {
		color: #8b9599;
		font-size: 0.59rem;
	}

	.view-switch,
	.segmented {
		display: flex;
		padding: 2px;
		background: #edf0f1;
		border-radius: 5px;
	}

	.view-switch button,
	.segmented button {
		padding: 0.38rem 0.55rem;
		color: #7a8489;
		background: transparent;
		border: 0;
		border-radius: 3px;
		font-size: 0.6rem;
	}

	.view-switch button.active,
	.segmented button.active {
		color: #1a2428;
		background: #fff;
		box-shadow: 0 1px 2px rgb(26 36 40 / 8%);
	}

	.preview-canvas {
		display: grid;
		min-height: 540px;
		padding: clamp(1.25rem, 4vw, 3.5rem);
		place-items: center;
		transition: background 180ms ease;
	}

	.preview-canvas.source {
		background: #eef1f2;
	}

	.activity {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		background: #fff;
		border-top: 1px solid #dfe5e7;
	}

	.activity span {
		position: relative;
		padding: 0.8rem 0.7rem 0.8rem 1.5rem;
		color: #a0a8ab;
		border-right: 1px solid #e7ebed;
		font-size: 0.56rem;
	}

	.activity span::before {
		position: absolute;
		top: 50%;
		left: 0.65rem;
		width: 0.4rem;
		height: 0.4rem;
		background: #d9dfe1;
		border-radius: 50%;
		content: '';
		transform: translateY(-50%);
	}

	.activity span.done {
		color: #536065;
	}

	.activity span.done::before {
		background: #356441;
	}

	.agent-pane {
		display: grid;
		grid-template-rows: 1fr auto;
		min-width: 0;
		background: #fff;
	}

	.agent-content {
		padding: clamp(1.5rem, 3vw, 2.5rem);
	}

	.status,
	.success {
		margin: 0 0 0.65rem;
		color: #7a8489;
		font-size: 0.6rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.success {
		color: #356441;
	}

	.agent-content h3 {
		margin: 0;
		font-size: 1.35rem;
		font-weight: 580;
		line-height: 1.2;
		letter-spacing: -0.04em;
	}

	.agent-content > p:not(.status, .success, .note) {
		margin: 0.8rem 0 0;
		color: #758085;
		font-size: 0.73rem;
		line-height: 1.65;
	}

	dl {
		margin: 2rem 0 0;
	}

	dl > div {
		display: grid;
		grid-template-columns: 86px minmax(0, 1fr);
		gap: 0.7rem;
		padding: 0.65rem 0;
		border-top: 1px solid #e6eaec;
	}

	dt,
	dd {
		margin: 0;
		font-size: 0.62rem;
		line-height: 1.45;
	}

	dt {
		color: #8b9599;
	}

	dd {
		min-width: 0;
		color: #3d4a4f;
		overflow-wrap: anywhere;
	}

	code {
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		font-size: 0.58rem;
	}

	.capabilities,
	.checklist {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		padding: 0;
		margin: 1.5rem 0 0;
		list-style: none;
	}

	.capabilities li,
	.checklist li {
		padding: 0.35rem 0.45rem;
		color: #657176;
		background: #f2f4f5;
		border-radius: 3px;
		font-size: 0.56rem;
	}

	.note {
		padding: 0.8rem;
		margin: 1.5rem 0 0;
		color: #606c70;
		background: #f4f6f7;
		border-left: 2px solid #aeb7ba;
		font-size: 0.64rem;
		line-height: 1.55;
	}

	.agent-action {
		display: flex;
		justify-content: flex-end;
		gap: 0.6rem;
		padding: 1rem;
		border-top: 1px solid #dfe5e7;
	}

	.agent-action button {
		padding: 0.65rem 0.8rem;
		color: #fff;
		background: #1a2428;
		border: 1px solid #1a2428;
		border-radius: 4px;
		font-size: 0.64rem;
		font-weight: 560;
	}

	.agent-action button.secondary {
		color: #566267;
		background: #fff;
		border-color: #cfd6da;
	}

	.agent-action button:disabled {
		opacity: 0.55;
	}

	.configure-content fieldset {
		padding: 0;
		margin: 1.6rem 0 0;
		border: 0;
	}

	.configure-content legend {
		margin-bottom: 0.55rem;
		color: #6b767b;
		font-size: 0.6rem;
	}

	.swatches {
		display: flex;
		gap: 0.45rem;
	}

	.swatches button {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.42rem 0.5rem;
		color: #7a8489;
		background: #fff;
		border: 1px solid #d9dfe1;
		border-radius: 4px;
		font-size: 0.58rem;
	}

	.swatches button.active {
		color: #1a2428;
		border-color: #7f898d;
	}

	.swatches span {
		width: 0.6rem;
		height: 0.6rem;
		background: var(--swatch);
		border-radius: 50%;
	}

	.files {
		margin-top: 1.5rem;
		border-bottom: 1px solid #e3e8eb;
	}

	.files span {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.65rem 0;
		border-top: 1px solid #e3e8eb;
	}

	.files strong {
		color: #687378;
		font-size: 0.56rem;
		font-weight: 500;
	}

	pre {
		overflow-x: auto;
		padding: 0.9rem;
		margin: 1.3rem 0 0;
		color: #536065;
		background: #f4f6f7;
		font-size: 0.58rem;
		line-height: 1.75;
	}

	pre code {
		font-size: inherit;
	}

	pre span {
		display: block;
	}

	pre .add {
		color: #356441;
	}

	pre .keep {
		color: #244cc8;
	}

	.checklist {
		display: grid;
	}

	.checklist li {
		position: relative;
		padding-left: 1.25rem;
		background: transparent;
	}

	.checklist li::before {
		position: absolute;
		left: 0.25rem;
		content: '✓';
		color: #356441;
	}

	.verification {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		margin-top: 1.5rem;
		border-top: 1px solid #dfe5e7;
		border-bottom: 1px solid #dfe5e7;
	}

	.verification span {
		display: grid;
		gap: 0.25rem;
		padding: 0.8rem 0.5rem;
		border-right: 1px solid #e3e8eb;
	}

	.verification span:last-child {
		border-right: 0;
	}

	.verification strong,
	.verification em {
		font-size: 0.56rem;
		font-style: normal;
	}

	.verification strong {
		font-weight: 550;
	}

	.verification em {
		color: #356441;
	}

	.profile {
		margin-top: 1.5rem;
		background: #f4f6f7;
	}

	.profile header {
		display: flex;
		justify-content: space-between;
		padding: 0.75rem;
		border-bottom: 1px solid #dfe5e7;
	}

	.profile header strong,
	.profile header span {
		font-size: 0.58rem;
	}

	.profile header span {
		color: #356441;
	}

	.profile dl {
		padding: 0.25rem 0.75rem 0.6rem;
		margin: 0;
	}

	.profile dl > div {
		padding: 0.45rem 0;
	}

	.profile i {
		display: inline-block;
		width: 0.55rem;
		height: 0.55rem;
		margin-right: 0.35rem;
		background: var(--profile-accent);
		border-radius: 50%;
		vertical-align: -0.06rem;
	}

	@media (max-width: 900px) {
		.studio-body {
			grid-template-columns: 1fr;
		}

		.preview-pane {
			border-right: 0;
			border-bottom: 1px solid #dfe5e7;
		}

		.agent-pane {
			min-height: 500px;
		}
	}

	@media (max-width: 640px) {
		.studio-intro {
			align-items: flex-start;
			flex-direction: column;
		}

		.stage-nav {
			overflow-x: auto;
			grid-template-columns: repeat(5, minmax(105px, 1fr));
		}

		.preview-canvas {
			min-height: 420px;
			padding: 1rem;
		}

		.activity {
			grid-template-columns: repeat(2, 1fr);
		}

		.verification {
			grid-template-columns: 1fr;
		}

		.verification span {
			border-right: 0;
			border-bottom: 1px solid #e3e8eb;
		}
	}
</style>
