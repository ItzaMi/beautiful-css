import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: './tests/motion',
	fullyParallel: false,
	reporter: [['list'], ['html', { open: 'never', outputFolder: 'motion-report' }]],
	outputDir: 'test-results/motion',
	use: {
		baseURL: 'http://127.0.0.1:3102',
		browserName: 'chromium',
		colorScheme: 'light',
		viewport: { width: 1280, height: 800 },
		reducedMotion: 'no-preference',
		trace: 'retain-on-failure'
	},
	webServer: {
		command: 'yarn build && yarn start --hostname 127.0.0.1 --port 3102',
		url: 'http://127.0.0.1:3102',
		reuseExistingServer: false,
		timeout: 120_000,
		stdout: 'ignore',
		stderr: 'pipe'
	}
});
