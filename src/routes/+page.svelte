<script lang="ts">
	type PreviewMode = 'before' | 'after';

	const steps = ['Choose', 'Inspect', 'Adapt', 'Review', 'Apply'];
	const projects = [
		{
			name: 'Elm House',
			type: 'Residential',
			description: 'A quiet family home organised around an existing elm tree.',
			year: '2026'
		},
		{
			name: 'Parallel',
			type: 'Workspace',
			description: 'A shared studio with long sightlines and rooms for focused work.',
			year: '2025'
		},
		{
			name: 'Northbank',
			type: 'Hospitality',
			description: 'Six rooms, a kitchen, and a garden made for slow weekends.',
			year: '2025'
		}
	];

	let stage = 0;
	let furthestStage = 0;
	let previewMode: PreviewMode = 'after';
	let focusedProject = 0;
	let applying = false;

	function moveTo(nextStage: number) {
		stage = nextStage;
		furthestStage = Math.max(furthestStage, nextStage);

		if (nextStage === 1) previewMode = 'before';
		if (nextStage >= 2) previewMode = 'after';
	}

	async function applyPatch() {
		applying = true;
		await new Promise((resolve) => setTimeout(resolve, 900));
		applying = false;
		moveTo(4);
	}

	function restart() {
		stage = 0;
		furthestStage = 0;
		previewMode = 'after';
		focusedProject = 0;
	}
</script>

<section class="walkthrough-intro">
	<h1>From component to codebase.</h1>
	<p>
		This walkthrough shows what Beautiful CSS would do after you find a component you like. The
		project and agent activity are simulated; the decisions and resulting patch are concrete.
	</p>
</section>

<section class="walkthrough" id="walkthrough" aria-label="Component adaptation walkthrough">
	<nav class="progress" aria-label="Walkthrough progress">
		{#each steps as step, index}
			<button
				type="button"
				class:current={stage === index}
				class:complete={stage > index}
				disabled={index > furthestStage}
				on:click={() => moveTo(index)}
			>
				<span>{index + 1}</span>
				{step}
			</button>
		{/each}
	</nav>

	<div class="workspace">
		<div class="preview-pane">
			<div class="preview-toolbar">
				<div>
					<strong>{stage === 0 ? 'Beautiful CSS library' : 'Atlas Studio'}</strong>
					<span>{stage === 0 ? 'Component preview' : 'Example Svelte project'}</span>
				</div>

				{#if stage >= 2}
					<div class="preview-switch" aria-label="Preview version">
						<button
							type="button"
							class:active={previewMode === 'before'}
							aria-pressed={previewMode === 'before'}
							on:click={() => (previewMode = 'before')}>Before</button
						>
						<button
							type="button"
							class:active={previewMode === 'after'}
							aria-pressed={previewMode === 'after'}
							on:click={() => (previewMode = 'after')}>Adapted</button
						>
					</div>
				{/if}
			</div>

			<div class="preview-canvas">
				{#if stage === 0}
					<div class="library-component">
						<p>Focus Index</p>
						<div class="library-focus-list">
							<span>Observe</span>
							<span>Respond</span>
							<span>Settle</span>
						</div>
						<small>Move through a list without losing its context.</small>
					</div>
				{:else}
					<div class:adapted={previewMode === 'after'} class="atlas-projects">
						<header>
							<a href="#walkthrough" aria-label="Atlas Studio home">Atlas</a>
							<span>Selected projects</span>
						</header>

						<div class="project-list">
							{#each projects as project, index}
								<a
									href="#walkthrough"
									class:active={focusedProject === index}
									data-project-id={project.name.toLowerCase().replace(' ', '-')}
									on:mouseenter={() => (focusedProject = index)}
									on:focus={() => (focusedProject = index)}
								>
									<span class="project-name">{project.name}</span>
									<span class="project-description">{project.description}</span>
									<span class="project-type">{project.type}</span>
									<span class="project-year">{project.year}</span>
								</a>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>

		<aside class="agent-pane" aria-live="polite">
			{#if stage === 0}
				<div class="agent-content">
					<h2>Focus Index</h2>
					<p>
						You found a component with the right behaviour. Copying it would leave the integration
						work to you.
					</p>

					<dl>
						<div>
							<dt>Source</dt>
							<dd>HTML, CSS, optional JavaScript</dd>
						</div>
						<div>
							<dt>Behaviour</dt>
							<dd>Pointer and keyboard focus</dd>
						</div>
						<div>
							<dt>Dependencies</dt>
							<dd>None</dd>
						</div>
					</dl>
				</div>
				<div class="agent-action">
					<button type="button" on:click={() => moveTo(1)}>Adapt to example project</button>
				</div>
			{:else if stage === 1}
				<div class="agent-content">
					<h2>Project inspected</h2>
					<p>Beautiful CSS read the target before proposing a change.</p>

					<dl>
						<div>
							<dt>Framework</dt>
							<dd>SvelteKit 2</dd>
						</div>
						<div>
							<dt>Target</dt>
							<dd><code>src/lib/ProjectIndex.svelte</code></dd>
						</div>
						<div>
							<dt>Styling</dt>
							<dd>CSS variables + component styles</dd>
						</div>
						<div>
							<dt>Existing contract</dt>
							<dd>Links and analytics IDs</dd>
						</div>
					</dl>

					<p class="agent-note">
						No animation package is installed. The adaptation will remain dependency-free.
					</p>
				</div>
				<div class="agent-action">
					<button type="button" on:click={() => moveTo(2)}>Create adaptation</button>
				</div>
			{:else if stage === 2}
				<div class="agent-content">
					<h2>Adaptation ready</h2>
					<p>The component now belongs to Atlas instead of looking pasted into it.</p>

					<h3>Changed</h3>
					<ul>
						<li>Mapped color and spacing to Atlas variables</li>
						<li>Added focus state using the project’s existing data</li>
						<li>Made descriptions persistent on narrow screens</li>
					</ul>

					<h3>Preserved</h3>
					<ul>
						<li>Existing links and analytics attributes</li>
						<li>Original project ordering and content</li>
						<li>Reduced-motion preference</li>
					</ul>
				</div>
				<div class="agent-action split-action">
					<button class="secondary-action" type="button" on:click={() => (previewMode = 'before')}
						>Show before</button
					>
					<button type="button" on:click={() => moveTo(3)}>Review patch</button>
				</div>
			{:else if stage === 3}
				<div class="agent-content review-content">
					<h2>Review patch</h2>
					<p>Two local files change. No package or global style is added.</p>

					<div class="file-list">
						<span><code>src/lib/ProjectIndex.svelte</code><strong>+8 −2</strong></span>
						<span><code>src/lib/project-index.css</code><strong>+46 −11</strong></span>
					</div>

					<pre aria-label="Code diff"><code
							><span class="diff-context">&lt;a data-project-id=&#123;project.id&#125;</span>
<span class="diff-add">+ class:active=&#123;focusedProject === index&#125;</span>
<span class="diff-add">+ on:focus=&#123;() =&gt; focusedProject = index&#125;</span>
<span class="diff-context">&gt;</span>
<span class="diff-add">+ &lt;span class="project-description"&gt;</span>
<span class="diff-add">+   &#123;project.description&#125;</span>
<span class="diff-add">+ &lt;/span&gt;</span></code
						></pre>
				</div>
				<div class="agent-action split-action">
					<button class="secondary-action" type="button" on:click={() => moveTo(2)}>Back</button>
					<button type="button" disabled={applying} on:click={applyPatch}
						>{applying ? 'Applying…' : 'Apply patch'}</button
					>
				</div>
			{:else}
				<div class="agent-content applied-content">
					<div class="success-mark" aria-hidden="true">✓</div>
					<h2>Applied to Atlas</h2>
					<p>The selected behaviour is now a native part of the example project.</p>

					<ul class="check-list">
						<li><span>Type check</span><strong>Passed</strong></li>
						<li><span>Keyboard navigation</span><strong>Passed</strong></li>
						<li><span>Reduced motion</span><strong>Passed</strong></li>
						<li><span>New dependencies</span><strong>None</strong></li>
					</ul>
				</div>
				<div class="agent-action">
					<button class="secondary-action" type="button" on:click={restart}>Run again</button>
				</div>
			{/if}
		</aside>
	</div>
</section>

<section class="explanation" id="why-agent">
	<div>
		<h2>What happened between “I like this” and “it works here”?</h2>
		<p>
			The library supplied the interaction. The agent handled the context that a downloadable
			component cannot know.
		</p>
	</div>

	<div class="explanation-list">
		<article>
			<h3>It read the project</h3>
			<p>Framework, source structure, tokens, dependencies, and the existing component contract.</p>
		</article>
		<article>
			<h3>It translated the idea</h3>
			<p>The behaviour survived; demo-specific markup and styling did not.</p>
		</article>
		<article>
			<h3>It protected what mattered</h3>
			<p>
				Semantics, analytics, responsive behaviour, and accessibility remained part of the patch.
			</p>
		</article>
		<article>
			<h3>It left ordinary code</h3>
			<p>No Beautiful CSS runtime and no opaque abstraction. The project owns the result.</p>
		</article>
	</div>
</section>

<section class="conclusion">
	<p>
		<strong>Without the agent:</strong> download a component and adapt it manually.
		<strong>With the agent:</strong> approve a small, project-native patch.
	</p>
</section>
