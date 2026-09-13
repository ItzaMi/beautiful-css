import { EdgeTrace } from '@/components/beautiful/edge-trace/edge-trace';
import { LineReveal } from '@/components/beautiful/line-reveal/line-reveal';
import { MediaShutter } from '@/components/beautiful/media-shutter/media-shutter';
import './editorial-project-hero.css';

export type EditorialProjectHeroProps = {
	eyebrow?: string;
	title?: string[];
	description?: string;
	location?: string;
	year?: string;
	imageSrc: string;
	imageAlt: string;
	projectHref?: string;
	actionLabel?: string;
};

export function EditorialProjectHero({
	eyebrow = 'Selected work / Architecture',
	title = ['A house shaped', 'by weather.'],
	description = 'A quiet coastal residence arranged around the movement of wind, salt, and afternoon light.',
	location = 'Costa Vicentina, PT',
	year = '2026',
	imageSrc,
	imageAlt,
	projectHref = '#project',
	actionLabel = 'View the case study'
}: EditorialProjectHeroProps) {
	return (
		<section className="bc-editorial-hero" aria-labelledby="editorial-project-title">
			<div className="bc-editorial-hero__copy">
				<p className="bc-editorial-hero__eyebrow">{eyebrow}</p>
				<h1 id="editorial-project-title">
					<LineReveal lines={title} duration={840} delay={120} />
				</h1>
				<div className="bc-editorial-hero__summary">
					<p>{description}</p>
					<dl>
						<div>
							<dt>Place</dt>
							<dd>{location}</dd>
						</div>
						<div>
							<dt>Year</dt>
							<dd>{year}</dd>
						</div>
					</dl>
				</div>
				<EdgeTrace className="bc-editorial-hero__action" radius={0} duration={1.35}>
					<a href={projectHref}>
						<span>{actionLabel}</span>
						<span aria-hidden="true">↗</span>
					</a>
				</EdgeTrace>
			</div>

			<div className="bc-editorial-hero__media">
				<MediaShutter
					href={projectHref}
					src={imageSrc}
					alt={imageAlt}
					label="Open project / 01"
					panes={9}
				/>
				<span className="bc-editorial-hero__figure" aria-hidden="true">
					01 — 04
				</span>
			</div>
		</section>
	);
}
