'use client';

import { useEffect, useMemo, useRef, type HTMLAttributes, type PointerEvent } from 'react';
import type { CustomProperties } from '../types';
import './proximity-grid.css';

export type ProximityGridProps = HTMLAttributes<HTMLDivElement> & {
	columns?: number;
	rows?: number;
	color?: string;
	reach?: number;
};

export function ProximityGrid({
	columns = 11,
	rows = 7,
	color = '#405cff',
	reach = 170,
	className = '',
	style,
	onPointerMove,
	onPointerLeave,
	...props
}: ProximityGridProps) {
	const hostRef = useRef<HTMLDivElement>(null);
	const cellRefs = useRef<Array<HTMLElement | null>>([]);
	const frameRef = useRef<number | null>(null);
	const pendingPointer = useRef({ x: 0, y: 0 });
	const safeColumns = Math.max(1, Math.min(24, Math.round(columns)));
	const safeRows = Math.max(1, Math.min(18, Math.round(rows)));
	const safeReach = Math.max(1, reach);
	const cells = useMemo(
		() =>
			Array.from({ length: safeColumns * safeRows }, (_, index) => ({
				index,
				column: index % safeColumns,
				row: Math.floor(index / safeColumns)
			})),
		[safeColumns, safeRows]
	);
	const gridStyle: CustomProperties = {
		'--grid-columns': safeColumns,
		'--grid-rows': safeRows,
		'--grid-color': color,
		...style
	};

	useEffect(
		() => () => {
			if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
		},
		[]
	);

	function draw(clientX: number, clientY: number) {
		const host = hostRef.current;
		if (!host) return;
		const bounds = host.getBoundingClientRect();
		const pointerX = clientX - bounds.left;
		const pointerY = clientY - bounds.top;
		cells.forEach((cell, index) => {
			const cellX = ((cell.column + 0.5) / safeColumns) * bounds.width;
			const cellY = ((cell.row + 0.5) / safeRows) * bounds.height;
			const proximity = Math.max(
				0,
				Math.min(1, 1 - Math.hypot(pointerX - cellX, pointerY - cellY) / safeReach)
			);
			cellRefs.current[index]?.style.setProperty('--proximity', `${proximity}`);
		});
	}

	function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
		pendingPointer.current = { x: event.clientX, y: event.clientY };
		onPointerMove?.(event);
		if (frameRef.current !== null) return;
		frameRef.current = requestAnimationFrame(() => {
			draw(pendingPointer.current.x, pendingPointer.current.y);
			frameRef.current = null;
		});
	}

	function resetCells(event: PointerEvent<HTMLDivElement>) {
		if (frameRef.current !== null) {
			cancelAnimationFrame(frameRef.current);
			frameRef.current = null;
		}
		cellRefs.current.forEach((node) => node?.style.setProperty('--proximity', '0'));
		onPointerLeave?.(event);
	}

	return (
		<div
			{...props}
			ref={hostRef}
			className={`bc-proximity-grid ${className}`.trim()}
			style={gridStyle}
			onPointerMove={handlePointerMove}
			onPointerLeave={resetCells}
			aria-hidden="true"
		>
			{cells.map((cell, index) => (
				<i
					ref={(node) => {
						cellRefs.current[index] = node;
					}}
					style={
						{
							'--proximity': 0
						} as CustomProperties
					}
					key={cell.index}
				/>
			))}
		</div>
	);
}
