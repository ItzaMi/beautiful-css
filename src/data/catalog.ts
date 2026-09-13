export type ComponentId =
	| 'line-reveal'
	| 'word-cascade'
	| 'character-shift'
	| 'counter-roll'
	| 'crop-shift'
	| 'signal-marquee'
	| 'cursor-field'
	| 'focus-beam'
	| 'proximity-grid'
	| 'media-shutter'
	| 'section-signal'
	| 'edge-trace';

export type ControlValue = string | number | boolean;

export type ComponentControl = {
	key: string;
	label: string;
	type: 'range' | 'select' | 'toggle' | 'action' | 'color';
	min?: number;
	max?: number;
	step?: number;
	unit?: string;
	options?: Array<{ label: string; value: string }>;
};

export type ComponentProperty = {
	name: string;
	type: string;
	defaultValue: string;
	notes: string;
};

export type ComponentSpec = {
	id: ComponentId;
	name: string;
	category: 'Text' | 'Background' | 'Pointer' | 'Media' | 'Surface' | 'State' | 'Layout';
	access: 'Free' | 'Pro';
	description: string;
	principle: string;
	usage: string;
	defaultValues: Record<string, ControlValue>;
	controls: ComponentControl[];
	properties: ComponentProperty[];
	sourceFiles: { component: string; styles: string };
};

const sourceRoot = 'src/components/beautiful';

export const componentCatalog: ComponentSpec[] = [
	{
		id: 'line-reveal',
		name: 'Line Reveal',
		category: 'Text',
		access: 'Free',
		description: 'Masked lines enter as one typographic gesture without changing document flow.',
		principle: 'Content remains readable when animation is unavailable.',
		usage: `<LineReveal
  lines={['Built slowly.', 'Remembered quickly.']}
  delay={110}
  duration={760}
/>`,
		defaultValues: { delay: 110, duration: 760 },
		controls: [
			{ key: 'replay', label: 'Replay', type: 'action' },
			{ key: 'delay', label: 'Line delay', type: 'range', min: 0, max: 260, step: 10, unit: 'ms' },
			{
				key: 'duration',
				label: 'Duration',
				type: 'range',
				min: 200,
				max: 1400,
				step: 20,
				unit: 'ms'
			}
		],
		properties: [
			{
				name: 'lines',
				type: 'string[]',
				defaultValue: "['Made to move.', …]",
				notes: 'Visible lines in reading order.'
			},
			{
				name: 'delay',
				type: 'number',
				defaultValue: '90',
				notes: 'Delay between lines in milliseconds.'
			},
			{
				name: 'duration',
				type: 'number',
				defaultValue: '720',
				notes: 'Reveal duration in milliseconds.'
			},
			{
				name: 'replayKey',
				type: 'string | number',
				defaultValue: '0',
				notes: 'Change to replay the entrance.'
			}
		],
		sourceFiles: {
			component: `${sourceRoot}/line-reveal/line-reveal.tsx`,
			styles: `${sourceRoot}/line-reveal/line-reveal.css`
		}
	},
	{
		id: 'word-cascade',
		name: 'Word Cascade',
		category: 'Text',
		access: 'Free',
		description: 'Words enter independently while line wrapping remains native to the container.',
		principle: 'The browser keeps ownership of text flow, reading order, and wrapping.',
		usage: `<WordCascade
  text="Independent tools for expressive interfaces."
  delay={55}
  duration={560}
/>`,
		defaultValues: { delay: 55, duration: 560 },
		controls: [
			{ key: 'replay', label: 'Replay', type: 'action' },
			{ key: 'delay', label: 'Word delay', type: 'range', min: 0, max: 140, step: 5, unit: 'ms' },
			{
				key: 'duration',
				label: 'Duration',
				type: 'range',
				min: 200,
				max: 1000,
				step: 20,
				unit: 'ms'
			}
		],
		properties: [
			{
				name: 'text',
				type: 'string',
				defaultValue: "'Words arrive …'",
				notes: 'The complete semantic phrase; words wrap naturally.'
			},
			{
				name: 'delay',
				type: 'number',
				defaultValue: '55',
				notes: 'Delay between words in milliseconds.'
			},
			{
				name: 'duration',
				type: 'number',
				defaultValue: '560',
				notes: 'Entrance duration in milliseconds.'
			},
			{
				name: 'replayKey',
				type: 'string | number',
				defaultValue: '0',
				notes: 'Change to replay the entrance.'
			}
		],
		sourceFiles: {
			component: `${sourceRoot}/word-cascade/word-cascade.tsx`,
			styles: `${sourceRoot}/word-cascade/word-cascade.css`
		}
	},
	{
		id: 'character-shift',
		name: 'Character Shift',
		category: 'Text',
		access: 'Free',
		description: 'A clipped phrase exchange for compact links and editorial titles.',
		principle: 'Pointer and keyboard focus produce the same state.',
		usage: `<CharacterShift
  text="Read the journal"
  alternate="Open the full journal"
  href="/journal"
  duration={320}
/>`,
		defaultValues: { alternate: 'Open the journal', duration: 320 },
		controls: [
			{
				key: 'alternate',
				label: 'Alternate phrase',
				type: 'select',
				options: [
					{ label: 'Open the journal', value: 'Open the journal' },
					{ label: 'View the full journal', value: 'View the full journal' }
				]
			},
			{
				key: 'duration',
				label: 'Duration',
				type: 'range',
				min: 180,
				max: 600,
				step: 20,
				unit: 'ms'
			}
		],
		properties: [
			{
				name: 'text',
				type: 'string',
				defaultValue: "'Character shift'",
				notes: 'Stable accessible link text.'
			},
			{
				name: 'alternate',
				type: 'string',
				defaultValue: "'Beautiful motion'",
				notes: 'Hover and focus phrase; it may be longer.'
			},
			{
				name: 'duration',
				type: 'number',
				defaultValue: '320',
				notes: 'Transition duration in milliseconds.'
			},
			{
				name: '…anchor props',
				type: 'AnchorHTMLAttributes',
				defaultValue: '—',
				notes: 'Native link behaviour stays available.'
			}
		],
		sourceFiles: {
			component: `${sourceRoot}/character-shift/character-shift.tsx`,
			styles: `${sourceRoot}/character-shift/character-shift.css`
		}
	},
	{
		id: 'counter-roll',
		name: 'Counter Roll',
		category: 'State',
		access: 'Free',
		description: 'A value transition with stable tabular columns and one announced result.',
		principle:
			'Visual history stays hidden from assistive technology while long values adapt to their container.',
		usage: `<CounterRoll
  value={1842}
  previousValue={0}
  minimumIntegerDigits={4}
  duration={620}
/>`,
		defaultValues: { value: 1842, duration: 620 },
		controls: [
			{ key: 'value', label: 'Value', type: 'range', min: 0, max: 5000, step: 137 },
			{
				key: 'duration',
				label: 'Duration',
				type: 'range',
				min: 180,
				max: 1200,
				step: 20,
				unit: 'ms'
			}
		],
		properties: [
			{ name: 'value', type: 'number', defaultValue: '0', notes: 'Current numeric value.' },
			{
				name: 'previousValue',
				type: 'number',
				defaultValue: 'value',
				notes: 'Optional first value used for the initial roll.'
			},
			{
				name: 'locale',
				type: 'string',
				defaultValue: "'en'",
				notes: 'Locale passed to Intl.NumberFormat.'
			},
			{
				name: 'minimumIntegerDigits',
				type: 'number',
				defaultValue: '1',
				notes: 'Clamped from 1 to 12.'
			},
			{
				name: 'fractionDigits',
				type: 'number',
				defaultValue: '0',
				notes: 'Fixed fraction digits, clamped from 0 to 6.'
			},
			{
				name: 'prefix / suffix',
				type: 'string',
				defaultValue: "''",
				notes: 'Visible text included in the announced value.'
			},
			{
				name: 'duration',
				type: 'number',
				defaultValue: '620',
				notes: 'Roll duration in milliseconds.'
			}
		],
		sourceFiles: {
			component: `${sourceRoot}/counter-roll/counter-roll.tsx`,
			styles: `${sourceRoot}/counter-roll/counter-roll.css`
		}
	},
	{
		id: 'signal-marquee',
		name: 'Signal Marquee',
		category: 'Text',
		access: 'Free',
		description: 'A continuous text rail that resolves into a complete layout without motion.',
		principle: 'Repeated content is hidden from assistive technology and never freezes half-read.',
		usage: `<SignalMarquee
  items={['Independent', 'Responsive', 'Editable']}
  duration={24}
  paused={false}
/>`,
		defaultValues: { duration: 20, reverse: false, paused: false },
		controls: [
			{ key: 'paused', label: 'Pause movement', type: 'toggle' },
			{ key: 'reverse', label: 'Reverse direction', type: 'toggle' },
			{
				key: 'duration',
				label: 'Loop duration',
				type: 'range',
				min: 8,
				max: 40,
				step: 1,
				unit: 's'
			}
		],
		properties: [
			{
				name: 'items',
				type: 'string[]',
				defaultValue: "['Responsive', …]",
				notes: 'Items announced once in source order.'
			},
			{ name: 'duration', type: 'number', defaultValue: '22', notes: 'Loop duration in seconds.' },
			{
				name: 'reverse',
				type: 'boolean',
				defaultValue: 'false',
				notes: 'Moves in the opposite direction.'
			},
			{
				name: 'paused',
				type: 'boolean',
				defaultValue: 'false',
				notes: 'Externally controllable motion state.'
			},
			{
				name: 'pauseOnHover',
				type: 'boolean',
				defaultValue: 'true',
				notes: 'Allows pointer users to pause in place.'
			}
		],
		sourceFiles: {
			component: `${sourceRoot}/signal-marquee/signal-marquee.tsx`,
			styles: `${sourceRoot}/signal-marquee/signal-marquee.css`
		}
	},
	{
		id: 'cursor-field',
		name: 'Cursor Field',
		category: 'Background',
		access: 'Free',
		description: 'A distributed constellation that gathers and releases around the visitor.',
		principle:
			'Decorative, frame-throttled, fully resettable, and absent from the accessibility tree.',
		usage: `<div className="hero">
  <CursorField color="#8fa1ff" count={46} />
  <h1>Your content stays above it.</h1>
</div>`,
		defaultValues: { count: 54, color: '#8fa1ff', strength: 1 },
		controls: [
			{ key: 'color', label: 'Signal color', type: 'color' },
			{ key: 'count', label: 'Points', type: 'range', min: 18, max: 90, step: 1 },
			{ key: 'strength', label: 'Strength', type: 'range', min: 0.5, max: 2, step: 0.05 }
		],
		properties: [
			{
				name: 'count',
				type: 'number',
				defaultValue: '46',
				notes: 'Deterministic points, clamped from 1 to 120.'
			},
			{ name: 'color', type: 'string', defaultValue: "'#8fa1ff'", notes: 'Any valid CSS color.' },
			{ name: 'strength', type: 'number', defaultValue: '1', notes: 'Point response intensity.' }
		],
		sourceFiles: {
			component: `${sourceRoot}/cursor-field/cursor-field.tsx`,
			styles: `${sourceRoot}/cursor-field/cursor-field.css`
		}
	},
	{
		id: 'focus-beam',
		name: 'Focus Beam',
		category: 'Pointer',
		access: 'Free',
		description: 'A soft field that travels between pointer position and focused content.',
		principle: 'Wraps existing interactive primitives without replacing them.',
		usage: `<FocusBeam color="#405cff" radius={280}>
  <YourExistingComponent />
</FocusBeam>`,
		defaultValues: { color: '#405cff', radius: 300, intensity: 0.24 },
		controls: [
			{ key: 'color', label: 'Beam color', type: 'color' },
			{ key: 'radius', label: 'Radius', type: 'range', min: 120, max: 560, step: 10, unit: 'px' },
			{ key: 'intensity', label: 'Intensity', type: 'range', min: 0.08, max: 0.5, step: 0.01 }
		],
		properties: [
			{ name: 'color', type: 'string', defaultValue: "'#405cff'", notes: 'Any valid CSS color.' },
			{ name: 'radius', type: 'number', defaultValue: '260', notes: 'Beam radius in pixels.' },
			{
				name: 'intensity',
				type: 'number',
				defaultValue: '0.18',
				notes: 'Color contribution from 0 to 1.'
			},
			{
				name: 'children',
				type: 'ReactNode',
				defaultValue: '—',
				notes: 'Existing interactive content.'
			}
		],
		sourceFiles: {
			component: `${sourceRoot}/focus-beam/focus-beam.tsx`,
			styles: `${sourceRoot}/focus-beam/focus-beam.css`
		}
	},
	{
		id: 'proximity-grid',
		name: 'Proximity Grid',
		category: 'Pointer',
		access: 'Pro',
		description:
			'A geometric surface whose cells communicate proximity without chasing the cursor.',
		principle: 'One frame-throttled pointer listener drives the complete field.',
		usage: `<ProximityGrid
  columns={11}
  rows={7}
  color="#405cff"
  reach={190}
/>`,
		defaultValues: { columns: 11, rows: 7, color: '#405cff', reach: 170 },
		controls: [
			{ key: 'color', label: 'Grid color', type: 'color' },
			{ key: 'columns', label: 'Columns', type: 'range', min: 5, max: 18, step: 1 },
			{ key: 'rows', label: 'Rows', type: 'range', min: 4, max: 12, step: 1 },
			{ key: 'reach', label: 'Reach', type: 'range', min: 80, max: 340, step: 10, unit: 'px' }
		],
		properties: [
			{ name: 'columns', type: 'number', defaultValue: '11', notes: 'Clamped between 1 and 24.' },
			{ name: 'rows', type: 'number', defaultValue: '7', notes: 'Clamped between 1 and 18.' },
			{ name: 'color', type: 'string', defaultValue: "'#405cff'", notes: 'Any valid CSS color.' },
			{ name: 'reach', type: 'number', defaultValue: '170', notes: 'Response radius in pixels.' }
		],
		sourceFiles: {
			component: `${sourceRoot}/proximity-grid/proximity-grid.tsx`,
			styles: `${sourceRoot}/proximity-grid/proximity-grid.css`
		}
	},
	{
		id: 'crop-shift',
		name: 'Crop Shift',
		category: 'Media',
		access: 'Free',
		description:
			'A responsive image crop that follows intent without moving the surrounding layout.',
		principle:
			'Pointer movement refines the crop; keyboard and touch retain a deliberate focal point.',
		usage: `<CropShift
  src="/project.jpg"
  alt="Gallery interior with a blue installation"
  href="/projects/gallery"
  focalX={58}
  focalY={46}
/>`,
		defaultValues: { focalX: 58, focalY: 46, range: 14, duration: 680 },
		controls: [
			{ key: 'focalX', label: 'Focal X', type: 'range', min: 0, max: 100, step: 1, unit: '%' },
			{ key: 'focalY', label: 'Focal Y', type: 'range', min: 0, max: 100, step: 1, unit: '%' },
			{ key: 'range', label: 'Travel', type: 'range', min: 0, max: 30, step: 1, unit: '%' },
			{
				key: 'duration',
				label: 'Response',
				type: 'range',
				min: 180,
				max: 1200,
				step: 20,
				unit: 'ms'
			}
		],
		properties: [
			{ name: 'src', type: 'string', defaultValue: 'required', notes: 'Native image source.' },
			{
				name: 'alt',
				type: 'string',
				defaultValue: 'required',
				notes: 'Semantic image description.'
			},
			{
				name: 'focalX / focalY',
				type: 'number',
				defaultValue: '50',
				notes: 'Stable focal point, clamped from 0 to 100.'
			},
			{
				name: 'range',
				type: 'number',
				defaultValue: '14',
				notes: 'Maximum pointer travel, clamped from 0 to 50.'
			},
			{
				name: 'duration',
				type: 'number',
				defaultValue: '680',
				notes: 'Crop response duration in milliseconds.'
			},
			{
				name: '…anchor props',
				type: 'AnchorHTMLAttributes',
				defaultValue: '—',
				notes: 'The media keeps native link behavior.'
			}
		],
		sourceFiles: {
			component: `${sourceRoot}/crop-shift/crop-shift.tsx`,
			styles: `${sourceRoot}/crop-shift/crop-shift.css`
		}
	},
	{
		id: 'media-shutter',
		name: 'Media Shutter',
		category: 'Media',
		access: 'Pro',
		description:
			'A directional curtain that keeps the image legible before revealing its full color.',
		principle: 'Touch and reduced-motion users receive the uncovered semantic image.',
		usage: `<MediaShutter
  src="/project-01.jpg"
  alt="Concrete house at dusk"
  href="/projects/house"
  panes={7}
  direction="vertical"
/>`,
		defaultValues: { panes: 7, direction: 'vertical' },
		controls: [
			{
				key: 'direction',
				label: 'Direction',
				type: 'select',
				options: [
					{ label: 'Down', value: 'vertical' },
					{ label: 'Across', value: 'horizontal' }
				]
			},
			{ key: 'panes', label: 'Panes', type: 'range', min: 2, max: 12, step: 1 }
		],
		properties: [
			{ name: 'src', type: 'string', defaultValue: 'required', notes: 'Native image source.' },
			{
				name: 'alt',
				type: 'string',
				defaultValue: 'required',
				notes: 'Semantic image description.'
			},
			{ name: 'panes', type: 'number', defaultValue: '7', notes: 'Clamped between 1 and 16.' },
			{
				name: 'direction',
				type: "'vertical' | 'horizontal'",
				defaultValue: "'vertical'",
				notes: 'Direction of the reveal.'
			},
			{
				name: 'label',
				type: 'string',
				defaultValue: "'Reveal image'",
				notes: 'Visible image caption.'
			}
		],
		sourceFiles: {
			component: `${sourceRoot}/media-shutter/media-shutter.tsx`,
			styles: `${sourceRoot}/media-shutter/media-shutter.css`
		}
	},
	{
		id: 'section-signal',
		name: 'Section Signal',
		category: 'Layout',
		access: 'Free',
		description: 'A section wrapper that turns reading progress into a quiet structural rail.',
		principle: 'Content remains ordinary HTML; progress is exposed as a composable CSS property.',
		usage: `<SectionSignal rail="start">
  <article>Your section content</article>
</SectionSignal>`,
		defaultValues: { progress: 0.58, rail: 'start' },
		controls: [
			{ key: 'progress', label: 'Progress', type: 'range', min: 0, max: 1, step: 0.05 },
			{
				key: 'rail',
				label: 'Rail position',
				type: 'select',
				options: [
					{ label: 'Start', value: 'start' },
					{ label: 'End', value: 'end' }
				]
			}
		],
		properties: [
			{
				name: 'progress',
				type: 'number | undefined',
				defaultValue: 'undefined',
				notes: 'Controlled progress from 0 to 1; omit to derive it from scroll position.'
			},
			{
				name: 'rail',
				type: "'start' | 'end'",
				defaultValue: "'start'",
				notes: 'Places the progress rail before or after the content.'
			},
			{
				name: 'children',
				type: 'ReactNode',
				defaultValue: 'required',
				notes: 'Consumer-owned section content.'
			}
		],
		sourceFiles: {
			component: `${sourceRoot}/section-signal/section-signal.tsx`,
			styles: `${sourceRoot}/section-signal/section-signal.css`
		}
	},
	{
		id: 'edge-trace',
		name: 'Edge Trace',
		category: 'Surface',
		access: 'Pro',
		description: 'A one-shot perimeter signal for moments that need restrained attention.',
		principle: 'Decorates arbitrary content and never owns its interaction.',
		usage: `<EdgeTrace color="#8fa1ff" width={1} duration={1.15}>
  <YourExistingCard />
</EdgeTrace>`,
		defaultValues: { color: '#8fa1ff', width: 1, duration: 1.15, active: false },
		controls: [
			{ key: 'color', label: 'Trace color', type: 'color' },
			{ key: 'active', label: 'Run trace', type: 'toggle' },
			{ key: 'width', label: 'Line width', type: 'range', min: 1, max: 5, step: 1, unit: 'px' },
			{
				key: 'duration',
				label: 'Sweep duration',
				type: 'range',
				min: 0.6,
				max: 2.4,
				step: 0.05,
				unit: 's'
			}
		],
		properties: [
			{ name: 'color', type: 'string', defaultValue: "'#405cff'", notes: 'Any valid CSS color.' },
			{ name: 'width', type: 'number', defaultValue: '1', notes: 'Perimeter width in pixels.' },
			{
				name: 'radius',
				type: 'number',
				defaultValue: '2',
				notes: 'Outer corner radius in pixels.'
			},
			{
				name: 'duration',
				type: 'number',
				defaultValue: '1.15',
				notes: 'Sweep duration in seconds.'
			},
			{
				name: 'active',
				type: 'boolean',
				defaultValue: 'false',
				notes: 'Runs once without waiting for hover or focus.'
			},
			{
				name: 'children',
				type: 'ReactNode',
				defaultValue: '—',
				notes: 'Arbitrary existing content.'
			}
		],
		sourceFiles: {
			component: `${sourceRoot}/edge-trace/edge-trace.tsx`,
			styles: `${sourceRoot}/edge-trace/edge-trace.css`
		}
	}
];

export function getComponentSpec(id: string) {
	return componentCatalog.find((component) => component.id === id);
}
