import { componentCatalog } from './catalog';

export type VisualCase = {
	kind: 'component' | 'block';
	id: string;
};

export const componentVisualCases: VisualCase[] = componentCatalog.map((component) => ({
	kind: 'component',
	id: component.id
}));

// Product blocks will register here and automatically enter the same viewport matrix.
export const blockVisualCases: VisualCase[] = [];

export const visualCases = [...componentVisualCases, ...blockVisualCases];
