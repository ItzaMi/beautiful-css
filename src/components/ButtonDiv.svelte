<script>
	import { onMount } from 'svelte';

	export let button;
	export let index;

	let text = index;

	function copyToClipboard(string) {
		navigator.clipboard.writeText(string);
		text = 'Copied';
		setTimeout(() => {
			text = index;
		}, 1000);
	}

	onMount(() => {
		var css = `
            #button-${index} { ${button.style} }
            #button-${index}:hover { ${button.hoverStyle} }
            #button-${index}:before { ${button.beforeStyle} }
            #button-${index}:after { ${button.afterStyle} }
        `;
		var style = document.createElement('style');

		if (style.styleSheet) {
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}

		document.getElementsByTagName('head')[0].appendChild(style);
	});
</script>

<div
	id={`button-${index}`}
	class="flex flex-150 h-75 justify-center items-center text-gray-400 font-light rounded-md cursor-pointer"
	on:click={() => copyToClipboard(button.copy)}
>
	Button {text}
</div>
