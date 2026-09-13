import { EditorialProjectHero } from '@/blocks/editorial-project-hero/editorial-project-hero';
import { ProjectIndex } from '@/blocks/project-index/project-index';
import { CopyInstallButton } from './copy-install-button';
import './block-collection.css';

const branch = 'concept/visual-component-library';

type BlockCollectionProps = {
	mode: 'showcase' | 'library';
};

const blocks = [
	{
		id: 'editorial-project-hero',
		name: 'Editorial Project Hero',
		description:
			'Line reveal, media shutter, and edge trace composed into a working project entry.',
		preview: (
			<EditorialProjectHero
				imageSrc="/media-poster-art.svg"
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

export function BlockCollection({ mode }: BlockCollectionProps) {
	const isLibrary = mode === 'library';

	return (
		<section className={`blocks is-${mode}`} id="blocks">
			<header className="blocks__intro">
				<div>
					<p>{isLibrary ? 'Complete sections' : 'In context'}</p>
					<h2>{isLibrary ? 'Start with a composed section.' : 'See what the pieces become.'}</h2>
				</div>
				<p>
					{isLibrary
						? 'Each block includes its editable source and the visual components it depends on.'
						: 'Components should earn their place inside real content, at real scale.'}
				</p>
			</header>

			<div className="blocks__list">
				{blocks.map((block) => {
					const command = `npx shadcn@latest add ItzaMi/beautiful-css/${block.id}#${branch}`;
					return (
						<article className="block-showcase" key={block.id}>
							<header className="block-showcase__header">
								<div>
									<h3>{block.name}</h3>
									{isLibrary && <p>{block.description}</p>}
								</div>
								<div className="block-showcase__actions">
									{isLibrary ? (
										<a href={`/preview/block/${block.id}`} target="_blank" rel="noreferrer">
											Open preview
										</a>
									) : (
										<a href="/library#blocks">View in library</a>
									)}
								</div>
							</header>
							{isLibrary && (
								<details className="block-showcase__install">
									<summary>Optional CLI install</summary>
									<div aria-label={`${block.name} install command`}>
										<code>{command}</code>
										<CopyInstallButton command={command} />
									</div>
								</details>
							)}
							<div className="block-showcase__preview">{block.preview}</div>
						</article>
					);
				})}
			</div>
		</section>
	);
}
