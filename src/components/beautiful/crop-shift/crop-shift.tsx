'use client';

import { useEffect, useRef, type AnchorHTMLAttributes, type PointerEvent } from 'react';
import type { CustomProperties } from '../types';
import './crop-shift.css';

export type CropShiftProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & {
	src: string;
	alt: string;
	focalX?: number;
	focalY?: number;
	range?: number;
	duration?: number;
	label?: string;
};

export function CropShift({
	src,
	alt,
	focalX = 50,
	focalY = 50,
	range = 14,
	duration = 680,
	label,
	className = '',
	style,
	onPointerMove,
	onPointerLeave,
	...props
}: CropShiftProps) {
	const hostRef = useRef<HTMLAnchorElement>(null);
	const frameRef = useRef<number | null>(null);
	const pendingPointer = useRef({ x: 0, y: 0 });
	const safeFocalX = Math.max(0, Math.min(100, focalX));
	const safeFocalY = Math.max(0, Math.min(100, focalY));
	const safeRange = Math.max(0, Math.min(50, range));
	const cropStyle: CustomProperties = {
		'--crop-rest-x': `${safeFocalX}%`,
		'--crop-rest-y': `${safeFocalY}%`,
		'--crop-x': `${safeFocalX}%`,
		'--crop-y': `${safeFocalY}%`,
		'--crop-duration': `${Math.max(0, duration)}ms`,
		...style
	};

	useEffect(
		() => () => {
			if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
		},
		[]
	);

	function updateCrop(clientX: number, clientY: number) {
		const host = hostRef.current;
		if (!host) return;
		const bounds = host.getBoundingClientRect();
		const x = (clientX - bounds.left) / bounds.width - 0.5;
		const y = (clientY - bounds.top) / bounds.height - 0.5;
		host.style.setProperty(
			'--crop-x',
			`${Math.max(0, Math.min(100, safeFocalX + x * safeRange * 2))}%`
		);
		host.style.setProperty(
			'--crop-y',
			`${Math.max(0, Math.min(100, safeFocalY + y * safeRange * 2))}%`
		);
	}

	function handlePointerMove(event: PointerEvent<HTMLAnchorElement>) {
		pendingPointer.current = { x: event.clientX, y: event.clientY };
		onPointerMove?.(event);
		if (frameRef.current !== null) return;
		frameRef.current = requestAnimationFrame(() => {
			updateCrop(pendingPointer.current.x, pendingPointer.current.y);
			frameRef.current = null;
		});
	}

	function handlePointerLeave(event: PointerEvent<HTMLAnchorElement>) {
		if (frameRef.current !== null) {
			cancelAnimationFrame(frameRef.current);
			frameRef.current = null;
		}
		const host = hostRef.current;
		host?.style.setProperty('--crop-x', `${safeFocalX}%`);
		host?.style.setProperty('--crop-y', `${safeFocalY}%`);
		onPointerLeave?.(event);
	}

	return (
		<a
			{...props}
			ref={hostRef}
			className={`bc-crop-shift ${className}`.trim()}
			style={cropStyle}
			onPointerMove={handlePointerMove}
			onPointerLeave={handlePointerLeave}
		>
			{/* Native image semantics remain intact in copied source. */}
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img src={src} alt={alt} />
			{label ? <span className="bc-crop-shift__label">{label}</span> : null}
		</a>
	);
}
