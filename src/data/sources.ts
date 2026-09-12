import 'server-only';

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { componentCatalog, type ComponentId } from './catalog';

export type ComponentSource = {
	component: string;
	styles: string;
};

export type ComponentSources = Record<ComponentId, ComponentSource>;

export async function readComponentSources(): Promise<ComponentSources> {
	const entries = await Promise.all(
		componentCatalog.map(async (component) => {
			const [source, styles] = await Promise.all([
				readFile(
					path.join(
						process.cwd(),
						'src',
						'components',
						'beautiful',
						component.id,
						`${component.id}.tsx`
					),
					'utf8'
				),
				readFile(
					path.join(
						process.cwd(),
						'src',
						'components',
						'beautiful',
						component.id,
						`${component.id}.css`
					),
					'utf8'
				)
			]);

			return [component.id, { component: source, styles }] as const;
		})
	);

	return Object.fromEntries(entries) as ComponentSources;
}
