import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './tests/behavior',
	fullyParallel: true,
	forbidOnly: Boolean(process.env.CI),
	retries: process.env.CI ? 1 : 0,
	reporter: [['list'], ['html', { open: 'never', outputFolder: 'behavior-report' }]],
	outputDir: 'test-results/behavior',
	use: {
		baseURL: 'http://127.0.0.1:3103',
		colorScheme: 'light',
		trace: 'retain-on-failure'
	},
	projects: [
		{ name: 'chromium', use: { ...devices['Desktop Chrome'] } },
		{ name: 'firefox', use: { ...devices['Desktop Firefox'] } },
		{ name: 'webkit', use: { ...devices['Desktop Safari'] } }
	],
	webServer: {
		command: 'yarn build && yarn start --hostname 127.0.0.1 --port 3103',
		url: 'http://127.0.0.1:3103',
		reuseExistingServer: false,
		timeout: 120_000,
		stdout: 'ignore',
		stderr: 'pipe'
	}
});
