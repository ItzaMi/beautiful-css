# Beautiful CSS — Collection roadmap

The first credible release should feel like a visual component library, not a polished demo of a
small effect set. A useful target is 24 distinct components and six composed blocks. The count is a
coverage target, not permission to ship cosmetic variants.

## What the collection must cover

| Family                       | Existing                                                                 | Next candidates                              | Product job                                                                            |
| ---------------------------- | ------------------------------------------------------------------------ | -------------------------------------------- | -------------------------------------------------------------------------------------- |
| Type and editorial motion    | Line Reveal, Word Cascade, Character Shift, Counter Roll, Signal Marquee | Reading Marker                               | Reveal hierarchy, change values, and guide reading without replacing text semantics.   |
| Media transitions            | Media Shutter, Crop Shift                                                | Filmstrip Progress, Image Veil               | Make project imagery feel responsive while preserving native image and link behavior.  |
| Spatial and pointer response | Cursor Field, Focus Beam, Proximity Grid                                 | Cursor Lens, Magnetic Cluster, Trail Echo    | Add depth and response without making meaning depend on a pointer.                     |
| Surfaces and state           | Edge Trace                                                               | Progress Sweep, Status Wash, Loading Measure | Communicate focus, progress, loading, and state changes on arbitrary consumer content. |
| Layout and scroll            | Section Signal                                                           | Masked Stack, Sticky Relay                   | Maintain continuity as content enters, changes, or advances through a page.            |

## Next build wave

These eight components fill real gaps before the collection expands into more experimental work:

1. **Word Cascade** — stagger words while preserving natural wrapping and a readable static state.
2. **Counter Roll** — animate changing numbers and units without layout shift or duplicate speech.
3. **Reading Marker** — a restrained underline or side rule tied to focus and reading position.
4. **Crop Shift** — change image framing on focus or pointer movement with a deliberate touch state.
5. **Filmstrip Progress** — connect media browsing to an explicit, accessible progress value.
6. **Progress Sweep** — decorate a consumer-owned determinate progress primitive.
7. **Masked Stack** — transition between same-sized content panels without owning tabs or routing.
8. **Section Signal** — expose scroll progress as CSS properties for headings, rails, or backgrounds.

The first four should be built and validated before starting the second four. That gives the next
review enough range to judge the library rather than one animation family.

## Block expansion

Blocks prove that components remain useful in real compositions. The next four should exercise
different content structures:

- Editorial case-study opener
- Media-led project grid
- Long-form article opener and reading rail
- Product release feature sequence

Each block must compose existing components and native or consumer-owned primitives. A block should
not introduce a private component that only works inside that block.

## Admission rules

A new component enters the public collection only when it:

- solves a use case not already covered by changing an existing component's props;
- preserves complete text and media at 320px, 390px, 430px, and desktop widths;
- defines pointer, keyboard, touch, and reduced-motion behavior before visual polish;
- exposes a small API and remains removable from consumer markup;
- has type-metric, long-content, interaction-exit, and composition evidence where relevant;
- installs and compiles from the same source rendered by the library.

## Immediate sequence

1. ✓ Finish the typography-mask and Media Shutter repair pass.
2. ✓ Build Word Cascade and Counter Roll as the next text/state pair.
3. ✓ Build Crop Shift and Section Signal as the next media/layout pair.
4. Compose those four into two new blocks.
5. Review the 12-component, four-block collection before choosing the next wave.

The optional shadcn-compatible registry can be replaced later without changing these component
contracts. Source files and their validation scenarios remain the durable product boundary.
