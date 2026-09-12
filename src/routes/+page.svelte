<script lang="ts">
	let treatmentOn = true;
	let copied = false;

	const cssPatch = `.pricing-card {
  color: #f8f7f1;
  background: #17213c;
  border: 1px solid #17213c;
  border-radius: 2px 64px 2px 2px;
  box-shadow: 12px 12px 0 #f04e36;
}

.pricing-card__price strong {
  font-size: clamp(4.5rem, 12vw, 7.5rem);
  line-height: .78;
  letter-spacing: -.09em;
}

.pricing-card__action {
  color: #17213c;
  background: #d7ff45;
  border-radius: 0;
  box-shadow: 5px 5px 0 #f8f7f1;
}`;

	async function copyPatch() {
		await navigator.clipboard.writeText(cssPatch);
		copied = true;

		setTimeout(() => {
			copied = false;
		}, 1600);
	}

	function showTreatment() {
		treatmentOn = true;
		document.querySelector('#workbench')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

<section class="hero">
	<div class="hero-copy">
		<p class="hero-note">A different kind of component library</p>
		<h1>Your interface works.<br />Now make it feel intentional.</h1>
		<p class="hero-intro">
			Beautiful CSS publishes original polish passes for the UI you already have. Compare the
			result, understand the decisions, then take only the CSS you need.
		</p>
		<button class="primary-action" type="button" on:click={showTreatment}
			>Try the first treatment</button
		>
	</div>

	<aside class="hero-manifesto" aria-label="Beautiful CSS principles">
		<p>Not another pile of interchangeable components.</p>
		<ul>
			<li><span>01</span> Same markup</li>
			<li><span>02</span> Stronger point of view</li>
			<li><span>03</span> Exact, portable CSS</li>
		</ul>
	</aside>
</section>

<section class="workbench-section" id="workbench">
	<header class="section-heading">
		<div>
			<p>Treatment 001</p>
			<h2>The pricing card that could belong to anyone.</h2>
		</div>
		<p class="section-summary">
			Same content. Same HTML. A clearer hierarchy and one memorable visual decision.
		</p>
	</header>

	<div class="workbench">
		<div class="workbench-toolbar">
			<div class="view-switch" role="group" aria-label="Preview version">
				<button
					type="button"
					class:active={!treatmentOn}
					aria-pressed={!treatmentOn}
					on:click={() => (treatmentOn = false)}>Before</button
				>
				<button
					type="button"
					class:active={treatmentOn}
					aria-pressed={treatmentOn}
					on:click={() => (treatmentOn = true)}>Beautiful CSS</button
				>
			</div>
			<p aria-live="polite">{treatmentOn ? 'Treatment applied' : 'Original component'}</p>
		</div>

		<div class:treated={treatmentOn} class="preview-stage">
			<article class="pricing-card">
				<div class="pricing-card__meta">
					<span>Membership</span>
					<span>For curious minds</span>
				</div>
				<h3>Field Notes</h3>
				<p class="pricing-card__description">
					One thoughtful essay every Sunday, made to be read slowly and kept.
				</p>
				<div class="pricing-card__price">
					<span>€</span>
					<strong>12</strong>
					<span>per month</span>
				</div>
				<ul>
					<li>Weekly field note</li>
					<li>Full print archive</li>
					<li>Seasonal reading list</li>
				</ul>
				<button class="pricing-card__action" type="button">Start reading</button>
				<small>Seven days free. Leave whenever.</small>
			</article>
		</div>
	</div>
</section>

<section class="anatomy" id="anatomy">
	<header>
		<p>What changed</p>
		<h2>Three decisions, not a redesign.</h2>
	</header>

	<div class="decision-list">
		<article>
			<span>01</span>
			<h3>Hierarchy before decoration</h3>
			<p>The price becomes the anchor. Everything else quiets down and supports it.</p>
		</article>
		<article>
			<span>02</span>
			<h3>One deliberate asymmetry</h3>
			<p>A single exaggerated corner gives the component a silhouette worth remembering.</p>
		</article>
		<article>
			<span>03</span>
			<h3>Contrast with a job</h3>
			<p>The lime action and red offset separate action from structure. Neither is filler.</p>
		</article>
	</div>

	<div class="code-panel">
		<div class="code-panel__header">
			<div>
				<span>CSS patch</span>
				<p>Drop it into your project, then make it yours.</p>
			</div>
			<button type="button" on:click={copyPatch}>{copied ? 'Copied' : 'Copy CSS'}</button>
		</div>
		<pre><code>{cssPatch}</code></pre>
	</div>
</section>

<section class="closing">
	<p>This is the whole idea.</p>
	<h2>Less browsing. More noticing.</h2>
	<p>
		A small library of treatments with enough reasoning to teach your eye—and enough code to ship
		the result.
	</p>
	<a
		href="https://github.com/ItzaMi/beautiful-css/issues/new?title=Treatment%20request"
		target="_blank"
		rel="noreferrer"
	>
		Request the next treatment
	</a>
</section>
