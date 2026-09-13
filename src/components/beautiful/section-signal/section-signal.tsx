'use client';

import { useEffect, useRef, type HTMLAttributes, type ReactNode } from 'react';
import type { CustomProperties } from '../types';
import './section-signal.css';

export type SectionSignalProps = HTMLAttributes<HTMLElement> & {
	children: ReactNode;
	progress?: number;
	rail?: 'start' | 'end';
};

function clampProgress(value: number) {
	return Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0));
}

export function SectionSignal({
	children,
	progress,
	rail = 'start',
	className = '',
	style,
	...props
}: SectionSignalProps) {
	const sectionRef = useRef<HTMLElement>(null);
	const frameRef = useRef<number | null>(null);
	const controlledProgress = progress === undefined ? undefined : clampProgress(progress);
	const signalStyle: CustomProperties = {
		'--section-progress': controlledProgress ?? 0,
		...style
	};

	useEffect(() => {
		const section = sectionRef.current;
		if (!section || controlledProgress !== undefined) return;

		function update() {
			if (!section) return;
			const bounds = section.getBoundingClientRect();
			const nextProgress = clampProgress(
				(window.innerHeight - bounds.top) / (window.innerHeight + bounds.height)
			);
			section.style.setProperty('--section-progress', `${nextProgress}`);
			section.dataset.state = nextProgress <= 0 ? 'before' : nextProgress >= 1 ? 'after' : 'active';
			frameRef.current = null;
		}

		function queueUpdate() {
			if (frameRef.current === null) frameRef.current = requestAnimationFrame(update);
		}

		update();
		window.addEventListener('scroll', queueUpdate, { passive: true });
		window.addEventListener('resize', queueUpdate);
		return () => {
			window.removeEventListener('scroll', queueUpdate);
			window.removeEventListener('resize', queueUpdate);
			if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
		};
	}, [controlledProgress]);

	const state =
		controlledProgress === undefined
			? 'before'
			: controlledProgress <= 0
				? 'before'
				: controlledProgress >= 1
					? 'after'
					: 'active';

	return (
		<section
			{...props}
			ref={sectionRef}
			className={`bc-section-signal is-${rail} ${className}`.trim()}
			style={signalStyle}
			data-state={state}
		>
			<span className="bc-section-signal__rail" aria-hidden="true">
				<i />
			</span>
			<div className="bc-section-signal__content">{children}</div>
		</section>
	);
}
