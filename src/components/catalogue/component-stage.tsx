'use client';

import {
	CharacterShift,
	CounterRoll,
	CropShift,
	CursorField,
	EdgeTrace,
	FocusBeam,
	LineReveal,
	MediaShutter,
	ProximityGrid,
	SectionSignal,
	SignalMarquee,
	WordCascade
} from '@/components/beautiful';
import type { ComponentId, ControlValue } from '@/data/catalog';
import './catalogue.css';

type ComponentStageProps = {
	id: ComponentId;
	values: Record<string, ControlValue>;
	replayKey?: number;
	standalone?: boolean;
	scenario?: string;
};

const numberValue = (values: Record<string, ControlValue>, key: string, fallback: number) => {
	const value = values[key];
	return typeof value === 'number' ? value : fallback;
};

const stringValue = (values: Record<string, ControlValue>, key: string, fallback: string) => {
	const value = values[key];
	return typeof value === 'string' ? value : fallback;
};

const booleanValue = (values: Record<string, ControlValue>, key: string, fallback = false) => {
	const value = values[key];
	return typeof value === 'boolean' ? value : fallback;
};

function countProbeEvent(element: HTMLElement, name: string) {
	const attribute = `data-consumer-${name}`;
	const count = Number(element.getAttribute(attribute) ?? 0);
	element.setAttribute(attribute, String(count + 1));
}

export function ComponentStage({
	id,
	values,
	replayKey = 0,
	standalone = false,
	scenario = 'default'
}: ComponentStageProps) {
	const theme =
		id === 'line-reveal' ||
		id === 'word-cascade' ||
		id === 'proximity-grid' ||
		id === 'crop-shift' ||
		id === 'media-shutter'
			? 'paper'
			: id === 'signal-marquee' || id === 'counter-roll'
				? 'signal'
				: 'ink';
	const eventProbe = scenario === 'event-probe';

	return (
		<div
			className={`component-stage ${theme} ${standalone ? 'is-standalone' : ''}`}
			data-component-root={id}
		>
			{id === 'line-reveal' && (
				<div className="line-reveal-demo">
					<LineReveal
						lines={
							scenario === 'long-content'
								? ['A reveal should never sacrifice the words it carries.']
								: scenario === 'type-metrics'
									? ['Ångström, Évora & Água.', 'gypj QÇ — façade.']
									: ['Built slowly.', 'Remembered quickly.']
						}
						delay={numberValue(values, 'delay', 110)}
						duration={numberValue(values, 'duration', 760)}
						replayKey={replayKey}
					/>
				</div>
			)}

			{id === 'word-cascade' && (
				<div className="word-cascade-demo">
					<div>
						<WordCascade
							text={
								scenario === 'long-content'
									? 'Independent visual tools should keep every word intact as the available measure changes.'
									: scenario === 'type-metrics'
										? 'Ångström, Évora, Água, façade and gypj stay whole.'
										: 'Independent tools for expressive interfaces.'
							}
							delay={numberValue(values, 'delay', 55)}
							duration={numberValue(values, 'duration', 560)}
							replayKey={replayKey}
						/>
					</div>
					<p>One phrase. Natural line breaks.</p>
				</div>
			)}

			{id === 'character-shift' && (
				<div className="character-demo">
					<CharacterShift
						text={
							scenario === 'long-content'
								? 'Read the field notes'
								: scenario === 'type-metrics'
									? 'Ångström, Évora & Água'
									: 'Read the journal'
						}
						alternate={
							scenario === 'long-content'
								? 'Open the complete field journal'
								: scenario === 'type-metrics'
									? 'gypj QÇ — façade'
									: stringValue(values, 'alternate', 'Open the journal')
						}
						href="#character-shift"
						duration={numberValue(values, 'duration', 320)}
					/>
					<p>Hover or focus the line</p>
				</div>
			)}

			{id === 'counter-roll' && (
				<div className="counter-roll-demo">
					<header>
						<span>Archive count</span>
						<span>Updated live</span>
					</header>
					<div>
						<CounterRoll
							value={scenario === 'large-number' ? 9876543.21 : numberValue(values, 'value', 1842)}
							previousValue={0}
							minimumIntegerDigits={scenario === 'large-number' ? 1 : 4}
							fractionDigits={scenario === 'large-number' ? 2 : 0}
							prefix={scenario === 'large-number' ? '€' : ''}
							duration={numberValue(values, 'duration', 620)}
						/>
						<span>works catalogued</span>
					</div>
					<p>Across fourteen independent practices.</p>
				</div>
			)}

			{id === 'signal-marquee' && (
				<div className="marquee-demo">
					<SignalMarquee
						items={['Independent', 'Responsive', 'Editable', 'Yours']}
						duration={numberValue(values, 'duration', 20)}
						reverse={booleanValue(values, 'reverse')}
						paused={booleanValue(values, 'paused')}
					/>
				</div>
			)}

			{id === 'cursor-field' && (
				<div className="field-demo">
					<CursorField
						count={scenario === 'dense' ? 90 : numberValue(values, 'count', 54)}
						color={stringValue(values, 'color', '#8fa1ff')}
						strength={scenario === 'dense' ? 1.35 : numberValue(values, 'strength', 1)}
						onPointerMove={
							eventProbe ? (event) => countProbeEvent(event.currentTarget, 'moves') : undefined
						}
						onPointerLeave={
							eventProbe ? (event) => countProbeEvent(event.currentTarget, 'leaves') : undefined
						}
					/>
					<div>
						<strong>Move through the field.</strong>
						<span>The content remains yours.</span>
					</div>
				</div>
			)}

			{id === 'focus-beam' && (
				<div className="beam-demo">
					<FocusBeam
						color={stringValue(values, 'color', '#405cff')}
						radius={scenario === 'tight' ? 160 : numberValue(values, 'radius', 300)}
						intensity={numberValue(values, 'intensity', 0.24)}
						onPointerMove={
							eventProbe ? (event) => countProbeEvent(event.currentTarget, 'moves') : undefined
						}
						onPointerLeave={
							eventProbe ? (event) => countProbeEvent(event.currentTarget, 'leaves') : undefined
						}
						onFocus={
							eventProbe ? (event) => countProbeEvent(event.currentTarget, 'focuses') : undefined
						}
						onBlur={
							eventProbe ? (event) => countProbeEvent(event.currentTarget, 'blurs') : undefined
						}
					>
						<nav aria-label="Example project index">
							<a href="#focus-beam">
								<span>Elm House</span>
								<em>Residential, 2026</em>
							</a>
							<a href="#focus-beam">
								<span>Parallel</span>
								<em>Workspace, 2025</em>
							</a>
							<a href="#focus-beam">
								<span>Northbank</span>
								<em>Hospitality, 2025</em>
							</a>
						</nav>
					</FocusBeam>
				</div>
			)}

			{id === 'proximity-grid' && (
				<div className="grid-demo">
					<ProximityGrid
						columns={scenario === 'dense' ? 18 : numberValue(values, 'columns', 11)}
						rows={scenario === 'dense' ? 12 : numberValue(values, 'rows', 7)}
						color={stringValue(values, 'color', '#405cff')}
						reach={scenario === 'dense' ? 120 : numberValue(values, 'reach', 170)}
						onPointerMove={
							eventProbe ? (event) => countProbeEvent(event.currentTarget, 'moves') : undefined
						}
						onPointerLeave={
							eventProbe ? (event) => countProbeEvent(event.currentTarget, 'leaves') : undefined
						}
					/>
					<p>
						Proximity
						<br />
						without pursuit.
					</p>
				</div>
			)}

			{id === 'media-shutter' && (
				<div className="media-demo">
					<MediaShutter
						src="/media-poster-art.svg"
						alt="Geometric study in blue, black, and white"
						href="#media-shutter"
						panes={numberValue(values, 'panes', 7)}
						direction={
							scenario === 'horizontal' ||
							stringValue(values, 'direction', 'vertical') === 'horizontal'
								? 'horizontal'
								: 'vertical'
						}
						label="Study in form / 01"
					/>
				</div>
			)}

			{id === 'crop-shift' && (
				<div className="crop-shift-demo">
					<CropShift
						src="/media-poster-art.svg"
						alt="Geometric study in blue, black, and white"
						href="#crop-shift"
						focalX={numberValue(values, 'focalX', 58)}
						focalY={numberValue(values, 'focalY', 46)}
						range={scenario === 'wide-travel' ? 30 : numberValue(values, 'range', 14)}
						duration={numberValue(values, 'duration', 680)}
						label="Shift the frame"
						onPointerMove={
							eventProbe ? (event) => countProbeEvent(event.currentTarget, 'moves') : undefined
						}
						onPointerLeave={
							eventProbe ? (event) => countProbeEvent(event.currentTarget, 'leaves') : undefined
						}
					/>
				</div>
			)}

			{id === 'section-signal' && (
				<div className="section-signal-demo">
					<SectionSignal
						progress={scenario === 'complete' ? 1 : numberValue(values, 'progress', 0.58)}
						rail={stringValue(values, 'rail', 'start') === 'end' ? 'end' : 'start'}
					>
						<span>02 / Field notes</span>
						<h2>A quiet signal for long-form structure.</h2>
						<p>
							The section remains ordinary content. The rail only makes its current reading state
							visible.
						</p>
					</SectionSignal>
				</div>
			)}

			{id === 'edge-trace' && (
				<div className="trace-demo">
					<EdgeTrace
						color={stringValue(values, 'color', '#8fa1ff')}
						width={numberValue(values, 'width', 1)}
						radius={2}
						duration={numberValue(values, 'duration', 1.15)}
						active={scenario === 'active' || booleanValue(values, 'active')}
					>
						<div className="trace-card">
							<span>Available for selected work</span>
							<strong>Let the edge carry the signal.</strong>
							<a href="#edge-trace">Start a conversation</a>
						</div>
					</EdgeTrace>
				</div>
			)}
		</div>
	);
}
