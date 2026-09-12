'use client';

import {
	CharacterShift,
	CursorField,
	EdgeTrace,
	FocusBeam,
	LineReveal,
	MediaShutter,
	ProximityGrid,
	SignalMarquee
} from '@/components/beautiful';
import type { ComponentId, ControlValue } from '@/data/catalog';
import './catalogue.css';

type ComponentStageProps = {
	id: ComponentId;
	values: Record<string, ControlValue>;
	replayKey?: number;
	standalone?: boolean;
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

export function ComponentStage({
	id,
	values,
	replayKey = 0,
	standalone = false
}: ComponentStageProps) {
	const theme =
		id === 'line-reveal' || id === 'proximity-grid' || id === 'media-shutter'
			? 'paper'
			: id === 'signal-marquee'
				? 'signal'
				: 'ink';

	return (
		<div
			className={`component-stage ${theme} ${standalone ? 'is-standalone' : ''}`}
			data-component-root={id}
		>
			{id === 'line-reveal' && (
				<div className="line-reveal-demo">
					<LineReveal
						lines={['Built slowly.', 'Remembered quickly.']}
						delay={numberValue(values, 'delay', 110)}
						duration={numberValue(values, 'duration', 760)}
						replayKey={replayKey}
					/>
				</div>
			)}

			{id === 'character-shift' && (
				<div className="character-demo">
					<CharacterShift
						text="Read the journal"
						alternate={stringValue(values, 'alternate', 'Open the journal')}
						href="#character-shift"
						duration={numberValue(values, 'duration', 440)}
					/>
					<p>Hover or focus the line</p>
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
						count={numberValue(values, 'count', 54)}
						color={stringValue(values, 'color', '#8fa1ff')}
						strength={numberValue(values, 'strength', 1)}
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
						radius={numberValue(values, 'radius', 300)}
						intensity={numberValue(values, 'intensity', 0.24)}
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
						columns={numberValue(values, 'columns', 11)}
						rows={numberValue(values, 'rows', 7)}
						color={stringValue(values, 'color', '#405cff')}
						reach={numberValue(values, 'reach', 170)}
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
						src="/media-poster.svg"
						alt="Geometric study in blue, black, and white"
						href="#media-shutter"
						panes={numberValue(values, 'panes', 7)}
						direction={
							stringValue(values, 'direction', 'vertical') === 'horizontal'
								? 'horizontal'
								: 'vertical'
						}
						label="Study in form / 01"
					/>
				</div>
			)}

			{id === 'edge-trace' && (
				<div className="trace-demo">
					<EdgeTrace
						color={stringValue(values, 'color', '#8fa1ff')}
						width={numberValue(values, 'width', 1)}
						radius={2}
						duration={numberValue(values, 'duration', 5)}
						active={booleanValue(values, 'active')}
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
