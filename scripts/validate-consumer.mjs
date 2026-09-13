import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { access, mkdir, mkdtemp, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

const componentIds = [
	'line-reveal',
	'word-cascade',
	'character-shift',
	'counter-roll',
	'crop-shift',
	'signal-marquee',
	'cursor-field',
	'focus-beam',
	'proximity-grid',
	'media-shutter',
	'section-signal',
	'edge-trace'
];
const blockIds = ['editorial-project-hero', 'project-index'];
const registryIds = [...componentIds, ...blockIds];

const projectRoot = process.cwd();
const workspace = await mkdtemp(path.join(tmpdir(), 'beautiful-css-consumer-'));
const consumerRoot = path.join(workspace, 'consumer');
const registryOutput = path.join(workspace, 'registry');
const githubRefIndex = process.argv.indexOf('--github-ref');
const githubRef = githubRefIndex >= 0 ? process.argv[githubRefIndex + 1] : undefined;
let registryServer;

if (githubRefIndex >= 0 && !githubRef) {
	throw new Error('--github-ref requires a branch, tag, or commit.');
}

function run(command, args, cwd = projectRoot) {
	return new Promise((resolve, reject) => {
		const child = spawn(command, args, {
			cwd,
			env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
			stdio: 'inherit'
		});
		child.on('error', reject);
		child.on('exit', (code) => {
			if (code === 0) resolve();
			else reject(new Error(`${path.basename(command)} exited with code ${code}`));
		});
	});
}

async function writeProject() {
	const files = {
		'package.json': JSON.stringify(
			{
				name: 'beautiful-css-consumer-check',
				private: true,
				version: '0.0.0',
				type: 'module',
				dependencies: {
					next: '16.3.5',
					react: '19.3.0',
					'react-dom': '19.3.0'
				},
				devDependencies: { typescript: '5.9.3' }
			},
			null,
			2
		),
		'components.json': JSON.stringify(
			{
				$schema: 'https://ui.shadcn.com/schema.json',
				style: 'new-york',
				rsc: true,
				tsx: true,
				tailwind: {
					config: '',
					css: 'src/app/globals.css',
					baseColor: 'neutral',
					cssVariables: true,
					prefix: ''
				},
				iconLibrary: 'lucide',
				aliases: {
					blocks: '@/blocks',
					components: '@/components',
					ui: '@/components/ui',
					lib: '@/lib',
					utils: '@/lib/utils',
					hooks: '@/hooks'
				}
			},
			null,
			2
		),
		'tsconfig.json': JSON.stringify(
			{
				compilerOptions: {
					target: 'ES2017',
					lib: ['dom', 'dom.iterable', 'esnext'],
					strict: true,
					noEmit: true,
					esModuleInterop: true,
					module: 'esnext',
					moduleResolution: 'bundler',
					isolatedModules: true,
					jsx: 'react-jsx',
					plugins: [{ name: 'next' }],
					paths: { '@/*': ['./src/*'] }
				},
				include: ['next-env.d.ts', '.next/types/**/*.ts', '**/*.ts', '**/*.tsx'],
				exclude: ['node_modules']
			},
			null,
			2
		),
		'src/app/globals.css': `* { box-sizing: border-box; }\nbody { margin: 0; font-family: sans-serif; }\n.demo { position: relative; min-height: 16rem; }\n`,
		'src/app/layout.tsx': `import type { ReactNode } from 'react';\nimport './globals.css';\n\nexport default function Layout({ children }: { children: ReactNode }) {\n  return <html lang="en"><body>{children}</body></html>;\n}\n`,
		'src/app/page.tsx': `import { CharacterShift } from '@/components/beautiful/character-shift/character-shift';
import { CounterRoll } from '@/components/beautiful/counter-roll/counter-roll';
import { CropShift } from '@/components/beautiful/crop-shift/crop-shift';
import { CursorField } from '@/components/beautiful/cursor-field/cursor-field';
import { EdgeTrace } from '@/components/beautiful/edge-trace/edge-trace';
import { FocusBeam } from '@/components/beautiful/focus-beam/focus-beam';
import { LineReveal } from '@/components/beautiful/line-reveal/line-reveal';
import { MediaShutter } from '@/components/beautiful/media-shutter/media-shutter';
import { ProximityGrid } from '@/components/beautiful/proximity-grid/proximity-grid';
import { SectionSignal } from '@/components/beautiful/section-signal/section-signal';
import { SignalMarquee } from '@/components/beautiful/signal-marquee/signal-marquee';
import { WordCascade } from '@/components/beautiful/word-cascade/word-cascade';
import { EditorialProjectHero } from '@/blocks/editorial-project-hero/editorial-project-hero';
import { ProjectIndex } from '@/blocks/project-index/project-index';

export default function Page() {
  return <main>
    <LineReveal lines={['Installed source', 'Compiled cleanly']} />
    <WordCascade text="Installed words wrap naturally" />
    <CharacterShift href="#journal" text="Read journal" alternate="Open journal" />
    <CounterRoll value={1842} previousValue={0} />
    <div className="demo"><CropShift href="#crop" src="/sample.svg" alt="Sample geometry" /></div>
    <SignalMarquee items={['Editable', 'Portable', 'Tested']} />
    <div className="demo"><CursorField /></div>
    <FocusBeam><a href="#focus">Focus target</a></FocusBeam>
    <div className="demo"><ProximityGrid /></div>
    <div className="demo"><MediaShutter href="#media" src="/sample.svg" alt="Sample geometry" /></div>
    <SectionSignal progress={0.5}><p>Section content</p></SectionSignal>
    <EdgeTrace><a href="#edge">Edge target</a></EdgeTrace>
    <EditorialProjectHero imageSrc="/sample.svg" imageAlt="Sample geometry" />
    <ProjectIndex />
  </main>;
}
`,
		'public/sample.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 3"><rect width="4" height="3" fill="#405cff"/></svg>\n`
	};

	await Promise.all(
		Object.entries(files).map(async ([relativePath, content]) => {
			const outputPath = path.join(consumerRoot, relativePath);
			await mkdir(path.dirname(outputPath), { recursive: true });
			await writeFile(outputPath, content);
		})
	);
	await symlink(
		path.join(projectRoot, 'node_modules'),
		path.join(consumerRoot, 'node_modules'),
		'dir'
	);
}

async function serveRegistry() {
	registryServer = createServer(async (request, response) => {
		try {
			const item = path.basename(new URL(request.url, 'http://localhost').pathname);
			if (!item.endsWith('.json')) throw new Error('Not found');
			const content = await readFile(path.join(registryOutput, item));
			response.writeHead(200, { 'content-type': 'application/json' });
			response.end(content);
		} catch {
			response.writeHead(404);
			response.end('Not found');
		}
	});
	await new Promise((resolve) => registryServer.listen(0, '127.0.0.1', resolve));
	const address = registryServer.address();
	if (!address || typeof address === 'string') throw new Error('Could not start registry server');
	return `http://127.0.0.1:${address.port}`;
}

try {
	await writeProject();
	const shadcn = path.join(projectRoot, 'node_modules', '.bin', 'shadcn');
	let addresses;

	if (githubRef) {
		addresses = registryIds.map((id) => `ItzaMi/beautiful-css/${id}#${githubRef}`);
	} else {
		await run(shadcn, ['build', 'registry.json', '--output', registryOutput]);
		const registryUrl = await serveRegistry();
		addresses = registryIds.map((id) => `${registryUrl}/${id}.json`);
	}

	await run(shadcn, ['add', '--yes', '--overwrite', '--cwd', consumerRoot, ...addresses]);
	await Promise.all(
		componentIds.flatMap((id) => [
			access(path.join(consumerRoot, 'src', 'components', 'beautiful', id, `${id}.tsx`)),
			access(path.join(consumerRoot, 'src', 'components', 'beautiful', id, `${id}.css`))
		])
	);
	await access(path.join(consumerRoot, 'src', 'components', 'beautiful', 'types.ts'));
	await Promise.all(
		blockIds.flatMap((id) => [
			access(path.join(consumerRoot, 'src', 'blocks', id, `${id}.tsx`)),
			access(path.join(consumerRoot, 'src', 'blocks', id, `${id}.css`))
		])
	);

	await run(
		path.join(projectRoot, 'node_modules', '.bin', 'next'),
		['build', '--webpack'],
		consumerRoot
	);
	console.log(
		`\nConsumer validation passed for ${componentIds.length} components and ${blockIds.length} blocks (${githubRef ? `GitHub ref ${githubRef}` : 'local registry build'}).`
	);
} finally {
	if (registryServer) await new Promise((resolve) => registryServer.close(resolve));
	await rm(workspace, { recursive: true, force: true });
}
