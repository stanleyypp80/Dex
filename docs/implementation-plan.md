# Dex website implementation plan

Approved direction: the cinematic mockup shown in this conversation. The user has explicitly asked to continue building, connect GitHub, and publish with the supplied video.

## Design and scope

A standalone responsive promotional page for Dex, DTS Engineering Expert, who works live inside Siemens NX CAD and CAM. Midnight navy, electric blue, cyan, white and restrained red; original supplied mascot; animated technical orbit scene; accessible controls and reduced-motion support. No invented performance, pricing, security, customer or compatibility claims. CTA links to the verified DTS contact page.

## Implementation

- [x] Create static HTML, CSS, JS and local original artwork in `dist/`. Hero, video showcase, interaction-state introduction, DTS section and FAQ.
- [x] Convert source HEVC to H.264/AAC with fast-start metadata and a 10-second-frame poster; preserve the full 124.436s duration and original source. Native browser playback/seek checks remain pending.
- [ ] Verify local asset references, JavaScript syntax, desktop and mobile layout, navigation, motion preference, video controls, and keyboard behavior. Use browser checks instead of implementation-mirroring unit tests for this presentation page.
- [ ] Prepare a GitHub Pages workflow and source documentation. Obtain the user's repository destination and authenticated GitHub connection; publish only website files, not the NX application source.
- [ ] Verify deployment and return the actual deployed URL and repository link. If GitHub remains disconnected, retain the complete build and preview and clearly identify this remaining dependency.

## Files and review focus

`dist/index.html`: semantic page and native video player; `dist/styles.css`: responsive visual design; `dist/app.js`: menu, canvas orbit effects and reveal behavior; `scripts/serve.mjs`: local static preview including byte-range video requests; `.github/workflows/pages.yml`: deployment of only `dist/`; `README.md`: editing, preview and publication.

Review: relative asset paths under repository subdirectories; large video streaming/seek; keyboard and focus behavior; narrow mobile widths; reduced motion. GitHub destination is pending user response. No secrets in repository or browser source.


## Verification record
2026-10-07: JavaScript syntax checks passed. 27 references checked with no broken local files/anchors or duplicate IDs. Video verified H.264/AAC, progressive streaming metadata, 124.436 seconds, 13.23 MiB. Original image copied byte-for-byte. Local server escalation was declined; file URL browser preview is not supported. Browser layout/playback checks therefore remain unverified. GitHub plugin connection and repository destination are pending. No repository or site has been published.
