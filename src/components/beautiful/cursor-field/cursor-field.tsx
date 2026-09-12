'use client';

import { useEffect, useMemo, useRef, type HTMLAttributes, type PointerEvent } from 'react';
import type { CustomProperties } from '../types';
import './cursor-field.css';

export type CursorFieldProps = HTMLAttributes<HTMLDivElement> & {
	count?: number;
	color?: string;
	strength?: number;
};

function createPoints(total: number) {
	return Array.from({ length: total }, (_, index) => {
		const column = index % 9;
		const row = Math.floor(index / 9);
		return {
			x: 8 + column * 10.5 + ((row * 7 + column * 3) % 5),
			y: 9 + row * 17 + ((column * 5 + row * 2) % 8),
			size: 2 + ((index * 7) % 5)
		};
	});
}

export function CursorField({
	count = 46,
	color = '#8fa1ff',
	strength = 1,
	className = '',
	style,
	...props
}: CursorFieldProps) {
	const hostRef = useRef<HTMLDivElement>(null);
	const pointRefs = useRef<Array<HTMLElement | null>>([]);
	const frameRef = useRef<number | null>(null);
	const pendingPointer = useRef({ x: 0, y: 0 });
	const safeCount = Math.max(1, Math.min(120, Math.round(count)));
	const points = useMemo(() => createPoints(safeCount), [safeCount]);
	const fieldStyle: CustomProperties = {
		'--field-color': color,
		'--field-strength': strength,
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
			const distance = Math.hypot((pointerX - point.x) * 0.78, pointerY - point.y);
			const proximity = Math.max(0, Math.min(1, 1 - distance / 25));
			const node = pointRefs.current[index];
			if (!node) return;
			node.style.setProperty(
				'--point-signal',
				`${Math.min(1, (0.14 + proximity * 0.72) * strength)}`
			);
			node.style.setProperty('--point-glow', `${24 + proximity * 60}%`);
			node.style.setProperty('--point-scale', `${0.86 + proximity * 0.72}`);
		});
	}

	function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
		pendingPointer.current = { x: event.clientX, y: event.clientY };
		if (frameRef.current !== null) return;
		frameRef.current = requestAnimationFrame(() => {
			drawPointer(pendingPointer.current.x, pendingPointer.current.y);
			frameRef.current = null;
		});
	}

	function handlePointerLeave() {
		if (hostRef.current) hostRef.current.dataset.active = 'false';
	}

	return (
		<div
			ref={hostRef}
			className={`bc-cursor-field ${className}`.trim()}
			style={fieldStyle}
			onPointerMove={handlePointerMove}
			onPointerLeave={handlePointerLeave}
			aria-hidden="true"
			{...props}
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
							'--point-signal': Math.min(1, 0.14 * strength),
							'--point-glow': '24%',
							'--point-scale': 0.86
						} as CustomProperties
					}
					key={index}
				/>
			))}
		</div>
	);
}
