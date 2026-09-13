import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getBlockPreview } from '@/blocks/preview-registry';
import { BlockStage } from '@/components/catalogue/block-stage';
import { PreviewStage } from '@/components/catalogue/preview-stage';
import { getComponentSpec } from '@/data/catalog';
import { visualCases } from '@/data/visual-cases';

export function generateStaticParams() {
	return visualCases.map(({ kind, id }) => ({ kind, id }));
}

export default async function VisualPreviewPage({
	params
}: {
	params: Promise<{ kind: string; id: string }>;
}) {
	const { kind, id } = await params;

	if (kind === 'block') {
		if (!getBlockPreview(id)) notFound();
		return (
			<div className="visual-test-page">
				<BlockStage id={id} />
			</div>
		);
	}

	if (kind !== 'component') notFound();
	const component = getComponentSpec(id);
	if (!component) notFound();

	return (
		<div className="visual-test-page">
			<Suspense fallback={null}>
				<PreviewStage id={component.id} values={component.defaultValues} />
			</Suspense>
		</div>
	);
}
