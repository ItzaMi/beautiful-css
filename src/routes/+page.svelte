<script lang="ts">
	import ComponentSection from '$lib/showcase/ComponentSection.svelte';
	import CharacterShift from '$lib/visual/CharacterShift.svelte';
	import CursorField from '$lib/visual/CursorField.svelte';
	import EdgeTrace from '$lib/visual/EdgeTrace.svelte';
	import FocusBeam from '$lib/visual/FocusBeam.svelte';
	import LineReveal from '$lib/visual/LineReveal.svelte';
	import MediaShutter from '$lib/visual/MediaShutter.svelte';
	import ProximityGrid from '$lib/visual/ProximityGrid.svelte';
	import SignalMarquee from '$lib/visual/SignalMarquee.svelte';
	import { visualComponents, type VisualComponent } from '$lib/visual/catalog';

	let replayKey = 0;
	let characterMode = 0;
	let marqueeReverse = false;
	let fieldColor = '#8fa1ff';
	let gridReach = 170;
	let shutterPanes = 7;
	let traceActive = true;

	const characterAlternates = ['Enter the studio', 'Open the archive'];

	function findComponent(id: string): VisualComponent {
		const component = visualComponents.find((item) => item.id === id);
		if (!component) throw new Error(`Unknown component: ${id}`);
		return component;
	}
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

<section class="library-intro" id="collection">
	<div>
		<h2>The first collection</h2>
		<p>
			Text, backgrounds, pointer effects, media reveals, and surfaces. No replacement buttons,
			dialogs, tabs, or menus.
		</p>
	</div>
	<span>Eight components. Svelte source. Reduced motion.</span>
</section>

<div class="library-layout">
	<aside class="component-index" aria-label="Component index">
		<p>Components</p>
		<nav>
			{#each visualComponents as component, index}
				<a href={`#${component.id}`}>
					<span>{String(index + 1).padStart(2, '0')}</span>
					{component.name}
				</a>
			{/each}
		</nav>
		<a class="direction-link" href="#principles">Why this boundary</a>
	</aside>

	<div class="component-list">
		<ComponentSection component={findComponent('line-reveal')} index={1} theme="paper">
			<div slot="controls" class="demo-controls">
				<button type="button" on:click={() => (replayKey += 1)}>Replay</button>
			</div>
			<div class="line-reveal-demo">
				<LineReveal
					lines={['Built slowly.', 'Remembered quickly.']}
					delay={110}
					duration={760}
					{replayKey}
				/>
			</div>
		</ComponentSection>

		<ComponentSection component={findComponent('character-shift')} index={2} theme="ink">
			<div slot="controls" class="demo-controls">
				<button type="button" on:click={() => (characterMode = (characterMode + 1) % 2)}
					>Change phrase</button
				>
			</div>
			<div class="character-demo">
				<CharacterShift
					text="Read the journal"
					alternate={characterAlternates[characterMode]}
					href="#character-shift"
					duration={440}
				/>
				<p>Hover or focus the line</p>
			</div>
		</ComponentSection>

		<ComponentSection component={findComponent('signal-marquee')} index={3} theme="signal">
			<div slot="controls" class="demo-controls">
				<button type="button" on:click={() => (marqueeReverse = !marqueeReverse)}>Reverse</button>
			</div>
			<div class="marquee-demo">
				<SignalMarquee
					items={['Independent', 'Responsive', 'Editable', 'Yours']}
					duration={20}
					reverse={marqueeReverse}
				/>
			</div>
		</ComponentSection>

		<ComponentSection component={findComponent('cursor-field')} index={4} theme="ink">
			<div slot="controls" class="demo-controls swatch-controls" aria-label="Field color">
				<button
					type="button"
					class:active={fieldColor === '#8fa1ff'}
					aria-label="Periwinkle"
					on:click={() => (fieldColor = '#8fa1ff')}
					style="--control-color: #8fa1ff"
				/>
				<button
					type="button"
					class:active={fieldColor === '#e4ff85'}
					aria-label="Lime"
					on:click={() => (fieldColor = '#e4ff85')}
					style="--control-color: #e4ff85"
				/>
			</div>
			<div class="field-demo">
				<CursorField count={54} color={fieldColor} strength={1.1} />
				<div>
					<strong>Move through the field.</strong>
					<span>The content remains yours.</span>
				</div>
			</div>
		</ComponentSection>

		<ComponentSection component={findComponent('focus-beam')} index={5} theme="ink">
			<div class="beam-demo">
				<FocusBeam color="#405cff" radius={300} intensity={0.24}>
					<nav aria-label="Example project index">
						<a href="#focus-beam"><span>Elm House</span><em>Residential, 2026</em></a>
						<a href="#focus-beam"><span>Parallel</span><em>Workspace, 2025</em></a>
						<a href="#focus-beam"><span>Northbank</span><em>Hospitality, 2025</em></a>
					</nav>
				</FocusBeam>
			</div>
		</ComponentSection>

		<ComponentSection component={findComponent('proximity-grid')} index={6} theme="paper">
			<div slot="controls" class="demo-controls">
				<button type="button" on:click={() => (gridReach = gridReach === 170 ? 260 : 170)}
					>{gridReach === 170 ? 'Widen reach' : 'Tighten reach'}</button
				>
			</div>
			<div class="grid-demo">
				<ProximityGrid columns={11} rows={7} color="#405cff" reach={gridReach} />
				<p>Proximity<br />without pursuit.</p>
			</div>
		</ComponentSection>

		<ComponentSection component={findComponent('media-shutter')} index={7} theme="paper">
			<div slot="controls" class="demo-controls">
				<button type="button" on:click={() => (shutterPanes = shutterPanes === 7 ? 11 : 7)}
					>{shutterPanes} panes</button
				>
			</div>
			<div class="media-demo">
				<MediaShutter
					src="/media-poster.svg"
					alt="Geometric study in blue, black, and white"
					href="#media-shutter"
					panes={shutterPanes}
					label="Study in form / 01"
				/>
			</div>
		</ComponentSection>

		<ComponentSection component={findComponent('edge-trace')} index={8} theme="ink">
			<div slot="controls" class="demo-controls">
				<button type="button" on:click={() => (traceActive = !traceActive)}
					>{traceActive ? 'Pause' : 'Play'}</button
				>
			</div>
			<div class="trace-demo">
				<EdgeTrace color="#8fa1ff" width={1} radius={2} duration={5} active={traceActive}>
					<div class="trace-card">
						<span>Available for selected work</span>
						<strong>Let the edge carry the signal.</strong>
						<a href="#edge-trace">Start a conversation</a>
					</div>
				</EdgeTrace>
			</div>
		</ComponentSection>
	</div>
</div>

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
