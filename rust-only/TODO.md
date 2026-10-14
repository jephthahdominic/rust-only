# TODO — things stubbed or assumed

Figma was **not readable**: the MCP connected, but the account has no access to
`Rust Only_Team` ("you don't have edit access to this file"). Everything below was built
from the written spec. Once access is granted, re-run against the frames named in the brief.

## Assets
- [x] **Images**: real Figma exports now live in `public/images/{artworks,rooms,spaces,objects,brand}`; `content/images.ts` maps each file (real pixel sizes) and every placeholder was removed. The original drop at `public/rust-only-assets/` is still there and is publicly served (15 MB duplicate); delete it once you're happy.
- [x] **Logo**: the real loop mark (`brand/rust-only-mark.png`) is used as a CSS mask so it takes `currentColor`. Mask is raster; swap for an SVG export for crisp large sizes (footer wordmark, wax seal).
- [ ] `rooms/work-detail-in-situ.png` has Figma UI text baked into it (title, nav). I don't use it. The work-detail hero instead composites the artwork into `rooms/space-frame-23x30.jpg`; the frame box (`FRAME` in `app/(focus)/works/[slug]/page.tsx`) is eyeballed, tune if it drifts. Artwork is letterboxed on a paper mat rather than cropped.
- [ ] Full-bleed heroes (room-panelled is 1000px wide, volume-hero 1000, sterling-house 1100) are soft above ~1200px; ask for higher-res originals.
- [ ] Work detail has one image per work, so the carousel shows a single slide (arrows/dots hide). Needs detail shots to be a real carousel.
- [ ] Home card 01 shows *Dance of the Greenshadows* (per README) but keeps the design's caption "Ancestral Gaze · Onuoha · 2025 · Volume 01". One of them is wrong.
- [ ] Unused exports: `volume-mosaic-0x` are used only dimmed in the Volume band; `harmony-of-souls`, `vogue-and-style-ii`, etc. only appear as works.
- [ ] **Memoir font**: not in `/public/fonts`; **Marcellus** stands in (`lib/fonts.ts`, swap to `next/font/local`).
- [ ] **Signature font**: name unknown; **Mrs Saint Delafield** placeholder (`lib/fonts.ts`). Needs 32px / 18px sizes applied once confirmed.
- [ ] Social icons are generic (Instagram / Facebook / X) with `href="#"`; confirm platforms + URLs (`content/site.ts`).
- [ ] Favicon / OG image.

## Copy (content/*.ts, all marked `TODO(copy)`)
- [ ] Manifesto letter: only the first paragraph follows the brief; middle paragraphs are stubs (`content/manifesto.ts`).
- [ ] Volume "It begins before we arrive." paragraphs: derived from the brief, not Figma (`content/volumes.ts`).
- [ ] Artist bios: Buraimoh written only from the facts in the brief (Osogbo School, bead painting, Smithsonian NMAfA); others say "Biography to come".
- [ ] **Chapter 4 artist**: the brief says "Ade Odunowo", but the Figma plate for Chapter 4 is Godspower's *Vogue and Style I*. I used Godspower; confirm. Given names for Onuoha, Godspower, Wewe, Marshal.
- [ ] Works: titles/artists now come from the manifest (18 works). Only The Keeper of Tradition (2012), Faces of the Ancestors (1994) and Dance of the Greenshadows (2008) have years; mediums/dimensions are blank ("—") except The Keeper of Tradition. Chapter grouping of the works (beyond the four chapter plates) is mine, not Figma's.
- [ ] Objects: the 4 Figma objects (vase tall/round, plate, box; Acrylic). No object detail pages.
- [ ] Spaces: Sterling House and Osborne Studio are real; the two residential entries ("Residence 03/04") have placeholder names and meta. No project detail pages.
- [ ] Newsletter legal paragraphs are placeholders.
- [ ] Footer Privacy Policy / Terms links go to `#`; no routes exist.
- [ ] Inquire link is a `mailto:hello@rustonly.com`; confirm the real flow.
- [ ] Manifesto paper colour `#ECE7DC` is a guess ("confirm in Figma"); also kraft/gold envelope colours (`--color-kraft`, `--color-gold` in `globals.css`).

## Design / behaviour assumptions
- Tailwind is v4 (what the scaffold ships): tokens live in `app/globals.css` (`@theme`), not `tailwind.config`.
- Home pinned scenes, chapter stack (CSS `position: sticky`), and the manifesto envelope are **approximations** of the described choreography; timings/offsets need a pass against Figma + `get_motion_context`.
- Loader window is the generic `home-hero` image; it only seamlessly "becomes" the hero on `/`.
- Mobile "AT REST → TRAVELLING" card scene is my interpretation (cards rise past pinned text).
- Chapters view = `/volume/the-gathering/chapters`; chapter detail = `/volume/the-gathering/chapters/[chapter]`.
- Modal + mobile menu use native `<dialog>.showModal()` (focus trap, Escape, focus return built in).
- Page transition: fade through `ground-sink` via a global link-click interceptor in `MotionProvider`.
- Work-detail "VIEW MORE" shows same-chapter works first.

## QA still open
- [ ] Check at 768 and 1024 against Figma (only 390 / 1440 / 1920 spot-checked).
- [x] Lighthouse (prod build, placeholders): perf 93–100, a11y 95–100 (the only misses are the styleguide's deliberate `ink-dim` sample), best-practices 100, SEO 100 (styleguide is `noindex`). Re-run once real images land.
- [ ] Light-mode `ink-dim` (`#491B0D @ 60%`) is ~3.9:1 on cream, below AA for small text; I used `ink-soft` where it mattered. Worth raising with design.
- [ ] Manifesto CLS ≈ 0.07 on desktop (envelope stage swaps in on hydrate).
- [ ] Real-device test of Lenis + pinned scenes on iOS Safari.

- [ ] Home on mobile scores 86–90 on first visit: the LCP element is the loader's "Only" text (re-painted on font swap). Other pages 92+.

## Loader (rebuilt to the Figma keyframes)
- Dev-only `?loader=A|B|C|D` freezes a keyframe for comparison against the frames (bypasses the session flag).
- Timing/easing are the recommended ones from the brief, not from Figma (the frames are static). Total is ~4.2s in dev.
- State A words are #F6EFE4 @10% per spec, which is far below contrast minimums. The words are `aria-hidden`; re-check Lighthouse/axe on a first visit since the overlay is on screen until it finishes.
- The % label is clamped on-screen, so at 100% it sits at left 1406 instead of Figma's 1423 (spec said to clamp).
- On routes other than `/` the loader fades out after D instead of opening onto the hero (those routes have a different hero).
- The loader's image layer is its own element (same file, cover crop and gradient as the Home hero), not the Home `<Image>` itself. Verified pixel-identical (max diff 1/255) at 1440×900, 390×844 and 1440×700.
- Reduced motion: shows A + counter, then a 300ms cross-fade.
