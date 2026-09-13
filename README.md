# Beautiful CSS

Original React and CSS source components for the part of an interface people remember.

Beautiful CSS provides text treatments, backgrounds, pointer effects, media reveals, and decorative
surfaces. It does not replace accessible UI primitives: keep native HTML, Radix, shadcn/ui, or React
Aria underneath.

The current local collection includes:

- Line Reveal
- Character Shift
- Signal Marquee
- Cursor Field
- Focus Beam
- Proximity Grid
- Media Shutter
- Edge Trace

The first composed blocks are:

- Editorial Project Hero
- Project Index

Read [PRODUCT_DIRECTION.md](./PRODUCT_DIRECTION.md) for the product boundary, free/Pro model, and
component quality bar.

React is the first supported implementation. Each item keeps its visual behaviour in colocated CSS
so that future framework adapters can share the effect without pretending untested compatibility.

## Develop locally

```bash
yarn install
yarn playwright install chromium firefox webkit
yarn dev
```

Then open `http://localhost:3000`.

## Distribution

Each library entry exposes the exact React and CSS files that render its preview. Copying those
editable files is the primary distribution path, with no Beautiful CSS runtime package.

### Optional automated installation

`registry.json` also makes the repository compatible with the shadcn CLI. This is only a convenient
file copier: it installs the same source into the consumer's repository and does not require
shadcn-styled components. Because the catalogue and registry reference the same files, there is no
generated distribution copy to drift.

The current concept branch can be installed directly with:

```bash
npx shadcn@latest add ItzaMi/beautiful-css/line-reveal#concept/visual-component-library
```

The branch suffix can be removed after the registry reaches the default branch. Complete source
remains copyable from the catalogue without the CLI.

`yarn registry:consumer` builds the current registry, installs all eight components and both blocks
with the real shadcn CLI into a disposable Next app, verifies every delivered file, and compiles
that consumer. A GitHub ref can be checked with
`yarn registry:consumer --github-ref <branch-or-commit>`.

Blocks use the same address format:

```bash
npx shadcn@latest add ItzaMi/beautiful-css/editorial-project-hero#concept/visual-component-library
npx shadcn@latest add ItzaMi/beautiful-css/project-index#concept/visual-component-library
```

## Visual validation

Every registered component and block is rendered through an isolated `/preview/[kind]/[id]` route.
Playwright compares desktop, mobile/touch, reduced-motion, and meaningful interaction screenshots.

```bash
yarn test:visual
yarn test:visual:update  # intentionally accept reviewed changes
yarn test:visual:report  # inspect failures and image diffs
yarn test:motion         # generate a review report with timed interaction frames
yarn test:behavior       # semantic and interaction checks in Chromium, Firefox, and WebKit
yarn test:mobile         # touch layouts at 320px, 390px, and 430px
```

Add a focused block preview to `src/blocks/preview-registry.tsx`, then register its id in
`src/data/visual-cases.ts`; it enters the same viewport matrix. Baselines are platform-specific and
should be updated in the same environment used for review.

The motion report is deliberately separate from pixel-diff validation: stable snapshots guard final
states, while timed frames make easing, clipping, and intermediate interaction quality reviewable.

## Checks

```bash
yarn typecheck
yarn lint
yarn build
yarn registry:validate
yarn test:visual
```

## Project state

The React catalogue and source registry are developed on `concept/visual-component-library`. The
branch is deployed only as a Vercel preview until the work is explicitly approved for the default
branch.

## License and attribution

Beautiful CSS is available under the [MIT License](./LICENSE). Originality and third-party handling
are documented in [ATTRIBUTION.md](./ATTRIBUTION.md).
