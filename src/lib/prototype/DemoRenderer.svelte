<script lang="ts">
	export let assetId: string;
	export let context: 'library' | 'plain' | 'project' = 'library';
	export let accent = '#244cc8';
	export let density: 'compact' | 'comfortable' = 'comfortable';
	export let motion: 'full' | 'reduced' = 'full';

	const focusItems = [
		['Observe', 'Read the interface before asking it to move.'],
		['Respond', 'Let motion explain what changed and where to look.'],
		['Settle', 'Return attention to the content when the action is done.']
	];
	const previewItems = [
		['Elm House', 'Residential', 'A home organised around one existing tree.'],
		['Parallel', 'Workspace', 'A shared studio made for focused work.'],
		['Northbank', 'Hospitality', 'Six rooms and a garden for slow weekends.']
	];
	const tabItems = [
		['Overview', 'A calm default with a clear place to begin.'],
		['Details', 'Responsive, keyboard-friendly, and easy to theme.'],
		['Notes', 'Small enough to understand before you paste it.']
	];
	const disclosureItems = [
		['Can I use it commercially?', 'Yes. The component source becomes part of your project.'],
		['Does it add a runtime?', 'No. Keep the ordinary HTML, CSS, and JavaScript it generates.'],
		[
			'What about accessibility?',
			'Keyboard, motion, and semantic states are included in the recipe.'
		]
	];

	let focusIndex = 0;
	let previewIndex = 0;
	let tabIndex = 0;
	let metric = 24;
	let copied = false;
	let disclosureIndex = 0;

	function copyValue() {
		copied = true;
		setTimeout(() => (copied = false), 1400);
	}
</script>

<div
	class="demo"
	class:plain={context === 'plain'}
	class:project={context === 'project'}
	class:compact={density === 'compact'}
	class:reduced={motion === 'reduced'}
	style={`--demo-accent: ${accent}`}
>
	{#if assetId === 'focus-index'}
		<div class="focus-index">
			{#each focusItems as item, index}
				<button
					type="button"
					class:active={focusIndex === index}
					on:mouseenter={() => (focusIndex = index)}
					on:focus={() => (focusIndex = index)}
					on:click={() => (focusIndex = index)}
				>
					<span>{item[0]}</span>
					<small>{item[1]}</small>
					<i>0{index + 1}</i>
				</button>
			{/each}
		</div>
	{:else if assetId === 'word-loop'}
		<div class="word-loop">
			<span>Interfaces should</span>
			<div aria-label="respond, guide, settle">
				<b>respond.</b>
				<b>guide.</b>
				<b>settle.</b>
			</div>
		</div>
	{:else if assetId === 'signal-button'}
		<button class="signal-button" type="button">
			<span class="signal-labels"><span>Read the story</span><span>Read the story</span></span>
			<span class="signal-line" aria-hidden="true" />
		</button>
	{:else if assetId === 'tracking-tabs'}
		<div class="tracking-tabs">
			<div role="tablist" aria-label="Example information">
				{#each tabItems as tab, index}
					<button
						type="button"
						role="tab"
						aria-selected={tabIndex === index}
						class:active={tabIndex === index}
						on:click={() => (tabIndex = index)}>{tab[0]}</button
					>
				{/each}
			</div>
			<section role="tabpanel">
				<p>{tabItems[tabIndex][1]}</p>
				<span>0{tabIndex + 1} / 03</span>
			</section>
		</div>
	{:else if assetId === 'hover-preview'}
		<div class="hover-preview">
			<div class="preview-visual" aria-hidden="true">
				<span class={`shape shape-${previewIndex}`} />
			</div>
			<div class="preview-list">
				{#each previewItems as item, index}
					<button
						type="button"
						class:active={previewIndex === index}
						on:mouseenter={() => (previewIndex = index)}
						on:focus={() => (previewIndex = index)}
						on:click={() => (previewIndex = index)}
					>
						<span>{item[0]}</span><small>{item[1]}</small>
					</button>
				{/each}
				<p>{previewItems[previewIndex][2]}</p>
			</div>
		</div>
	{:else if assetId === 'metric-roll'}
		<div class="metric-roll">
			<div>
				<span>Open tasks</span>
				<strong aria-live="polite" class:changed={metric !== 24}>{metric}</strong>
			</div>
			<nav aria-label="Change metric">
				<button type="button" on:click={() => (metric = Math.max(0, metric - 1))}>−</button>
				<button type="button" on:click={() => (metric += 1)}>+</button>
			</nav>
		</div>
	{:else if assetId === 'copy-field'}
		<div class="copy-field">
			<div>
				<span>Project token</span>
				<code>var(--brand-accent)</code>
			</div>
			<button type="button" on:click={copyValue} aria-live="polite"
				>{copied ? 'Copied' : 'Copy'}</button
			>
		</div>
	{:else if assetId === 'disclosure-row'}
		<div class="disclosure-list">
			{#each disclosureItems as item, index}
				<section class:open={disclosureIndex === index}>
					<button
						type="button"
						aria-expanded={disclosureIndex === index}
						on:click={() => (disclosureIndex = disclosureIndex === index ? -1 : index)}
					>
						<span>{item[0]}</span><i>{disclosureIndex === index ? '−' : '+'}</i>
					</button>
					<div><p>{item[1]}</p></div>
				</section>
			{/each}
		</div>
	{/if}
</div>

<style>
	.demo {
		width: min(100%, 620px);
		color: #1a2428;
	}

	.demo button {
		font: inherit;
	}

	.focus-index {
		border-top: 1px solid #bec6ca;
	}

	.focus-index button {
		display: grid;
		grid-template-columns: minmax(7rem, 0.7fr) minmax(11rem, 1.3fr) auto;
		gap: 1.25rem;
		align-items: center;
		width: 100%;
		padding: 1rem 0;
		color: #a2aaad;
		background: transparent;
		border: 0;
		border-bottom: 1px solid #bec6ca;
		text-align: left;
		transition: color 180ms ease;
	}

	.focus-index button.active {
		color: #1a2428;
	}

	.focus-index button > span {
		font-size: clamp(1.4rem, 3vw, 2.35rem);
		font-weight: 560;
		letter-spacing: -0.05em;
	}

	.focus-index small {
		font-size: 0.7rem;
		line-height: 1.45;
		opacity: 0;
		transform: translateX(-5px);
		transition: opacity 180ms ease, transform 180ms ease;
	}

	.focus-index button.active small {
		opacity: 1;
		transform: none;
	}

	.focus-index i {
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		font-size: 0.6rem;
		font-style: normal;
	}

	.word-loop {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.3em;
		font-size: clamp(1.7rem, 4vw, 3.2rem);
		font-weight: 570;
		letter-spacing: -0.055em;
	}

	.word-loop > div {
		position: relative;
		width: 3.5em;
		height: 1.15em;
		overflow: hidden;
		color: var(--demo-accent);
	}

	.word-loop b {
		position: absolute;
		top: 0;
		left: 0;
		font-weight: inherit;
		opacity: 0;
		transform: translateY(90%);
		animation: words 6s cubic-bezier(0.65, 0, 0.35, 1) infinite;
	}

	.word-loop b:nth-child(2) {
		animation-delay: 2s;
	}

	.word-loop b:nth-child(3) {
		animation-delay: 4s;
	}

	@keyframes words {
		0% {
			opacity: 0;
			transform: translateY(90%);
		}
		8%,
		27% {
			opacity: 1;
			transform: none;
		}
		35%,
		100% {
			opacity: 0;
			transform: translateY(-90%);
		}
	}

	.signal-button {
		display: inline-flex;
		align-items: center;
		gap: 1.2rem;
		padding: 0.85rem 1rem 0.85rem 1.15rem;
		color: #ffffff;
		background: #1a2428;
		border: 0;
		border-radius: 6px;
		font-size: 0.76rem;
		font-weight: 560;
	}

	.signal-labels {
		position: relative;
		display: block;
		height: 1rem;
		overflow: hidden;
	}

	.signal-labels > span {
		display: block;
		line-height: 1rem;
		transition: transform 220ms cubic-bezier(0.76, 0, 0.24, 1);
	}

	.signal-labels > span:nth-child(2) {
		position: absolute;
		top: 100%;
		left: 0;
	}

	.signal-button:hover .signal-labels > span,
	.signal-button:focus-visible .signal-labels > span {
		transform: translateY(-100%);
	}

	.signal-line {
		position: relative;
		display: block;
		width: 1.7rem;
		height: 1px;
		background: #ffffff;
		transition: width 220ms ease;
	}

	.signal-line::after {
		position: absolute;
		top: -3px;
		right: 0;
		width: 7px;
		height: 7px;
		content: '';
		border-top: 1px solid #ffffff;
		border-right: 1px solid #ffffff;
		transform: rotate(45deg);
	}

	.signal-button:hover .signal-line,
	.signal-button:focus-visible .signal-line {
		width: 2.25rem;
	}

	.tracking-tabs > div {
		display: flex;
		gap: 1.5rem;
		border-bottom: 1px solid #bec6ca;
	}

	.tracking-tabs > div button {
		position: relative;
		padding: 0 0 0.75rem;
		color: #8e989c;
		background: transparent;
		border: 0;
		font-size: 0.72rem;
	}

	.tracking-tabs > div button::after {
		position: absolute;
		right: 0;
		bottom: -1px;
		left: 0;
		height: 2px;
		content: '';
		background: var(--demo-accent);
		transform: scaleX(0);
		transition: transform 180ms ease;
	}

	.tracking-tabs > div button.active {
		color: #1a2428;
	}

	.tracking-tabs > div button.active::after {
		transform: scaleX(1);
	}

	.tracking-tabs section {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 2rem;
		min-height: 130px;
		padding-top: 1.25rem;
	}

	.tracking-tabs p {
		max-width: 390px;
		margin: 0;
		font-size: clamp(1.2rem, 3vw, 2rem);
		line-height: 1.25;
		letter-spacing: -0.045em;
	}

	.tracking-tabs section span {
		color: #8e989c;
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		font-size: 0.6rem;
	}

	.hover-preview {
		display: grid;
		grid-template-columns: minmax(8rem, 0.8fr) minmax(10rem, 1.2fr);
		gap: clamp(1.5rem, 4vw, 3rem);
		align-items: stretch;
	}

	.preview-visual {
		position: relative;
		min-height: 190px;
		overflow: hidden;
		background: #dfe4e5;
	}

	.shape {
		position: absolute;
		inset: 16%;
		background: var(--demo-accent);
		transition: border-radius 300ms ease, transform 300ms ease, clip-path 300ms ease;
	}

	.shape-0 {
		border-radius: 50% 50% 4% 50%;
		transform: rotate(-8deg);
	}

	.shape-1 {
		clip-path: polygon(50% 0, 100% 82%, 12% 100%);
		transform: rotate(9deg);
	}

	.shape-2 {
		border-radius: 50%;
		transform: scale(0.82);
	}

	.preview-list {
		border-top: 1px solid #bec6ca;
	}

	.preview-list button {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		width: 100%;
		padding: 0.75rem 0;
		color: #9ca5a8;
		background: transparent;
		border: 0;
		border-bottom: 1px solid #bec6ca;
		text-align: left;
	}

	.preview-list button.active {
		color: #1a2428;
	}

	.preview-list button span {
		font-size: 0.85rem;
		font-weight: 560;
	}

	.preview-list button small,
	.preview-list > p {
		font-size: 0.6rem;
	}

	.preview-list > p {
		max-width: 220px;
		margin: 1rem 0 0;
		color: #758085;
		line-height: 1.5;
	}

	.metric-roll {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		width: min(100%, 380px);
		padding-bottom: 1rem;
		border-bottom: 1px solid #bec6ca;
	}

	.metric-roll > div {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	.metric-roll span {
		color: #758085;
		font-size: 0.65rem;
	}

	.metric-roll strong {
		font-size: clamp(3.5rem, 8vw, 6rem);
		font-weight: 540;
		line-height: 0.8;
		letter-spacing: -0.08em;
		transition: color 180ms ease, transform 180ms ease;
	}

	.metric-roll strong.changed {
		color: var(--demo-accent);
	}

	.metric-roll nav {
		display: flex;
	}

	.metric-roll nav button {
		width: 2rem;
		height: 2rem;
		color: #1a2428;
		background: transparent;
		border: 1px solid #bec6ca;
	}

	.metric-roll nav button + button {
		border-left: 0;
	}

	.copy-field {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		width: min(100%, 440px);
		padding: 0.75rem;
		background: #ffffff;
		border: 1px solid #bec6ca;
		border-radius: 6px;
	}

	.copy-field > div {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		min-width: 0;
	}

	.copy-field span {
		color: #758085;
		font-size: 0.58rem;
	}

	.copy-field code {
		overflow: hidden;
		font-size: 0.7rem;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.copy-field button {
		padding: 0.55rem 0.7rem;
		color: #ffffff;
		background: #1a2428;
		border: 0;
		border-radius: 4px;
		font-size: 0.62rem;
	}

	.disclosure-list {
		border-top: 1px solid #bec6ca;
	}

	.disclosure-list section {
		border-bottom: 1px solid #bec6ca;
	}

	.disclosure-list section > button {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
		width: 100%;
		padding: 0.85rem 0;
		color: #1a2428;
		background: transparent;
		border: 0;
		text-align: left;
	}

	.disclosure-list section > button span {
		font-size: 0.75rem;
	}

	.disclosure-list i {
		font-size: 0.9rem;
		font-style: normal;
		font-weight: 400;
	}

	.disclosure-list section > div {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 220ms ease;
	}

	.disclosure-list section.open > div {
		grid-template-rows: 1fr;
	}

	.disclosure-list section > div > p {
		min-height: 0;
		margin: 0;
		overflow: hidden;
		color: #758085;
		font-size: 0.68rem;
		line-height: 1.55;
	}

	.disclosure-list section.open > div > p {
		padding: 0 2rem 0.9rem 0;
	}

	.compact .focus-index button,
	.compact .preview-list button,
	.compact .disclosure-list section > button {
		padding-top: 0.6rem;
		padding-bottom: 0.6rem;
	}

	.plain .focus-index small,
	.plain .preview-list > p {
		display: none;
	}

	.plain .focus-index button {
		grid-template-columns: 1fr auto;
		color: #1a2428;
	}

	.project .focus-index,
	.project .tracking-tabs > div,
	.project .preview-list,
	.project .metric-roll,
	.project .disclosure-list {
		border-color: color-mix(in srgb, var(--demo-accent) 22%, #bec6ca);
	}

	.reduced *,
	.reduced *::before,
	.reduced *::after {
		transition-duration: 0.01ms !important;
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
	}

	.reduced .word-loop b:first-child {
		opacity: 1;
		transform: none;
	}

	@media (max-width: 560px) {
		.focus-index button {
			grid-template-columns: 1fr auto;
		}

		.focus-index small {
			display: none;
		}

		.word-loop {
			align-items: flex-start;
			flex-direction: column;
			gap: 0;
		}

		.hover-preview {
			grid-template-columns: 1fr;
		}

		.preview-visual {
			min-height: 130px;
		}
	}
</style>
