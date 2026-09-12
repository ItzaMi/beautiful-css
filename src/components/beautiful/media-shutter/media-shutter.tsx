import type { AnchorHTMLAttributes } from 'react';
import type { CustomProperties } from '../types';
import './media-shutter.css';

export type MediaShutterProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & {
	src: string;
	alt: string;
	panes?: number;
	direction?: 'vertical' | 'horizontal';
	label?: string;
};

export function MediaShutter({
	src,
	alt,
	panes = 7,
	direction = 'vertical',
	label = 'Reveal image',
	className = '',
	style,
	...props
}: MediaShutterProps) {
	const safePanes = Math.max(1, Math.min(16, Math.round(panes)));
	const shutterStyle: CustomProperties = { '--shutter-panes': safePanes, ...style };

	return (
		<a
			className={`bc-media-shutter is-${direction} ${className}`.trim()}
			style={shutterStyle}
			{...props}
		>
			{/* The source component deliberately keeps native image semantics. */}
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img src={src} alt={alt} />
			<span className="bc-media-shutter__panes" aria-hidden="true">
				{Array.from({ length: safePanes }, (_, index) => (
					<i style={{ '--pane-index': index } as CustomProperties} key={index} />
				))}
			</span>
			<span className="bc-media-shutter__caption">{label}</span>
		</a>
	);
}
