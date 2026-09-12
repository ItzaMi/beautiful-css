export type AssetKind = 'component' | 'block';
export type AccessLevel = 'Free' | 'Pro';

export type CatalogAsset = {
	id: string;
	name: string;
	kind: AssetKind;
	category: string;
	access: AccessLevel;
	description: string;
	format: string;
	dependencies: string;
	capabilities: string[];
};

export const components: CatalogAsset[] = [
	{
		id: 'focus-index',
		name: 'Focus Index',
		kind: 'component',
		category: 'Navigation',
		access: 'Free',
		description: 'Bring one item forward without losing the surrounding context.',
		format: 'CSS + optional JS',
		dependencies: 'None',
		capabilities: ['Pointer focus', 'Keyboard focus', 'Mobile fallback']
	},
	{
		id: 'word-loop',
		name: 'Word Loop',
		kind: 'component',
		category: 'Text',
		access: 'Free',
		description: 'Cycle through language without shifting the surrounding layout.',
		format: 'CSS',
		dependencies: 'None',
		capabilities: ['Timed sequence', 'Reduced motion', 'Intrinsic sizing']
	},
	{
		id: 'signal-button',
		name: 'Signal Button',
		kind: 'component',
		category: 'Interaction',
		access: 'Free',
		description: 'A quiet action with directional feedback built into its label.',
		format: 'CSS',
		dependencies: 'None',
		capabilities: ['Hover response', 'Focus state', 'No layout shift']
	},
	{
		id: 'tracking-tabs',
		name: 'Tracking Tabs',
		kind: 'component',
		category: 'Navigation',
		access: 'Free',
		description: 'Compact navigation that makes a change of context unmistakable.',
		format: 'CSS + JS',
		dependencies: 'None',
		capabilities: ['ARIA tabs', 'Keyboard ready', 'Animated state']
	},
	{
		id: 'hover-preview',
		name: 'Hover Preview',
		kind: 'component',
		category: 'Interaction',
		access: 'Free',
		description: 'Connect a dense index to a changing visual preview.',
		format: 'CSS + JS',
		dependencies: 'None',
		capabilities: ['Pointer intent', 'Focus parity', 'Stable dimensions']
	},
	{
		id: 'metric-roll',
		name: 'Metric Roll',
		kind: 'component',
		category: 'Data',
		access: 'Free',
		description: 'Update a number with enough motion to explain the change.',
		format: 'CSS + JS',
		dependencies: 'None',
		capabilities: ['Live region', 'Increment controls', 'Reduced motion']
	},
	{
		id: 'copy-field',
		name: 'Copy Field',
		kind: 'component',
		category: 'Utility',
		access: 'Free',
		description: 'Copy a value and confirm the action in the same compact surface.',
		format: 'CSS + JS',
		dependencies: 'None',
		capabilities: ['Clipboard action', 'Status feedback', 'Keyboard ready']
	},
	{
		id: 'disclosure-row',
		name: 'Disclosure Row',
		kind: 'component',
		category: 'Utility',
		access: 'Free',
		description: 'Reveal supporting detail while preserving the rhythm of a list.',
		format: 'CSS + JS',
		dependencies: 'None',
		capabilities: ['ARIA expanded', 'Single or multiple', 'Content animation']
	}
];

export const blocks: CatalogAsset[] = [
	{
		id: 'project-index-block',
		name: 'Project Index',
		kind: 'block',
		category: 'Portfolio',
		access: 'Pro',
		description: 'A complete project archive composed from Focus Index and Hover Preview.',
		format: 'HTML + CSS + JS',
		dependencies: 'None',
		capabilities: ['Responsive layout', 'Project states', 'Touch fallback']
	},
	{
		id: 'launch-hero-block',
		name: 'Product Launch Hero',
		kind: 'block',
		category: 'Marketing',
		access: 'Pro',
		description: 'A complete hero composed from Word Loop, Signal Button, and Metric Roll.',
		format: 'HTML + CSS + JS',
		dependencies: 'None',
		capabilities: ['Responsive type', 'Motion controls', 'Conversion states']
	},
	{
		id: 'command-surface-block',
		name: 'Command Surface',
		kind: 'block',
		category: 'Application',
		access: 'Pro',
		description: 'A searchable command surface with navigation and action feedback.',
		format: 'HTML + CSS + JS',
		dependencies: 'None',
		capabilities: ['Search filtering', 'Keyboard actions', 'Empty state']
	}
];

export const allAssets = [...components, ...blocks];
