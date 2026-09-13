import type { HTMLAttributes } from 'react';
import type { CustomProperties } from '../types';
import './word-cascade.css';

export type WordCascadeProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
	text?: string;
	delay?: number;
	duration?: number;
	replayKey?: string | number;
};

export function WordCascade({
	text = 'Words arrive with their rhythm intact.',
	delay = 55,
	duration = 560,
	replayKey = 0,
	className = '',
	style,
	'aria-label': ariaLabel,
	...props
}: WordCascadeProps) {
	const words = text.trim().split(/\s+/).filter(Boolean);
	const cascadeStyle: CustomProperties = {
		'--word-delay': `${Math.max(0, delay)}ms`,
		'--word-duration': `${Math.max(0, duration)}ms`,
		...style
	};

	return (
		<span
			className={`bc-word-cascade ${className}`.trim()}
			style={cascadeStyle}
			aria-label={ariaLabel}
			{...props}
		>
			<span className="bc-word-cascade__accessible">{ariaLabel || text}</span>
			<span className="bc-word-cascade__track" aria-hidden="true" key={replayKey}>
				{words.map((word, index) => (
					<span className="bc-word-cascade__unit" key={`${index}-${word}`}>
						<span style={{ '--word-index': index } as CustomProperties}>{word}</span>
						{index < words.length - 1 ? ' ' : null}
					</span>
				))}
			</span>
		</span>
	);
}
