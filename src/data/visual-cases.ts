import { componentCatalog } from './catalog';

export type VisualCase = {
	kind: 'component' | 'block';
	id: string;
};

export const componentVisualCases: VisualCase[] = componentCatalog.map((component) => ({
	kind: 'component',
	id: component.id
}));

export const blockVisualCases: VisualCase[] = [
	{ kind: 'block', id: 'editorial-project-hero' },
	{ kind: 'block', id: 'project-index' }
];

export const visualCases = [...componentVisualCases, ...blockVisualCases];
