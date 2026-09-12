import type { Metadata } from 'next';
import { Instrument_Sans } from 'next/font/google';
import Link from 'next/link';
import '../app.css';

const instrumentSans = Instrument_Sans({
	subsets: ['latin'],
	variable: '--font-interface',
	display: 'swap'
});

export const metadata: Metadata = {
	title: 'Beautiful CSS — Visual components with character',
	description:
		'Original React and CSS source components for expressive text, backgrounds, media, and surfaces.',
	robots: { index: false, follow: false }
};

function GithubIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path
				fill="currentColor"
				d="M12 .8a11.4 11.4 0 0 0-3.6 22.2c.6.1.8-.3.8-.6v-2.2c-3.4.7-4.1-1.4-4.1-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.4-5.5-6A4.7 4.7 0 0 1 6 8.2c-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.1 1.2a10.8 10.8 0 0 1 5.7 0C17 4.6 18 4.9 18 4.9c.6 1.7.2 3 .1 3.3a4.7 4.7 0 0 1 1.2 3.2c0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v2.8c0 .3.2.7.8.6A11.4 11.4 0 0 0 12 .8Z"
			/>
		</svg>
	);
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={instrumentSans.variable}>
			<body>
				<header className="site-header">
					<Link className="brand" href="/#top">
						Beautiful CSS
					</Link>
					<nav aria-label="Primary navigation">
						<Link href="/#collection">Components</Link>
						<Link href="/#principles">Principles</Link>
						<a href="https://github.com/ItzaMi/beautiful-css" target="_blank" rel="noreferrer">
							<span>GitHub</span>
							<GithubIcon />
						</a>
					</nav>
				</header>
				<main>{children}</main>
				<footer className="site-footer">
					<strong>Beautiful CSS</strong>
					<p>React source with portable CSS underneath.</p>
					<a href="#top">Back to top</a>
				</footer>
			</body>
		</html>
	);
}
