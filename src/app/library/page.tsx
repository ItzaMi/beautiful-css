import { BlockCollection } from '@/components/catalogue/block-collection';
import { ComponentWorkbench } from '@/components/catalogue/component-workbench';
import { readComponentSources } from '@/data/sources';
import { componentCatalog } from '@/data/catalog';

export default async function LibraryPage() {
	const sources = await readComponentSources();

	return (
		<>
			<header className="library-intro" id="top">
				<p>Beautiful CSS library</p>
				<h1>Try the effect. Take the source.</h1>
				<div>
					<p>Every example below runs from the same editable React and CSS files you receive.</p>
					<span>{componentCatalog.length} components · Two blocks</span>
				</div>
			</header>

			<ComponentWorkbench sources={sources} />
			<BlockCollection mode="library" />
		</>
	);
}
