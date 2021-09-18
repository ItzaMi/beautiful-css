<script>
	export let shadow;
	export let index;

	let text = index;

	function copyToClipboard(string) {
		navigator.clipboard.writeText(string);
		text = 'Copied';
		setTimeout(() => {
			text = index;
		}, 1000);
	}
</script>

<div
	class="flex flex-150 h-150 justify-center items-center text-gray-400 font-light rounded-md cursor-pointer"
	style={shadow.style}
	on:click={() => copyToClipboard(shadow.style)}
>
	Shadow {text}
</div>
