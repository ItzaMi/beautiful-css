import type { HTMLAttributes, ReactNode } from 'react';
import type { CustomProperties } from '../types';
import './edge-trace.css';

export type EdgeTraceProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode;
	color?: string;
	width?: number;
	radius?: number;
	duration?: number;
	active?: boolean;
};

export function EdgeTrace({
	children,
	color = '#405cff',
	width = 1,
	radius = 2,
	duration = 4.5,
	active = false,
	className = '',
	style,
	...props
}: EdgeTraceProps) {
	const traceStyle: CustomProperties = {
		'--trace-color': color,
		'--trace-width': `${Math.max(0, width)}px`,
		'--trace-radius': `${Math.max(0, radius)}px`,
		'--trace-duration': `${Math.max(0.1, duration)}s`,
		...style
	};

	return (
		<div
			className={`bc-edge-trace ${active ? 'is-active' : ''} ${className}`.trim()}
			style={traceStyle}
			{...props}
		>
			<div className="bc-edge-trace__line" aria-hidden="true" />
			<div className="bc-edge-trace__content">{children}</div>
		</div>
	);
}
