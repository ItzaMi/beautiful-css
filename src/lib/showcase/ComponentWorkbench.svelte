<script lang="ts">
	import { onDestroy } from 'svelte';
	import CharacterShift from '$lib/visual/CharacterShift.svelte';
	import CursorField from '$lib/visual/CursorField.svelte';
	import EdgeTrace from '$lib/visual/EdgeTrace.svelte';
	import FocusBeam from '$lib/visual/FocusBeam.svelte';
	import LineReveal from '$lib/visual/LineReveal.svelte';
	import MediaShutter from '$lib/visual/MediaShutter.svelte';
	import ProximityGrid from '$lib/visual/ProximityGrid.svelte';
	import SignalMarquee from '$lib/visual/SignalMarquee.svelte';
	import { visualComponents } from '$lib/visual/catalog';

	let activeId = visualComponents[0].id;
	let replayKey = 0;
	let characterMode = 0;
	let marqueeReverse = false;
	let fieldStrength = 1;
	let beamRadius = 300;
	let gridReach = 170;
	let shutterDirection: 'vertical' | 'horizontal' = 'vertical';
	let traceActive = false;
	let copied = false;
	let copyTimer: ReturnType<typeof setTimeout>;

	const characterAlternates = ['Open the journal', 'View the journal'];

	$: activeComponent =
		visualComponents.find((component) => component.id === activeId) ?? visualComponents[0];

	$: stageTheme =
		activeId === 'line-reveal' || activeId === 'proximity-grid' || activeId === 'media-shutter'
			? 'paper'
			: activeId === 'signal-marquee'
			? 'signal'
			: 'ink';

	function selectComponent(id: string) {
		activeId = id;
		copied = false;
	}

	async function copyUsage() {
		await navigator.clipboard.writeText(activeComponent.usage);
		copied = true;
		clearTimeout(copyTimer);
		copyTimer = setTimeout(() => (copied = false), 1400);
	}

	onDestroy(() => clearTimeout(copyTimer));
</script>

<section class="collection" id="collection">
	<header class="collection-intro">
		<div>
			<h2>Choose one. Try it properly.</h2>
			<p>
				Every stage runs the actual component. Change its behaviour, use the keyboard, and inspect
				the source before it belongs in your project.
			</p>
		</div>
		<span>Eight components · Svelte source · Reduced motion</span>
	</header>

	<div class="explorer">
		<aside class="component-picker">
			<p>First collection</p>
			<nav aria-label="Choose a component">
				{#each visualComponents as component}
					<button
						type="button"
						class:active={component.id === activeId}
						aria-pressed={component.id === activeId}
						on:click={() => selectComponent(component.id)}
					>
						<span>
							<strong>{component.name}</strong>
							<small>{component.category}</small>
						</span>
						<em>{component.access}</em>
					</button>
				{/each}
			</nav>
		</aside>

		<article class="workbench" id={activeComponent.id} aria-labelledby="active-component-name">
			<header class="workbench-header">
				<div>
					<p>{activeComponent.category} component</p>
					<h3 id="active-component-name">{activeComponent.name}</h3>
				</div>

				<div class="controls" aria-label={`${activeComponent.name} controls`}>
					{#if activeId === 'line-reveal'}
						<button type="button" on:click={() => (replayKey += 1)}>Replay</button>
					{:else if activeId === 'character-shift'}
						<button type="button" on:click={() => (characterMode = (characterMode + 1) % 2)}>
							Change phrase
						</button>
					{:else if activeId === 'signal-marquee'}
						<button type="button" on:click={() => (marqueeReverse = !marqueeReverse)}>
							{marqueeReverse ? 'Move left' : 'Move right'}
						</button>
					{:else if activeId === 'cursor-field'}
						<button type="button" on:click={() => (fieldStrength = fieldStrength === 1 ? 1.65 : 1)}>
							{fieldStrength === 1 ? 'Increase signal' : 'Reduce signal'}
						</button>
					{:else if activeId === 'focus-beam'}
						<button type="button" on:click={() => (beamRadius = beamRadius === 300 ? 460 : 300)}>
							{beamRadius === 300 ? 'Widen beam' : 'Tighten beam'}
						</button>
					{:else if activeId === 'proximity-grid'}
						<button type="button" on:click={() => (gridReach = gridReach === 170 ? 270 : 170)}>
							{gridReach === 170 ? 'Widen reach' : 'Tighten reach'}
						</button>
					{:else if activeId === 'media-shutter'}
						<button
							type="button"
							on:click={() =>
								(shutterDirection = shutterDirection === 'vertical' ? 'horizontal' : 'vertical')}
						>
							Reveal {shutterDirection === 'vertical' ? 'across' : 'down'}
						</button>
					{:else if activeId === 'edge-trace'}
						<button type="button" on:click={() => (traceActive = !traceActive)}>
							{traceActive ? 'Follow interaction' : 'Keep tracing'}
						</button>
					{/if}
				</div>
			</header>

			<div class="stage {stageTheme}">
				{#key activeId}
					{#if activeId === 'line-reveal'}
						<div class="line-reveal-demo">
							<LineReveal
								lines={['Built slowly.', 'Remembered quickly.']}
								delay={110}
								duration={760}
								{replayKey}
							/>
						</div>
					{:else if activeId === 'character-shift'}
						<div class="character-demo">
							<CharacterShift
								text="Read the journal"
								alternate={characterAlternates[characterMode]}
								href="#character-shift"
								duration={440}
							/>
							<p>Hover or focus the line</p>
						</div>
					{:else if activeId === 'signal-marquee'}
						<div class="marquee-demo">
							<SignalMarquee
								items={['Independent', 'Responsive', 'Editable', 'Yours']}
								duration={20}
								reverse={marqueeReverse}
							/>
						</div>
					{:else if activeId === 'cursor-field'}
						<div class="field-demo">
							<CursorField count={54} color="#8fa1ff" strength={fieldStrength} />
							<div>
								<strong>Move through the field.</strong>
								<span>The content remains yours.</span>
							</div>
						</div>
					{:else if activeId === 'focus-beam'}
						<div class="beam-demo">
							<FocusBeam color="#405cff" radius={beamRadius} intensity={0.24}>
								<nav aria-label="Example project index">
									<a href="#focus-beam"><span>Elm House</span><em>Residential, 2026</em></a>
									<a href="#focus-beam"><span>Parallel</span><em>Workspace, 2025</em></a>
									<a href="#focus-beam"><span>Northbank</span><em>Hospitality, 2025</em></a>
								</nav>
							</FocusBeam>
						</div>
					{:else if activeId === 'proximity-grid'}
						<div class="grid-demo">
							<ProximityGrid columns={11} rows={7} color="#405cff" reach={gridReach} />
							<p>Proximity<br />without pursuit.</p>
						</div>
					{:else if activeId === 'media-shutter'}
						<div class="media-demo">
							<MediaShutter
								src="/media-poster.svg"
								alt="Geometric study in blue, black, and white"
								href="#media-shutter"
								panes={7}
								direction={shutterDirection}
								label="Study in form / 01"
							/>
						</div>
					{:else if activeId === 'edge-trace'}
						<div class="trace-demo">
							<EdgeTrace color="#8fa1ff" width={1} radius={2} duration={5} active={traceActive}>
								<div class="trace-card">
									<span>Available for selected work</span>
									<strong>Let the edge carry the signal.</strong>
									<a href="#edge-trace">Start a conversation</a>
								</div>
							</EdgeTrace>
						</div>
					{/if}
				{/key}
			</div>

			<footer class="workbench-footer">
				<div class="description">
					<p>{activeComponent.description}</p>
					<span>{activeComponent.principle}</span>
				</div>

				<details>
					<summary>View usage</summary>
					<div class="code">
						<pre><code>{activeComponent.usage}</code></pre>
						<button type="button" on:click={copyUsage}>{copied ? 'Copied' : 'Copy example'}</button>
					</div>
				</details>
			</footer>
		</article>
	</div>
</section>

<style>
	.collection {
		width: min(1280px, calc(100% - 48px));
		padding: clamp(7rem, 12vw, 11rem) 0 clamp(8rem, 13vw, 12rem);
		margin: 0 auto;
		scroll-margin-top: 70px;
	}

	.collection-intro {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 3rem;
		padding-bottom: clamp(3rem, 6vw, 5rem);
	}

	.collection-intro h2,
	.collection-intro p {
		margin: 0;
	}

	.collection-intro h2 {
		font-size: clamp(2.2rem, 4.6vw, 4.7rem);
		font-weight: 560;
		letter-spacing: -0.055em;
	}

	.collection-intro p {
		max-width: 630px;
		margin-top: 1rem;
		color: #6f736c;
		font-size: 0.82rem;
		line-height: 1.65;
	}

	.collection-intro > span {
		padding-bottom: 0.35rem;
		color: #848880;
		font-size: 0.62rem;
		white-space: nowrap;
	}

	.explorer {
		display: grid;
		grid-template-columns: 210px minmax(0, 1fr);
		gap: clamp(2rem, 5vw, 5rem);
		align-items: start;
	}

	.component-picker {
		position: sticky;
		top: 24px;
		border-top: 1px solid #d9dbd5;
	}

	.component-picker > p {
		margin: 0;
		padding: 1rem 0 1.2rem;
		font-size: 0.66rem;
		font-weight: 600;
	}

	.component-picker nav {
		display: grid;
	}

	.component-picker button {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		width: 100%;
		padding: 0.72rem 0;
		color: #777b74;
		background: transparent;
		border: 0;
		border-top: 1px solid transparent;
		text-align: left;
	}

	.component-picker button:last-child {
		border-bottom: 1px solid #d9dbd5;
	}

	.component-picker button.active {
		color: #111310;
		border-top-color: #111310;
	}

	.component-picker button span {
		display: grid;
		gap: 0.2rem;
	}

	.component-picker strong {
		font-size: 0.67rem;
		font-weight: 560;
	}

	.component-picker small,
	.component-picker em {
		color: #8a8e86;
		font-size: 0.56rem;
		font-style: normal;
	}

	.component-picker button:hover strong {
		color: #111310;
	}

	.workbench {
		min-width: 0;
	}

	.workbench-header {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 2rem;
		min-height: 72px;
		border-top: 1px solid #111310;
	}

	.workbench-header > div:first-child {
		display: grid;
		gap: 0.2rem;
		padding: 1rem 0;
	}

	.workbench-header p,
	.workbench-header h3 {
		margin: 0;
	}

	.workbench-header p {
		color: #858981;
		font-size: 0.58rem;
	}

	.workbench-header h3 {
		font-size: 1rem;
		font-weight: 600;
		letter-spacing: -0.03em;
	}

	.controls {
		padding: 1rem 0;
	}

	.controls button {
		padding: 0.48rem 0.62rem;
		color: #4f534d;
		background: transparent;
		border: 1px solid #c8cbc4;
		border-radius: 2px;
		font-size: 0.59rem;
	}

	.controls button:hover {
		color: #111310;
		border-color: #858981;
	}

	.stage {
		position: relative;
		display: grid;
		overflow: hidden;
		min-height: clamp(500px, 59vw, 700px);
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

	.line-reveal-demo {
		padding: 2rem;
		font-size: clamp(3.4rem, 6.5vw, 6.7rem);
		font-weight: 550;
	}

	.character-demo {
		display: grid;
		gap: 2rem;
		padding: 2rem;
		font-size: clamp(2.6rem, 7.5vw, 7.5rem);
		font-weight: 540;
		letter-spacing: -0.065em;
		text-align: center;
	}

	.character-demo :global(.character-shift) {
		--character-accent: #8fa1ff;
	}

	.character-demo p {
		margin: 0;
		color: #777c73;
		font-size: 0.62rem;
		font-weight: 400;
		letter-spacing: 0;
	}

	.marquee-demo {
		width: 100%;
		font-size: clamp(3.5rem, 9vw, 9rem);
		font-weight: 570;
		letter-spacing: -0.07em;
	}

	.field-demo {
		position: absolute;
		inset: 0;
	}

	.field-demo > div:last-child {
		position: relative;
		z-index: 1;
		display: grid;
		box-sizing: border-box;
		height: 100%;
		padding: clamp(2rem, 5vw, 5rem);
		pointer-events: none;
		place-content: center;
		text-align: center;
	}

	.field-demo strong,
	.field-demo span {
		display: block;
	}

	.field-demo strong {
		font-size: clamp(2.4rem, 6vw, 6rem);
		font-weight: 540;
		letter-spacing: -0.06em;
	}

	.field-demo span {
		margin-top: 0.8rem;
		color: #959a91;
		font-size: 0.68rem;
	}

	.beam-demo {
		width: min(780px, calc(100% - 48px));
	}

	.beam-demo :global(.focus-beam) {
		padding: 3rem;
		border: 1px solid #2b2f2a;
	}

	.beam-demo nav {
		display: grid;
	}

	.beam-demo nav a {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		padding: 1.4rem 0;
		border-bottom: 1px solid #353934;
		text-decoration: none;
	}

	.beam-demo nav a:first-child {
		border-top: 1px solid #353934;
	}

	.beam-demo nav span {
		font-size: clamp(1.4rem, 3vw, 2.6rem);
		letter-spacing: -0.045em;
	}

	.beam-demo nav em {
		color: #81867d;
		font-size: 0.6rem;
		font-style: normal;
	}

	.grid-demo {
		position: absolute;
		inset: clamp(1.5rem, 5vw, 4rem);
	}

	.grid-demo p {
		position: absolute;
		top: 50%;
		left: 50%;
		padding: 1rem;
		margin: 0;
		color: #111310;
		background: #edeee9;
		font-size: clamp(2rem, 5.5vw, 5rem);
		font-weight: 550;
		line-height: 0.94;
		letter-spacing: -0.06em;
		pointer-events: none;
		transform: translate(-50%, -50%);
	}

	.media-demo {
		width: min(760px, calc(100% - 48px));
		height: min(500px, 56vw);
		min-height: 330px;
	}

	.trace-demo {
		width: min(650px, calc(100% - 48px));
	}

	.trace-card {
		display: grid;
		min-height: 290px;
		box-sizing: border-box;
		padding: clamp(1.5rem, 4vw, 3rem);
	}

	.trace-card > span {
		color: #969b92;
		font-size: 0.62rem;
	}

	.trace-card strong {
		align-self: center;
		max-width: 450px;
		font-size: clamp(2rem, 5vw, 4.6rem);
		font-weight: 530;
		line-height: 0.98;
		letter-spacing: -0.06em;
	}

	.trace-card a {
		align-self: end;
		justify-self: start;
		padding-bottom: 0.2rem;
		border-bottom: 1px solid #747970;
		font-size: 0.62rem;
		text-decoration: none;
	}

	.workbench-footer {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(280px, 0.72fr);
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
		border-radius: 2px;
		font-size: 0.55rem;
	}

	@media (max-width: 850px) {
		.explorer {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.component-picker {
			position: static;
			overflow-x: auto;
		}

		.component-picker > p {
			display: none;
		}

		.component-picker nav {
			display: flex;
			width: max-content;
			min-width: 100%;
		}

		.component-picker button {
			min-width: 150px;
			padding-right: 1rem;
			border-top-color: #d9dbd5;
		}

		.component-picker button:last-child {
			border-bottom: 0;
		}

		.component-picker button.active {
			border-top-color: #111310;
		}
	}

	@media (max-width: 700px) {
		.collection {
			width: calc(100% - 28px);
		}

		.collection-intro {
			align-items: flex-start;
			flex-direction: column;
			gap: 1.25rem;
		}

		.collection-intro > span {
			white-space: normal;
		}

		.workbench-header {
			align-items: center;
		}

		.stage {
			min-height: 440px;
		}

		.line-reveal-demo,
		.character-demo {
			padding: 1rem;
		}

		.line-reveal-demo {
			font-size: clamp(1.65rem, 7.7vw, 2.2rem);
		}

		.beam-demo :global(.focus-beam) {
			padding: 1.25rem;
		}

		.beam-demo nav a {
			align-items: flex-start;
			flex-direction: column;
			gap: 0.4rem;
		}

		.media-demo {
			height: 360px;
		}

		.workbench-footer {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
	}
</style>
