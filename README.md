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

Read [PRODUCT_DIRECTION.md](./PRODUCT_DIRECTION.md) for the product boundary, free/Pro model, and
component quality bar.

React is the first supported implementation. Each item keeps its visual behaviour in colocated CSS
so that future framework adapters can share the effect without pretending untested compatibility.

## Develop locally

```bash
yarn install
yarn dev
```

Then open `http://localhost:3000`.

## Distribution

`registry.json` makes the repository a shadcn-compatible GitHub source registry. The same component
and CSS files are rendered in the catalogue and included in registry items, so there is no generated
distribution copy to drift.

After the repository is public, an item can be installed with:

```bash
npx shadcn@latest add ItzaMi/beautiful-css/line-reveal
```

Complete source remains copyable from the catalogue without the CLI.

## Visual validation

Every registered component is rendered through an isolated `/preview/component/[id]` route.
Playwright compares desktop, mobile/touch, reduced-motion, and interaction screenshots.

```bash
yarn test:visual
yarn test:visual:update  # intentionally accept reviewed changes
yarn test:visual:report  # inspect failures and image diffs
yarn test:motion         # generate a review report with timed interaction frames
```

Blocks use the same harness. Add a focused preview to `src/blocks/preview-registry.tsx`, then register
its id in `src/data/visual-cases.ts`; it enters the same viewport matrix. Baselines are
platform-specific and should be updated in the same environment used for review.

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

The React catalogue and source registry are currently local. They have not been deployed.
