'use client';

import { useEffect, useMemo, useRef, type HTMLAttributes, type PointerEvent } from 'react';
import type { CustomProperties } from '../types';
import './cursor-field.css';

export type CursorFieldProps = HTMLAttributes<HTMLDivElement> & {
	count?: number;
	color?: string;
	strength?: number;
};

function radicalInverse(value: number, base: number) {
	let result = 0;
	let fraction = 1 / base;
	while (value > 0) {
		result += fraction * (value % base);
		value = Math.floor(value / base);
		fraction /= base;
	}
	return result;
}

function createPoints(total: number) {
	return Array.from({ length: total }, (_, index) => {
		const horizontal = radicalInverse(index + 1, 2);
		const vertical = radicalInverse(index + 1, 3);
		return {
			x: 6 + horizontal * 88,
			y: 7 + vertical * 86,
			size: 2 + ((index * 7) % 4)
		};
	});
}

export function CursorField({
	count = 46,
	color = '#8fa1ff',
	strength = 1,
	className = '',
	style,
	onPointerMove,
	onPointerLeave,
	...props
}: CursorFieldProps) {
	const hostRef = useRef<HTMLDivElement>(null);
	const pointRefs = useRef<Array<HTMLElement | null>>([]);
	const frameRef = useRef<number | null>(null);
	const pendingPointer = useRef({ x: 0, y: 0 });
	const safeCount = Math.max(1, Math.min(120, Math.round(count)));
	const safeStrength = Math.max(0, Math.min(2, strength));
	const points = useMemo(() => createPoints(safeCount), [safeCount]);
	const fieldStyle: CustomProperties = {
		'--field-color': color,
		'--halo-rest-opacity': 0.18 + safeStrength * 0.06,
		'--halo-active-opacity': 0.38 + safeStrength * 0.16,
		'--pointer-x': '64%',
		'--pointer-y': '40%',
		...style
	};

	useEffect(
		() => () => {
			if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
		},
		[]
	);

	function drawPointer(clientX: number, clientY: number) {
		const host = hostRef.current;
		if (!host) return;
		const bounds = host.getBoundingClientRect();
		const pointerX = ((clientX - bounds.left) / bounds.width) * 100;
		const pointerY = ((clientY - bounds.top) / bounds.height) * 100;
		host.style.setProperty('--pointer-x', `${pointerX}%`);
		host.style.setProperty('--pointer-y', `${pointerY}%`);
		host.dataset.active = 'true';

		points.forEach((point, index) => {
			const deltaX = pointerX - point.x;
			const deltaY = pointerY - point.y;
			const distance = Math.hypot(deltaX * 0.78, deltaY);
			const proximity = Math.max(0, Math.min(1, 1 - distance / 25));
			const node = pointRefs.current[index];
			if (!node) return;
			node.style.setProperty(
				'--point-signal',
				`${Math.min(1, (0.1 + proximity * 0.82) * safeStrength)}`
			);
			node.style.setProperty('--point-glow', `${20 + proximity * 72}%`);
			node.style.setProperty('--point-scale', `${0.82 + proximity * 0.8}`);
			node.style.setProperty('--point-shift-x', `${deltaX * proximity * 0.08}px`);
			node.style.setProperty('--point-shift-y', `${deltaY * proximity * 0.08}px`);
		});
	}

	function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
		pendingPointer.current = { x: event.clientX, y: event.clientY };
		onPointerMove?.(event);
		if (frameRef.current !== null) return;
		frameRef.current = requestAnimationFrame(() => {
			drawPointer(pendingPointer.current.x, pendingPointer.current.y);
			frameRef.current = null;
		});
	}

	function handlePointerLeave(event: PointerEvent<HTMLDivElement>) {
		if (frameRef.current !== null) {
			cancelAnimationFrame(frameRef.current);
			frameRef.current = null;
		}
		if (hostRef.current) {
			hostRef.current.dataset.active = 'false';
			hostRef.current.style.setProperty('--pointer-x', '64%');
			hostRef.current.style.setProperty('--pointer-y', '40%');
		}
		pointRefs.current.forEach((node) => {
			node?.style.setProperty('--point-signal', `${Math.min(1, 0.1 * safeStrength)}`);
			node?.style.setProperty('--point-glow', '20%');
			node?.style.setProperty('--point-scale', '0.82');
			node?.style.setProperty('--point-shift-x', '0px');
			node?.style.setProperty('--point-shift-y', '0px');
		});
		onPointerLeave?.(event);
	}

	return (
		<div
			{...props}
			ref={hostRef}
			className={`bc-cursor-field ${className}`.trim()}
			style={fieldStyle}
			onPointerMove={handlePointerMove}
			onPointerLeave={handlePointerLeave}
			aria-hidden="true"
		>
			<div className="bc-cursor-field__halo" />
			{points.map((point, index) => (
				<i
					ref={(node) => {
						pointRefs.current[index] = node;
					}}
					style={
						{
							'--point-x': `${point.x}%`,
							'--point-y': `${point.y}%`,
							'--point-size': `${point.size}px`,
							'--point-signal': Math.min(1, 0.1 * safeStrength),
							'--point-glow': '20%',
							'--point-scale': 0.82,
							'--point-shift-x': '0px',
							'--point-shift-y': '0px'
						} as CustomProperties
					}
					key={index}
				/>
			))}
		</div>
	);
}
