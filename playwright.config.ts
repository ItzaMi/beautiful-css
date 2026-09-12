import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: './tests/visual',
	fullyParallel: true,
	forbidOnly: Boolean(process.env.CI),
	retries: process.env.CI ? 1 : 0,
	reporter: [['list'], ['html', { open: 'never' }]],
	expect: {
		toHaveScreenshot: {
			animations: 'disabled',
			maxDiffPixelRatio: 0.001
		}
	},
	use: {
		baseURL: 'http://127.0.0.1:3100',
		browserName: 'chromium',
		colorScheme: 'light',
		screenshot: 'only-on-failure',
		trace: 'retain-on-failure'
	},
	projects: [
		{
			name: 'desktop',
			use: { viewport: { width: 1280, height: 800 }, reducedMotion: 'no-preference' }
		},
		{
			name: 'mobile',
			use: {
				viewport: { width: 390, height: 844 },
				deviceScaleFactor: 1,
				hasTouch: true,
				isMobile: true,
				reducedMotion: 'no-preference'
			}
		},
		{
			name: 'reduced-motion',
			use: { viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' }
		}
	],
	webServer: {
		command: 'yarn build && yarn start --hostname 127.0.0.1 --port 3100',
		url: 'http://127.0.0.1:3100',
		reuseExistingServer: false,
		timeout: 120_000,
		stdout: 'ignore',
		stderr: 'pipe'
	}
});
