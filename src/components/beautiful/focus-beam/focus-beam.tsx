'use client';

import {
	useEffect,
	useRef,
	type FocusEvent,
	type HTMLAttributes,
	type PointerEvent,
	type ReactNode
} from 'react';
import type { CustomProperties } from '../types';
import './focus-beam.css';

export type FocusBeamProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode;
	color?: string;
	radius?: number;
	intensity?: number;
};

export function FocusBeam({
	children,
	color = '#405cff',
	radius = 260,
	intensity = 0.18,
	className = '',
	style,
	...props
}: FocusBeamProps) {
	const hostRef = useRef<HTMLDivElement>(null);
	const frameRef = useRef<number | null>(null);
	const pendingPointer = useRef({ x: 0, y: 0 });
	const pointerEngaged = useRef(false);
	const focusEngaged = useRef(false);
	const beamStyle: CustomProperties = {
		'--beam-color': color,
		'--beam-radius': `${Math.max(1, radius)}px`,
		'--beam-intensity': Math.max(0, Math.min(1, intensity)),
		'--beam-x': '50%',
		'--beam-y': '50%',
		...style
	};

	useEffect(
		() => () => {
			if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
		},
		[]
	);

	function syncEngagement() {
		if (hostRef.current) {
			hostRef.current.dataset.engaged = `${pointerEngaged.current || focusEngaged.current}`;
		}
	}

	function setPosition(clientX: number, clientY: number) {
		const host = hostRef.current;
		if (!host) return;
		const bounds = host.getBoundingClientRect();
		host.style.setProperty('--beam-x', `${((clientX - bounds.left) / bounds.width) * 100}%`);
		host.style.setProperty('--beam-y', `${((clientY - bounds.top) / bounds.height) * 100}%`);
	}

	function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
		pendingPointer.current = { x: event.clientX, y: event.clientY };
		pointerEngaged.current = true;
		syncEngagement();
		if (frameRef.current !== null) return;
		frameRef.current = requestAnimationFrame(() => {
			setPosition(pendingPointer.current.x, pendingPointer.current.y);
			frameRef.current = null;
		});
	}

	function handleFocus(event: FocusEvent<HTMLDivElement>) {
		const host = hostRef.current;
		if (!host || !(event.target instanceof HTMLElement)) return;
		const targetBounds = event.target.getBoundingClientRect();
		setPosition(
			targetBounds.left + targetBounds.width / 2,
			targetBounds.top + targetBounds.height / 2
		);
		focusEngaged.current = true;
		syncEngagement();
	}

	function handleBlur(event: FocusEvent<HTMLDivElement>) {
		if (event.relatedTarget instanceof Node && hostRef.current?.contains(event.relatedTarget))
			return;
		focusEngaged.current = false;
		syncEngagement();
	}

	return (
		<div
			ref={hostRef}
			className={`bc-focus-beam ${className}`.trim()}
			style={beamStyle}
			data-engaged="false"
			onPointerMove={handlePointerMove}
			onPointerLeave={() => {
				pointerEngaged.current = false;
				syncEngagement();
			}}
			onFocus={handleFocus}
			onBlur={handleBlur}
			{...props}
		>
			<div className="bc-focus-beam__field" aria-hidden="true" />
			<div className="bc-focus-beam__content">{children}</div>
		</div>
	);
}
