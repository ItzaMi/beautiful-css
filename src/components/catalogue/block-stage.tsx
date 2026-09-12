import { getBlockPreview } from '@/blocks/preview-registry';

type BlockStageProps = {
	id: string;
};

export function BlockStage({ id }: BlockStageProps) {
	const blockPreview = getBlockPreview(id);
	if (!blockPreview) return null;

	return (
		<div className="block-stage" data-block-root data-preview-id={id}>
			{blockPreview}
		</div>
	);
}
