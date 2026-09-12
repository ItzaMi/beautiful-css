<script lang="ts">
	const focusItems = [
		{
			title: 'Observe',
			detail: 'Read the interface before asking it to move.',
			meta: '01'
		},
		{
			title: 'Respond',
			detail: 'Let motion explain what changed and where to look.',
			meta: '02'
		},
		{
			title: 'Settle',
			detail: 'Return attention to the content when the action is done.',
			meta: '03'
		}
	];

	const categories = ['Featured', 'Text', 'Interaction', 'Navigation'];
	const tabContent = [
		{ name: 'Overview', value: 'A calm default with a clear place to begin.' },
		{ name: 'Details', value: 'Responsive, keyboard-friendly, and easy to theme.' },
		{ name: 'Notes', value: 'Small enough to understand before you paste it.' }
	];

	let focusIndex = 0;
	let activeCategory = 'Featured';
	let activeTab = 0;
</script>

<section class="intro">
	<h1>Beautiful CSS</h1>
	<p>
		Original interface components built with modern CSS and just enough JavaScript. Copy them into
		React, Svelte, Vue, or plain HTML.
	</p>
	<div class="intro-links">
		<a class="primary-link" href="#components">Browse components</a>
		<a href="#model">See what Pro would add</a>
	</div>
</section>

<section class="library" id="components">
	<div class="library-header">
		<h2>Components</h2>
		<p>Small, independent details. The preview is the documentation.</p>
	</div>

	<div class="category-list" aria-label="Component categories">
		{#each categories as category}
			<button
				type="button"
				class:active={activeCategory === category}
				aria-pressed={activeCategory === category}
				on:click={() => (activeCategory = category)}>{category}</button
			>
		{/each}
	</div>

	<div class="component-grid">
		{#if activeCategory === 'Featured' || activeCategory === 'Interaction'}
			<article class="component-item component-item--wide">
				<div class="component-preview focus-preview">
					<div class="focus-list">
						{#each focusItems as item, index}
							<button
								type="button"
								class:active={focusIndex === index}
								on:mouseenter={() => (focusIndex = index)}
								on:focus={() => (focusIndex = index)}
								on:click={() => (focusIndex = index)}
							>
								<span class="focus-title">{item.title}</span>
								<span class="focus-detail">{item.detail}</span>
								<span class="focus-meta">{item.meta}</span>
							</button>
						{/each}
					</div>
				</div>
				<footer class="component-meta">
					<div>
						<h3>Focus List</h3>
						<p>Bring one item forward without hiding the rest.</p>
					</div>
					<span>CSS + optional JS</span>
				</footer>
			</article>
		{/if}

		{#if activeCategory === 'Featured' || activeCategory === 'Text'}
			<article class="component-item">
				<div class="component-preview loop-preview">
					<p>Interfaces should</p>
					<div class="word-window" aria-label="respond, guide, settle">
						<span>respond.</span>
						<span>guide.</span>
						<span>settle.</span>
					</div>
				</div>
				<footer class="component-meta">
					<div>
						<h3>Word Loop</h3>
						<p>A measured text cycle with no layout shift.</p>
					</div>
					<span>CSS</span>
				</footer>
			</article>
		{/if}

		{#if activeCategory === 'Featured' || activeCategory === 'Interaction'}
			<article class="component-item">
				<div class="component-preview signal-preview">
					<button type="button" class="signal-button">
						<span class="signal-labels">
							<span>Read the story</span>
							<span>Read the story</span>
						</span>
						<span class="signal-mark" aria-hidden="true" />
					</button>
				</div>
				<footer class="component-meta">
					<div>
						<h3>Signal Button</h3>
						<p>Direction and feedback inside one quiet action.</p>
					</div>
					<span>CSS</span>
				</footer>
			</article>
		{/if}

		{#if activeCategory === 'Featured' || activeCategory === 'Navigation'}
			<article class="component-item component-item--wide">
				<div class="component-preview tabs-preview">
					<div class="tabs-demo">
						<div class="tab-list" role="tablist" aria-label="Project information">
							{#each tabContent as tab, index}
								<button
									type="button"
									role="tab"
									aria-selected={activeTab === index}
									class:active={activeTab === index}
									on:click={() => (activeTab = index)}>{tab.name}</button
								>
							{/each}
						</div>
						<div class="tab-panel" role="tabpanel">
							<p>{tabContent[activeTab].value}</p>
							<span>0{activeTab + 1} / 03</span>
						</div>
					</div>
				</div>
				<footer class="component-meta">
					<div>
						<h3>Tracking Tabs</h3>
						<p>Compact navigation that makes state changes unmistakable.</p>
					</div>
					<span>CSS + JS</span>
				</footer>
			</article>
		{/if}
	</div>
</section>

<section class="product-model" id="model">
	<div class="model-intro">
		<h2>One component is the start, not the product.</h2>
		<p>
			The free library proves the quality. Pro earns its place by composing those parts into
			complete, responsive work.
		</p>
	</div>

	<div class="model-table">
		<div class="model-row model-row--header">
			<span>Layer</span>
			<span>What someone gets</span>
			<span>Access</span>
		</div>
		<div class="model-row">
			<strong>Components</strong>
			<p>Individual text, motion, navigation, feedback, and surface patterns.</p>
			<span>Free</span>
		</div>
		<div class="model-row">
			<strong>Blocks</strong>
			<p>Responsive sections composed from the same components and a shared token system.</p>
			<span>Pro</span>
		</div>
		<div class="model-row">
			<strong>Templates</strong>
			<p>Finished pages with coherent type, spacing, motion, and production states.</p>
			<span>Pro</span>
		</div>
	</div>
</section>

<section class="first-release">
	<div>
		<h2>A sensible first release</h2>
		<p>Small enough to finish, broad enough to test whether people want the next layer.</p>
	</div>
	<ul>
		<li><strong>12</strong><span>free components</span></li>
		<li><strong>4</strong><span>composed blocks</span></li>
		<li><strong>1</strong><span>complete template</span></li>
	</ul>
</section>
