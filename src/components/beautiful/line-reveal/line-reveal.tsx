import type { HTMLAttributes } from 'react';
import type { CustomProperties } from '../types';
import './line-reveal.css';

export type LineRevealProps = HTMLAttributes<HTMLSpanElement> & {
	lines?: string[];
	delay?: number;
	duration?: number;
	replayKey?: string | number;
};

export function LineReveal({
	lines = ['Made to move.', 'Built to belong.'],
	delay = 90,
	duration = 720,
	replayKey = 0,
	className = '',
	style,
	...props
}: LineRevealProps) {
	const motionStyle: CustomProperties = {
		'--line-delay': `${Math.max(0, delay)}ms`,
		'--line-duration': `${Math.max(0, duration)}ms`,
		...style
	};

	return (
		<span className={`bc-line-reveal ${className}`.trim()} style={motionStyle} {...props}>
			<span className="bc-accessible-copy">{lines.join(' ')}</span>
			<span key={replayKey} aria-hidden="true">
				{lines.map((line, index) => (
					<span className="bc-line-reveal__line" key={`${index}-${line}`}>
						<span style={{ '--line-index': index } as CustomProperties}>{line}</span>
					</span>
				))}
			</span>
		</span>
	);
}
