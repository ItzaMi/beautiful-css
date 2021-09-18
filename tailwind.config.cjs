module.exports = {
	purge: [
		'./src/**/*.svelte',
		// may also want to include HTML files
		'./src/**/*.html'
	],
	theme: {
		extend: {
			colors: {
				'regal-blue': '#1f4d8f',
				'peaceful-white': '#fff'
			},
			flex: {
				150: '0 0 150px',
				300: '0 0 300px'
			},
			height: {
				150: '150px',
				'90vh': '90vh'
			},
			animation: {
				'pulse-slow': 'pulse 10s linear infinite'
			}
		}
	}
};
