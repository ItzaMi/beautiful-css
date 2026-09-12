import type { AnchorHTMLAttributes } from 'react';
import type { CustomProperties } from '../types';
import './character-shift.css';

export type CharacterShiftProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
	text?: string;
	alternate?: string;
	duration?: number;
};

export function CharacterShift({
	text = 'Character shift',
	alternate = 'Beautiful motion',
	duration = 420,
	className = '',
	style,
	'aria-label': ariaLabel,
	...props
}: CharacterShiftProps) {
	const source = Array.from(text);
	const target = Array.from(alternate);
	const characters = Array.from({ length: Math.max(source.length, target.length) }, (_, index) => ({
		source: source[index] ?? ' ',
		target: target[index] ?? ' '
	}));
	const motionStyle: CustomProperties = {
		'--character-duration': `${Math.max(0, duration)}ms`,
		...style
	};

	return (
		<a
			className={`bc-character-shift ${className}`.trim()}
			style={motionStyle}
			aria-label={ariaLabel || text}
			{...props}
		>
			{characters.map((character, index) => (
				<span
					className="bc-character-shift__character"
					aria-hidden="true"
					style={{ '--character-index': index } as CustomProperties}
					key={`${index}-${character.source}-${character.target}`}
				>
					<span>{character.source === ' ' ? '\u00a0' : character.source}</span>
					<span>{character.target === ' ' ? '\u00a0' : character.target}</span>
				</span>
			))}
		</a>
	);
}
