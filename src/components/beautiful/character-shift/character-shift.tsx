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
	duration = 320,
	className = '',
	style,
	'aria-label': ariaLabel,
	...props
}: CharacterShiftProps) {
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
			<span className="bc-character-shift__phrase is-source" aria-hidden="true">
				{text}
			</span>
			<span className="bc-character-shift__phrase is-target" aria-hidden="true">
				{alternate}
			</span>
		</a>
	);
}
