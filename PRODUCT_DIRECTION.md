# Beautiful CSS — Product direction

## The product

Beautiful CSS is a curated library of original, polished, CSS-first visual components and
interaction effects.

Developers use it when the functional interface already exists but needs more character: a more
expressive heading, a responsive visual background, a richer hover state, a better transition, or
a memorable way to reveal content.

The product is the component source code. The website exists to render the exact files people
receive, explain their API, and let people copy or install them.

## Reference implementation and portability

React is the first supported implementation and the implementation exercised by the catalogue.
Beautiful CSS does not claim framework support that it does not test.

Portability comes from the component structure rather than a universal runtime abstraction:

- canonical visual behaviour stays in a colocated CSS file;
- framework-neutral geometry and pointer calculations stay in small TypeScript controllers when
  an effect needs JavaScript;
- the React file owns only markup, lifecycle integration, and the public prop contract;
- future Vue or Svelte adapters must render the same scenarios and pass the same visual and
  accessibility checks before being advertised.

A component is one removable visual behaviour. A block is a larger, framework-specific composition
built from components and the consumer's existing primitives. Blocks do not become a substitute UI
framework.

## The boundary

Beautiful CSS is a visual layer, not a primitive UI framework.

We do not build our own dialog, menu, tabs, popover, tooltip, select, combobox, or accessibility
primitive. Those problems are already handled well by native HTML and established libraries such
as Radix, shadcn/ui, Bits UI, and React Aria.

Our components can wrap, decorate, or animate those primitives without replacing their behaviour.
For example, Beautiful CSS may provide the animated surface inside a Radix dialog, but it does not
own focus trapping, dismissal, or keyboard navigation.

## What belongs in the library

- Text treatments and reveals
- Backgrounds and ambient visual systems
- Pointer and hover effects
- Media transitions
- Loading and progress treatments
- Layout transitions
- Decorative surfaces that accept arbitrary content
- Small interaction details that communicate state

Every component must be visually useful on its own, configurable through a small API, and easy to
remove. Effects should not take ownership of application data or navigation.

## What does not belong

- Reskinned buttons, cards, inputs, dialogs, tabs, or dropdowns
- A second implementation of an accessible primitive
- Generic dashboard and marketing templates assembled from familiar patterns
- Decorative motion with no relationship to content or interaction
- Components that only work inside the Beautiful CSS website
- Agent workflows presented as a reason to buy the library

## Product layers

### Free

Individual visual components with complete editable source, documentation, live controls,
responsive behaviour, and reduced-motion support.

### Pro

More technically involved effects, coordinated component families, page-scale compositions, and
production variants. Pro should represent more craft and implementation time, not an arbitrary
lock on basic functionality.

### Optional installation tools

Components are distributed first as readable, editable source through the catalogue. A
shadcn-compatible GitHub registry remains an optional delivery mechanism for developers who want a
command to copy the same files into their repository; it is not a Beautiful CSS runtime, a design
dependency, or the product's primary interface. Shared npm packages may be introduced later only
for controller logic that genuinely benefits from versioned reuse.

## Design position

Beautiful CSS should feel deliberate, modern, and sober. The catalogue stays quiet so the work can
be expressive.

- Use color to explain state or produce the effect, not to decorate the page.
- Prefer one clear visual idea over stacked treatments.
- Avoid nested decorative containers, gratuitous gradients, ornamental labels, and generic
  landing-page composition.
- Motion should reveal structure, maintain continuity, or answer an interaction.
- Every pointer interaction must have a keyboard or non-pointer equivalent when it affects meaning.
- Respect `prefers-reduced-motion` and preserve readable content without animation.

## Quality bar

A component is not ready because its demo looks interesting once.

It must:

1. expose a small, legible API;
2. work from 320px to wide desktop layouts;
3. preserve content and meaning with motion disabled;
4. avoid unnecessary runtime dependencies;
5. clean up timers, listeners, and animation frames;
6. remain compatible with existing UI primitives;
7. include a realistic usage example;
8. be tested in the actual catalogue, not represented by a fake preview;
9. install and compile in a clean consumer through the real distribution path;
10. preserve semantics and interaction behavior in Chromium, Firefox, and WebKit.

Every component and block also has an isolated preview route. Playwright captures desktop,
mobile/touch, reduced-motion, and meaningful interaction states. Baseline changes are reviewed as
product changes; green snapshots confirm consistency, not aesthetic quality by themselves.

Default-state snapshots are not enough for motion work. Content-stress and parameter-extreme cases
must prove responsive containment, interaction-exit cases must prove effects reset, and the separate
motion report must be reviewed for clipping, pacing, easing, and undesirable intermediate frames.

## Catalogue experience

The homepage is a showcase. It demonstrates the components inside complete visual situations and
keeps implementation documentation out of the main product story.

The separate library is a working surface, not a wall of thumbnails. Visitors choose one component
and experience it at a useful size, change real properties, try its keyboard behaviour, and inspect
the exact source without leaving the page. On small touch screens, the library uses a native picker
and explicit previous/next controls instead of reproducing a desktop tab rail.

The website should keep one component in focus at a time. It must not imply quality through mock
previews, decorative cards, or a large inventory count. The source shown in the catalogue is read
from the same files the registry distributes. The source and the interaction are the proof.

## Initial collection

The first collection establishes the intended range without rebuilding application primitives:

- Line Reveal — masked, staggered text entrance
- Character Shift — hover and focus letter transition
- Signal Marquee — continuous contextual text rail
- Cursor Field — pointer-responsive geometric field
- Focus Beam — a light treatment that follows focus or pointer position
- Proximity Grid — cells respond to the visitor's position
- Media Shutter — directional media reveal
- Edge Trace — a restrained animated perimeter for arbitrary content

The first component collection is now exercised through two composed block studies:

- Editorial Project Hero — Line Reveal, Media Shutter, and Edge Trace
- Project Index — Focus Beam and Character Shift

These blocks validate composition and source distribution without changing the product boundary.
Templates, agent integrations, and payment tiers remain later milestones.
