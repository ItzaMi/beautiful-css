'use client';

import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import {
	componentCatalog,
	type ComponentControl,
	type ComponentId,
	type ControlValue
} from '@/data/catalog';
import type { ComponentSources } from '@/data/sources';
import { ComponentStage } from './component-stage';

type ComponentWorkbenchProps = {
	sources: ComponentSources;
};

export function ComponentWorkbench({ sources }: ComponentWorkbenchProps) {
	const [activeId, setActiveId] = useState<ComponentId>(componentCatalog[0].id);
	const [values, setValues] = useState<Record<string, ControlValue>>({
		...componentCatalog[0].defaultValues
	});
	const [replayKey, setReplayKey] = useState(0);
	const [copyStatus, setCopyStatus] = useState('');
	const activeComponent = useMemo(
		() => componentCatalog.find((component) => component.id === activeId) ?? componentCatalog[0],
		[activeId]
	);
	const activeIndex = componentCatalog.findIndex((component) => component.id === activeId);
	const installCommand = `npx shadcn@latest add ItzaMi/beautiful-css/${activeId}#concept/visual-component-library`;

	useEffect(() => {
		function selectFromLocation() {
			const candidate = window.location.hash.slice(1);
			const component = componentCatalog.find((item) => item.id === candidate);
			if (!component) return;
			setActiveId(component.id);
			setValues({ ...component.defaultValues });
			setCopyStatus('');
		}

		selectFromLocation();
		window.addEventListener('hashchange', selectFromLocation);
		window.addEventListener('popstate', selectFromLocation);
		return () => {
			window.removeEventListener('hashchange', selectFromLocation);
			window.removeEventListener('popstate', selectFromLocation);
		};
	}, []);

	function selectComponent(id: ComponentId) {
		const component = componentCatalog.find((item) => item.id === id) ?? componentCatalog[0];
		setActiveId(component.id);
		setValues({ ...component.defaultValues });
		setCopyStatus('');
		if (window.location.hash !== `#${id}`) {
			window.history.pushState({ component: id }, '', `#${id}`);
		}
	}

	function selectAdjacentComponent(direction: -1 | 1) {
		const nextIndex = Math.max(0, Math.min(componentCatalog.length - 1, activeIndex + direction));
		selectComponent(componentCatalog[nextIndex].id);
	}

	function updateControl(
		control: ComponentControl,
		event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) {
		if (control.type === 'action') return;
		const target = event.currentTarget;
		const value =
			control.type === 'toggle' && target instanceof HTMLInputElement
				? target.checked
				: control.type === 'range' && target instanceof HTMLInputElement
					? target.valueAsNumber
					: target.value;
		setValues((current) => ({ ...current, [control.key]: value }));
	}

	async function copy(label: string, content: string) {
		try {
			await navigator.clipboard.writeText(content);
			setCopyStatus(`${label} copied`);
		} catch {
			setCopyStatus(`Could not copy ${label.toLowerCase()}`);
		}
	}

	function copyComponentLink() {
		const url = new URL(window.location.href);
		url.hash = activeId;
		void copy('Component link', url.toString());
	}

	return (
		<section className="collection" id="collection">
			<header className="collection-intro">
				<div>
					<h2>Choose one. Try it properly.</h2>
					<p>
						Change the real API, use the keyboard, and inspect the exact files you would install.
					</p>
				</div>
				<span>Eight React components · Editable source · Visual tests</span>
			</header>

			<div className="explorer">
				<div className="component-mobile-picker">
					<label>
						<span>Component</span>
						<select
							aria-label="Choose a component"
							value={activeId}
							onChange={(event) => selectComponent(event.currentTarget.value as ComponentId)}
						>
							{componentCatalog.map((component) => (
								<option value={component.id} key={component.id}>
									{component.name}
								</option>
							))}
						</select>
					</label>
					<div aria-label="Move through components">
						<button
							type="button"
							onClick={() => selectAdjacentComponent(-1)}
							disabled={activeIndex === 0}
						>
							Previous
						</button>
						<span aria-live="polite">
							{activeIndex + 1} / {componentCatalog.length}
						</span>
						<button
							type="button"
							onClick={() => selectAdjacentComponent(1)}
							disabled={activeIndex === componentCatalog.length - 1}
						>
							Next
						</button>
					</div>
				</div>

				<aside className="component-picker">
					<p>
						<span>First collection</span>
						<span>
							{activeIndex + 1} of {componentCatalog.length}
						</span>
					</p>
					<nav aria-label="Choose a component">
						{componentCatalog.map((component) => (
							<button
								type="button"
								className={component.id === activeId ? 'is-active' : ''}
								aria-pressed={component.id === activeId}
								data-component-id={component.id}
								onClick={() => selectComponent(component.id)}
								key={component.id}
							>
								<span>
									<strong>{component.name}</strong>
									<small>{component.category}</small>
								</span>
								<em>{component.access}</em>
							</button>
						))}
					</nav>
				</aside>

				<article className="workbench" aria-labelledby="active-component-name">
					<header className="workbench-header">
						<div>
							<p>{activeComponent.category} component</p>
							<h3 id="active-component-name">{activeComponent.name}</h3>
						</div>
						<div className="workbench-actions">
							<button type="button" onClick={copyComponentLink}>
								Copy link
							</button>
							<a href={`/preview/component/${activeId}`} target="_blank" rel="noreferrer">
								Open preview
							</a>
						</div>
					</header>

					<div className="workbench-controls" aria-label={`${activeComponent.name} controls`}>
						{activeComponent.controls.map((control) =>
							control.type === 'action' ? (
								<div className="control control-action" key={control.key}>
									<span>{control.label}</span>
									<button type="button" onClick={() => setReplayKey((current) => current + 1)}>
										Replay
									</button>
								</div>
							) : (
								<label className={`control control-${control.type}`} key={control.key}>
									<span>{control.label}</span>
									{control.type === 'toggle' && (
										<input
											type="checkbox"
											checked={Boolean(values[control.key])}
											onChange={(event) => updateControl(control, event)}
										/>
									)}
									{control.type === 'color' && (
										<input
											type="color"
											value={String(values[control.key])}
											onChange={(event) => updateControl(control, event)}
										/>
									)}
									{control.type === 'select' && (
										<select
											value={String(values[control.key])}
											onChange={(event) => updateControl(control, event)}
										>
											{control.options?.map((option) => (
												<option value={option.value} key={option.value}>
													{option.label}
												</option>
											))}
										</select>
									)}
									{control.type === 'range' && (
										<>
											<output>
												{String(values[control.key])}
												{control.unit}
											</output>
											<input
												type="range"
												min={control.min}
												max={control.max}
												step={control.step}
												value={Number(values[control.key])}
												onChange={(event) => updateControl(control, event)}
											/>
										</>
									)}
								</label>
							)
						)}
					</div>

					<ComponentStage id={activeId} values={values} replayKey={replayKey} />

					<footer className="workbench-footer">
						<div className="component-description">
							<p>{activeComponent.description}</p>
							<span>{activeComponent.principle}</span>
						</div>

						<div className="documentation">
							<details>
								<summary>React source</summary>
								<div className="code-panel source-panel">
									<button
										type="button"
										onClick={() => copy('Component source', sources[activeId].component)}
									>
										Copy component
									</button>
									<pre>
										<code>{sources[activeId].component}</code>
									</pre>
								</div>
							</details>
							<details>
								<summary>Usage</summary>
								<div className="code-panel">
									<button type="button" onClick={() => copy('Usage', activeComponent.usage)}>
										Copy usage
									</button>
									<pre>
										<code>{activeComponent.usage}</code>
									</pre>
								</div>
							</details>
							<details>
								<summary>CSS source</summary>
								<div className="code-panel source-panel">
									<button
										type="button"
										onClick={() => copy('CSS source', sources[activeId].styles)}
									>
										Copy CSS
									</button>
									<pre>
										<code>{sources[activeId].styles}</code>
									</pre>
								</div>
							</details>
							<details className="install-details">
								<summary>CLI install (optional)</summary>
								<p>
									Uses the shadcn-compatible installer to copy the same React and CSS files into
									your project. Beautiful CSS is not a runtime dependency.
								</p>
								<div
									className="install-command"
									aria-label={`${activeComponent.name} install command`}
								>
									<code>{installCommand}</code>
									<button type="button" onClick={() => copy('Install command', installCommand)}>
										Copy command
									</button>
								</div>
							</details>
							<details>
								<summary>API</summary>
								<div className="api-table">
									{activeComponent.properties.map((property) => (
										<div key={property.name}>
											<code>{property.name}</code>
											<span>{property.type}</span>
											<span>{property.defaultValue}</span>
											<p>{property.notes}</p>
										</div>
									))}
								</div>
							</details>
						</div>
						<p className="copy-status" aria-live="polite">
							{copyStatus}
						</p>
					</footer>
				</article>
			</div>
		</section>
	);
}
