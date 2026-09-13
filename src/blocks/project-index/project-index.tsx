import { CharacterShift } from '@/components/beautiful/character-shift/character-shift';
import { FocusBeam } from '@/components/beautiful/focus-beam/focus-beam';
import './project-index.css';

export type ProjectIndexItem = {
	title: string;
	alternateTitle?: string;
	href: string;
	type: string;
	location: string;
	year: string;
};

export type ProjectIndexProps = {
	studio?: string;
	heading?: string;
	projects?: ProjectIndexItem[];
};

const defaultProjects: ProjectIndexItem[] = [
	{
		title: 'House of Tides',
		alternateTitle: 'Open project 01',
		href: '#house-of-tides',
		type: 'Residential',
		location: 'Aljezur, PT',
		year: '2026'
	},
	{
		title: 'Mora Workshop',
		alternateTitle: 'Open project 02',
		href: '#mora-workshop',
		type: 'Civic / Making',
		location: 'Mora, PT',
		year: '2025'
	},
	{
		title: 'Avenida Rooms',
		alternateTitle: 'Open project 03',
		href: '#avenida-rooms',
		type: 'Hospitality',
		location: 'Lisboa, PT',
		year: '2025'
	},
	{
		title: 'Stone Archive',
		alternateTitle: 'Open project 04',
		href: '#stone-archive',
		type: 'Research',
		location: 'Évora, PT',
		year: '2024'
	}
];

export function ProjectIndex({
	studio = 'Atelier Norte',
	heading = 'Selected index / 2024—26',
	projects = defaultProjects
}: ProjectIndexProps) {
	return (
		<section className="bc-project-index" aria-labelledby="project-index-heading">
			<header className="bc-project-index__header">
				<strong>{studio}</strong>
				<h2 id="project-index-heading">{heading}</h2>
				<span>{String(projects.length).padStart(2, '0')} works</span>
			</header>

			<FocusBeam className="bc-project-index__beam" color="#405cff" radius={300} intensity={0.24}>
				<ol className="bc-project-index__list">
					{projects.map((project, index) => (
						<li key={`${project.title}-${project.year}`}>
							<span className="bc-project-index__number">{String(index + 1).padStart(2, '0')}</span>
							<h3>
								<CharacterShift
									href={project.href}
									text={project.title}
									alternate={project.alternateTitle ?? `Open ${project.title}`}
									aria-label={`View ${project.title}`}
								/>
							</h3>
							<span>{project.type}</span>
							<span>{project.location}</span>
							<time>{project.year}</time>
						</li>
					))}
				</ol>
			</FocusBeam>

			<footer className="bc-project-index__footer">
				<span>Architecture and spatial practice</span>
				<a href="#contact">New commissions / hello@atelier.test</a>
			</footer>
		</section>
	);
}
