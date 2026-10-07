# Dex — DTS Engineering Expert

A responsive promotional website based on the approved cinematic Dex mockup. Original artwork and video supplied by Dream Technology System. The site is static: no build step, account system, analytics, API keys, or backend required.

## Preview

Run `node scripts/serve.mjs`, then open `http://127.0.0.1:4173`. The preview server supports byte-range video requests for seeking.

## Edit

- `dist/index.html`: copy, section structure, FAQs, links, video player.
- `dist/styles.css`: palette, layouts, responsive rules and motion.
- `dist/app.js`: accessible mobile menu, scroll reveals and lightweight particle animation.
- `dist/assets/dex.png`: original Dex artwork.
- `dist/assets/dex-introduction.mp4`: browser-compatible H.264/AAC copy, approximately 13.2 MiB, full duration 2:04 at 1080p. Original source remains at the user-supplied path.

The video loads metadata initially and has native playback, seeking, volume, fullscreen and download controls. No autoplay audio. Illustrative geometry on the page is labeled conceptual; it is not a claimed NX application screenshot. Product descriptions are based on the supplied DEX.md and DTS website. No unverified performance metrics or certifications are claimed.

## GitHub Pages

Push this folder to the selected GitHub repository with default branch `main`. In repository Settings → Pages, select **GitHub Actions** as the source. The included workflow publishes only `dist/`, including the web-compatible video. All local references are relative, so both repository subpaths and custom domains work. Subsequent pushes to `main` republish the page. A public GitHub repository makes its included website assets public, as does the published website.

## Accessibility and ownership

Semantic landmarks, skip link, visible keyboard focus, native disclosure and media controls, descriptive image alternative text, mobile menu Escape handling and `prefers-reduced-motion` are supported. The source video did not include a separate captions file; add reviewed WebVTT captions to the player if available.

Dex name, character and software belong to Dream Technology System Pte. Ltd. No license to reuse these brand assets is granted by this repository.

