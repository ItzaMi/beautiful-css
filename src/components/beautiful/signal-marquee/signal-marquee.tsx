import type { HTMLAttributes } from 'react';
import type { CustomProperties } from '../types';
import './signal-marquee.css';

export type SignalMarqueeProps = HTMLAttributes<HTMLDivElement> & {
	items?: string[];
	duration?: number;
	reverse?: boolean;
	paused?: boolean;
	pauseOnHover?: boolean;
};

export function SignalMarquee({
	items = ['Responsive', 'Accessible', 'Editable', 'Yours'],
	duration = 22,
	reverse = false,
	paused = false,
	pauseOnHover = true,
	className = '',
	style,
	...props
}: SignalMarqueeProps) {
	const motionStyle: CustomProperties = {
		'--marquee-duration': `${Math.max(1, duration)}s`,
		...style
	};

	return (
		<div
			className={[
				'bc-signal-marquee',
				reverse ? 'is-reversed' : '',
				paused ? 'is-paused' : '',
				pauseOnHover ? 'pauses-on-hover' : '',
				className
			]
				.filter(Boolean)
				.join(' ')}
			style={motionStyle}
			{...props}
		>
			<span className="bc-accessible-copy">{items.join(', ')}</span>
			<div className="bc-signal-marquee__track" aria-hidden="true">
				{[0, 1].map((group) => (
					<div className="bc-signal-marquee__group" key={group}>
						{items.map((item, index) => (
							<span key={`${index}-${item}`}>{item}</span>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
