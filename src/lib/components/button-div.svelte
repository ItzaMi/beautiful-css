<script lang="ts">
	import { onMount } from 'svelte';

	export let button: {
		style: string;
		hoverStyle?: string;
		// beforeStyle: string;
		// afterStyle: string;
		copy: string;
	};
	export let index: number;

	let text = index.toString();

	function copyToClipboard(string: string) {
		navigator.clipboard.writeText(string);
		text = 'Copied';
		setTimeout(() => {
			text = index.toString();
		}, 1000);
	}

	onMount(() => {
		const css = `
            #button-${index} { ${button.style} }
            #button-${index}:hover { ${button.hoverStyle} }
        `;

		// #button-${index}:before { ${button.beforeStyle} }
		//     #button-${index}:after { ${button.afterStyle} }

		const styleElement = document.createElement('style');
		document.head.appendChild(styleElement);

		const styleSheet = styleElement.sheet;

		if (styleSheet) {
			css.split('}').forEach((rule) => {
				if (rule.trim()) {
					styleSheet.insertRule(`${rule}}`, styleSheet.cssRules.length);
				}
			});
		} else {
			console.error('Failed to load stylesheet');
		}
	});
</script>

<div
	id={`button-${index}`}
	class="flex flex-150 h-75 justify-center items-center text-gray-400 font-light rounded-md cursor-pointer"
	on:click={() => copyToClipboard(button.copy)}
	on:keydown={(event) => {
		if (event.key === 'Enter' || event.key === ' ') {
			copyToClipboard(button.copy);
		}
	}}
	role="button"
	tabindex="0"
	aria-label="Copy to clipboard"
	aria-roledescription="button"
>
	Button {text}
</div>
