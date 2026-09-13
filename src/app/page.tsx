import { LineReveal } from '@/components/beautiful';
import { BlockCollection } from '@/components/catalogue/block-collection';

export default function HomePage() {
	return (
		<>
			<section className="hero" id="top">
				<div className="hero-content">
					<p>Beautiful CSS</p>
					<h1>
						<LineReveal
							lines={['Visual components', 'worth remembering.']}
							duration={820}
							delay={120}
						/>
					</h1>
					<div className="hero-bottom">
						<p>
							Editable React source for expressive text, backgrounds, pointer effects, media
							reveals, and surfaces. Keep the primitives you already trust.
						</p>
						<div className="hero-proof">
							<span>The heading is the component.</span>
							<a href="/library">Browse the library</a>
						</div>
					</div>
				</div>
			</section>

			<BlockCollection mode="showcase" />

			<section className="boundary" id="principles">
				<h2>Bring the primitives you trust.</h2>
				<p>
					Beautiful CSS is the visual layer above native HTML, Radix, React Aria, or the component
					system already inside your product.
				</p>
				<div>
					<span>Behaviour underneath</span>
					<strong>Your existing primitives</strong>
				</div>
				<div>
					<span>Expression above</span>
					<strong>Beautiful CSS</strong>
				</div>
			</section>
		</>
	);
}
