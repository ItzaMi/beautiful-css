export type VisualComponent = {
	id: string;
	name: string;
	category: 'Text' | 'Background' | 'Pointer' | 'Media' | 'Surface';
	access: 'Free' | 'Pro';
	description: string;
	principle: string;
	usage: string;
};

export const visualComponents: VisualComponent[] = [
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
/>`
	},
	{
		id: 'character-shift',
		name: 'Character Shift',
		category: 'Text',
		access: 'Free',
		description: 'A staggered character exchange for compact labels, links, and editorial titles.',
		principle: 'Pointer and keyboard focus produce the same state.',
		usage: `<CharacterShift
  text="Read the journal"
  alternate="Enter the archive"
  href="/journal"
  duration={440}
/>`
	},
	{
		id: 'signal-marquee',
		name: 'Signal Marquee',
		category: 'Text',
		access: 'Free',
		description: 'A continuous text rail with useful pause and reduced-motion behaviour.',
		principle: 'Repeated content is hidden from assistive technology.',
		usage: `<SignalMarquee
  items={['Independent', 'Responsive', 'Editable']}
  duration={24}
/>`
	},
	{
		id: 'cursor-field',
		name: 'Cursor Field',
		category: 'Background',
		access: 'Free',
		description: 'An ambient constellation that gathers light around the visitor’s position.',
		principle: 'Decorative, contained, and absent from the accessibility tree.',
		usage: `<div class="hero">
  <CursorField color="#8fa1ff" count={46} />
  <h1>Your content stays above it.</h1>
</div>`
	},
	{
		id: 'focus-beam',
		name: 'Focus Beam',
		category: 'Pointer',
		access: 'Free',
		description: 'A soft field that follows pointer position and responds to focus within.',
		principle: 'Wraps existing interactive primitives without replacing them.',
		usage: `<FocusBeam color="#405cff" radius={280}>
  <YourExistingComponent />
</FocusBeam>`
	},
	{
		id: 'proximity-grid',
		name: 'Proximity Grid',
		category: 'Pointer',
		access: 'Pro',
		description:
			'A geometric surface whose cells communicate proximity without chasing the cursor.',
		principle: 'One pointer listener drives the complete field.',
		usage: `<div class="visual">
  <ProximityGrid
    columns={11}
    rows={7}
    color="#405cff"
    reach={190}
  />
</div>`
	},
	{
		id: 'media-shutter',
		name: 'Media Shutter',
		category: 'Media',
		access: 'Pro',
		description: 'A directional reveal that turns image discovery into a measured sequence.',
		principle: 'The image remains semantic and the reveal works with keyboard focus.',
		usage: `<MediaShutter
  src="/project-01.jpg"
  alt="Concrete house at dusk"
  href="/projects/house"
  panes={7}
  direction="vertical"
/>`
	},
	{
		id: 'edge-trace',
		name: 'Edge Trace',
		category: 'Surface',
		access: 'Pro',
		description:
			'A narrow moving perimeter for moments that need attention without a louder container.',
		principle: 'Decorates arbitrary content and never owns its interaction.',
		usage: `<EdgeTrace color="#8fa1ff" width={1} duration={5}>
  <YourExistingCard />
</EdgeTrace>`
	}
];
