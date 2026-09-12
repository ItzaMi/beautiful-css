<script lang="ts">
	export let columns = 11;
	export let rows = 7;
	export let color = '#405cff';
	export let reach = 170;

	let host: HTMLDivElement;
	let pointerX = -1000;
	let pointerY = -1000;
	let width = 1;
	let height = 1;

	$: cells = Array.from({ length: columns * rows }, (_, index) => ({
		index,
		column: index % columns,
		row: Math.floor(index / columns)
	}));

	function updatePointer(event: PointerEvent) {
		const bounds = host.getBoundingClientRect();
		width = bounds.width;
		height = bounds.height;
		pointerX = event.clientX - bounds.left;
		pointerY = event.clientY - bounds.top;
	}

	function proximity(column: number, row: number) {
		const cellX = ((column + 0.5) / columns) * width;
		const cellY = ((row + 0.5) / rows) * height;
		const distance = Math.hypot(pointerX - cellX, pointerY - cellY);
		return Math.max(0, Math.min(1, 1 - distance / reach));
	}
</script>

<div
	class="proximity-grid"
	bind:this={host}
	style={`--grid-columns: ${columns}; --grid-rows: ${rows}; --grid-color: ${color}`}
	on:pointermove={updatePointer}
	on:pointerleave={() => {
		pointerX = -1000;
		pointerY = -1000;
	}}
	aria-hidden="true"
>
	{#each cells as cell}
		{@const amount = proximity(cell.column, cell.row)}
		<i style={`--proximity: ${amount}; --cell-delay: ${(cell.index * 19) % 260}ms`} />
	{/each}
</div>

<style>
	.proximity-grid {
		display: grid;
		width: 100%;
		height: 100%;
		grid-template-columns: repeat(var(--grid-columns), 1fr);
		grid-template-rows: repeat(var(--grid-rows), 1fr);
	}

	i {
		position: relative;
		border-right: 1px solid color-mix(in srgb, var(--grid-color) 16%, transparent);
		border-bottom: 1px solid color-mix(in srgb, var(--grid-color) 16%, transparent);
		background: color-mix(
			in srgb,
			var(--grid-color) calc((7% + var(--proximity) * 60%)),
			transparent
		);
		transform: scale(calc(0.82 + var(--proximity) * 0.18));
		transition: background 160ms ease, transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1);
		transition-delay: var(--cell-delay);
	}

	i::after {
		position: absolute;
		inset: 40%;
		background: var(--grid-color);
		border-radius: 50%;
		content: '';
		opacity: var(--proximity);
		transform: scale(calc(0.2 + var(--proximity)));
	}

	@media (prefers-reduced-motion: reduce) {
		i {
			transition: none;
		}
	}
</style>
