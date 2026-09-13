import type { HTMLAttributes } from 'react';
import type { CustomProperties } from '../types';
import './counter-roll.css';

export type CounterRollProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
	value?: number;
	previousValue?: number;
	locale?: string;
	minimumIntegerDigits?: number;
	fractionDigits?: number;
	prefix?: string;
	suffix?: string;
	duration?: number;
};

function formatCounter(
	value: number,
	locale: string,
	minimumIntegerDigits: number,
	fractionDigits: number,
	prefix: string,
	suffix: string
) {
	const safeValue = Number.isFinite(value) ? value : 0;
	const formatted = new Intl.NumberFormat(locale, {
		minimumIntegerDigits,
		minimumFractionDigits: fractionDigits,
		maximumFractionDigits: fractionDigits
	}).format(safeValue);

	return `${prefix}${formatted}${suffix}`;
}

export function CounterRoll({
	value = 0,
	previousValue,
	locale = 'en',
	minimumIntegerDigits = 1,
	fractionDigits = 0,
	prefix = '',
	suffix = '',
	duration = 620,
	className = '',
	style,
	...props
}: CounterRollProps) {
	const safeIntegerDigits = Math.max(1, Math.min(12, Math.round(minimumIntegerDigits)));
	const safeFractionDigits = Math.max(0, Math.min(6, Math.round(fractionDigits)));
	const formattedValue = formatCounter(
		value,
		locale,
		safeIntegerDigits,
		safeFractionDigits,
		prefix,
		suffix
	);
	const previousFormattedValue = formatCounter(
		previousValue ?? value,
		locale,
		safeIntegerDigits,
		safeFractionDigits,
		prefix,
		suffix
	);

	const previousCharacters = Array.from(previousFormattedValue);
	const currentCharacters = Array.from(formattedValue);
	const characterCount = Math.max(previousCharacters.length, currentCharacters.length);
	const previous = Array(characterCount - previousCharacters.length)
		.fill('\u2007')
		.concat(previousCharacters);
	const current = Array(characterCount - currentCharacters.length)
		.fill('\u2007')
		.concat(currentCharacters);
	const counterStyle: CustomProperties = {
		'--counter-duration': `${Math.max(0, duration)}ms`,
		'--counter-fit-size': `${180 / characterCount}cqi`,
		...style
	};

	return (
		<span className={`bc-counter-roll ${className}`.trim()} style={counterStyle} {...props}>
			<span className="bc-counter-roll__accessible" aria-live="polite" aria-atomic="true">
				{formattedValue}
			</span>
			<span className="bc-counter-roll__visual" aria-hidden="true" key={formattedValue}>
				{current.map((character, index) => {
					const previousCharacter = previous[index];
					const changed = previousCharacter !== character;
					return (
						<span
							className={`bc-counter-roll__character ${changed ? 'is-rolling' : 'is-static'}`}
							style={{ '--counter-index': index } as CustomProperties}
							key={`${index}-${character}`}
						>
							{changed ? <span className="is-previous">{previousCharacter}</span> : null}
							<span className="is-current">{character}</span>
						</span>
					);
				})}
			</span>
		</span>
	);
}
