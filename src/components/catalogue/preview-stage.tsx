'use client';

import { useSearchParams } from 'next/navigation';
import type { ComponentId, ControlValue } from '@/data/catalog';
import { ComponentStage } from './component-stage';

type PreviewStageProps = {
	id: ComponentId;
	values: Record<string, ControlValue>;
};

export function PreviewStage({ id, values }: PreviewStageProps) {
	const searchParams = useSearchParams();

	return (
		<ComponentStage
			id={id}
			values={values}
			standalone
			scenario={searchParams.get('scenario') ?? 'default'}
		/>
	);
}
