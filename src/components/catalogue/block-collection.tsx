import { EditorialProjectHero } from '@/blocks/editorial-project-hero/editorial-project-hero';
import { ProjectIndex } from '@/blocks/project-index/project-index';
import { CopyInstallButton } from './copy-install-button';
import './block-collection.css';

const branch = 'concept/visual-component-library';

const blocks = [
	{
		id: 'editorial-project-hero',
		name: 'Editorial Project Hero',
		description:
			'Line reveal, media shutter, and edge trace composed into a working project entry.',
		preview: (
			<EditorialProjectHero
				imageSrc="/media-poster.svg"
				imageAlt="Geometric architectural study in blue, black, and white"
			/>
		)
	},
	{
		id: 'project-index',
		name: 'Project Index',
		description: 'A keyboard-ready studio index with a focus beam and shifting project titles.',
		preview: <ProjectIndex />
	}
] as const;

export function BlockCollection() {
	return (
		<section className="blocks" id="blocks">
			<header className="blocks__intro">
				<div>
					<p>Composed examples</p>
					<h2>Components become useful in company.</h2>
				</div>
				<p>
					Two complete, responsive sections. Install the editable block source together with the
					components it depends on.
				</p>
			</header>

			<div className="blocks__list">
				{blocks.map((block, index) => {
					const command = `npx shadcn@latest add ItzaMi/beautiful-css/${block.id}#${branch}`;
					return (
						<article className="block-showcase" key={block.id}>
							<header className="block-showcase__header">
								<span>{String(index + 1).padStart(2, '0')}</span>
								<div>
									<h3>{block.name}</h3>
									<p>{block.description}</p>
								</div>
								<div className="block-showcase__actions">
									<CopyInstallButton command={command} />
									<a href={`/preview/block/${block.id}`} target="_blank" rel="noreferrer">
										Open preview
									</a>
								</div>
							</header>
							<div className="block-showcase__command" aria-label={`${block.name} install command`}>
								<code>{command}</code>
							</div>
							<div className="block-showcase__preview">{block.preview}</div>
						</article>
					);
				})}
			</div>
		</section>
	);
}
