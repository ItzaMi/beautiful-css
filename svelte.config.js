import node from '@sveltejs/adapter-node';

// https://kit.svelte.dev/docs#adapters

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: node()
	}
};

export default config;
