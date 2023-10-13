<script lang="ts">
	export let shadow: { style: string };
	export let index: number;

	let text = index.toString();

	function copyToClipboard(string: string) {
		navigator.clipboard.writeText(string);
		text = 'Copied';
		setTimeout(() => {
			text = index.toString();
		}, 1000);
	}
</script>

<div
	class="flex flex-150 h-150 justify-center items-center text-gray-400 font-light rounded-md cursor-pointer"
	style={shadow.style}
	on:click={() => copyToClipboard(shadow.style)}
	on:keydown={(event) => {
		if (event.key === 'Enter' || event.key === ' ') {
			copyToClipboard(shadow.style);
		}
	}}
	role="button"
	tabindex="0"
	aria-label="Copy to clipboard"
	aria-roledescription="button"
>
	Shadow {text}
</div>
