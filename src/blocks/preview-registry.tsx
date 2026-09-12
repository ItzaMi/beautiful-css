import type { ReactElement } from 'react';

/**
 * Visual-test entry point for composed product blocks.
 *
 * Blocks stay framework-specific and intentionally separate from the smaller
 * Beautiful CSS component catalogue. Register a block here, then add its id to
 * `blockVisualCases` to give it the same visual test matrix as components.
 */
const blockPreviewRegistry: Record<string, ReactElement> = {};

export function getBlockPreview(id: string) {
	return blockPreviewRegistry[id];
}
