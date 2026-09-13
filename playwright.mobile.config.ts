import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: './tests/mobile',
	fullyParallel: true,
	forbidOnly: Boolean(process.env.CI),
	retries: process.env.CI ? 1 : 0,
	reporter: [['list'], ['html', { open: 'never', outputFolder: 'mobile-report' }]],
	outputDir: 'test-results/mobile',
	expect: {
		toHaveScreenshot: {
			animations: 'disabled',
			maxDiffPixelRatio: 0.001
		}
	},
	use: {
		baseURL: 'http://127.0.0.1:3104',
		browserName: 'chromium',
		colorScheme: 'light',
		hasTouch: true,
		isMobile: true,
		reducedMotion: 'no-preference',
		screenshot: 'only-on-failure',
		trace: 'retain-on-failure'
	},
	projects: [
		{ name: 'mobile-320', use: { viewport: { width: 320, height: 720 } } },
		{ name: 'mobile-390', use: { viewport: { width: 390, height: 844 } } },
		{ name: 'mobile-430', use: { viewport: { width: 430, height: 932 } } }
	],
	webServer: {
		command: 'yarn build && yarn start --hostname 127.0.0.1 --port 3104',
		url: 'http://127.0.0.1:3104',
		reuseExistingServer: false,
		timeout: 120_000,
		stdout: 'ignore',
		stderr: 'pipe'
	}
});
