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
	onPointerMove,
	onPointerLeave,
	onFocus,
	onBlur,
	...props
}: FocusBeamProps) {
	const hostRef = useRef<HTMLDivElement>(null);
	const frameRef = useRef<number | null>(null);
	const pendingPointer = useRef({ x: 0, y: 0 });
	const pointerEngaged = useRef(false);
	const focusEngaged = useRef(false);
	const focusedElement = useRef<HTMLElement | null>(null);
	const safeRadius = Math.max(1, radius);
	const safeIntensity = Math.max(0, Math.min(1, intensity));
	const beamStyle: CustomProperties = {
		'--beam-color': color,
		'--beam-radius': `${safeRadius}px`,
		'--beam-diameter': `${safeRadius * 2}px`,
		'--beam-core-radius': `${Math.max(24, safeRadius * 0.24)}px`,
		'--beam-intensity': `${safeIntensity * 100}%`,
		'--beam-core-intensity': `${Math.min(100, safeIntensity * 145)}%`,
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
		onPointerMove?.(event);
		if (frameRef.current !== null) return;
		frameRef.current = requestAnimationFrame(() => {
			setPosition(pendingPointer.current.x, pendingPointer.current.y);
			frameRef.current = null;
		});
	}

	function handleFocus(event: FocusEvent<HTMLDivElement>) {
		const host = hostRef.current;
		if (host && event.target instanceof HTMLElement) {
			const targetBounds = event.target.getBoundingClientRect();
			setPosition(
				targetBounds.left + targetBounds.width / 2,
				targetBounds.top + targetBounds.height / 2
			);
			focusedElement.current = event.target;
			focusEngaged.current = true;
			syncEngagement();
		}
		onFocus?.(event);
	}

	function handleBlur(event: FocusEvent<HTMLDivElement>) {
		if (!(event.relatedTarget instanceof Node && hostRef.current?.contains(event.relatedTarget))) {
			focusedElement.current = null;
			focusEngaged.current = false;
			syncEngagement();
		}
		onBlur?.(event);
	}

	function handlePointerLeave(event: PointerEvent<HTMLDivElement>) {
		if (frameRef.current !== null) {
			cancelAnimationFrame(frameRef.current);
			frameRef.current = null;
		}
		pointerEngaged.current = false;
		const focused = focusedElement.current;
		if (focusEngaged.current && focused) {
			const targetBounds = focused.getBoundingClientRect();
			setPosition(
				targetBounds.left + targetBounds.width / 2,
				targetBounds.top + targetBounds.height / 2
			);
		}
		syncEngagement();
		onPointerLeave?.(event);
	}

	return (
		<div
			{...props}
			ref={hostRef}
			className={`bc-focus-beam ${className}`.trim()}
			style={beamStyle}
			data-engaged="false"
			onPointerMove={handlePointerMove}
			onPointerLeave={handlePointerLeave}
			onFocus={handleFocus}
			onBlur={handleBlur}
		>
			<div className="bc-focus-beam__field" aria-hidden="true" />
			<div className="bc-focus-beam__content">{children}</div>
		</div>
	);
}
