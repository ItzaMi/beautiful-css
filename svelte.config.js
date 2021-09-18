import adapter from '@sveltejs/adapter-netlify';

// https://kit.svelte.dev/docs#adapters

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: adapter()
	}
};

export default config;
