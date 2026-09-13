import type { ReactElement } from 'react';

import { EditorialProjectHero } from './editorial-project-hero/editorial-project-hero';
import { ProjectIndex } from './project-index/project-index';

/**
 * Visual-test entry point for composed product blocks.
 *
 * Blocks stay framework-specific and intentionally separate from the smaller
 * Beautiful CSS component catalogue. Register a block here, then add its id to
 * `blockVisualCases` to give it the same visual test matrix as components.
 */
const blockPreviewRegistry: Record<string, ReactElement> = {
	'editorial-project-hero': (
		<EditorialProjectHero
			imageSrc="/media-poster-art.svg"
			imageAlt="Geometric architectural study in blue, black, and white"
		/>
	),
	'project-index': <ProjectIndex />
};

export function getBlockPreview(id: string) {
	return blockPreviewRegistry[id];
}
