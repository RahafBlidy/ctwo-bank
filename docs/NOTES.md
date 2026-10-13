# NOTES.md — Project gotchas (running list)

Short, hard-won constraints for C2. Add new ones as they're discovered; never delete — strike through if obsolete.

1. **Owner terminal is Windows Command Prompt.** Give cmd-compatible commands only (`rmdir /s /q`, `set VAR=…`), never `rm -rf` / `export` / PowerShell syntax.
2. **Stage explicit paths** (`git add src/... docs/...`). `.gitignore` also ignores `*.zip` so delta zips extracted at the root can't be swept in.
3. **Motion overrides Tailwind `skew-*`** on `motion.*` elements (Motion writes `transform`). Use `style={{ skewX: -40 }}` there. Tailwind v4 `translate-*`/`rotate-*`/`scale-*` use separate CSS properties and do compose with Motion.
4. **Fonts are self-hosted via `@fontsource-variable`.** `next/font/google` fails in offline/CI-restricted builds. Archivo's width axis is in `wdth.css` (family "Archivo Variable"; use `font-stretch`).
5. **Gold (#E6BC46) is never text on white** (1.8:1). On brand blue it's 3.2:1 → large display text only. Light eyebrows are white.
6. **Waitlist form must not fake success.** With no `NEXT_PUBLIC_FORMSPREE_ENDPOINT`, submit is disabled with a notice. `NEXT_PUBLIC_*` values are baked in at build — redeploy after changing them.
7. **Next prefetches `<Link>` targets.** Until S0.2/S0.3 ship, unbuilt routes log 404s in the browser console. Expected; disappears when the routes exist.
8. **Headless screenshots:** wait for `load`, not `networkidle` (prefetch keeps the network busy).
9. **Uploads:** never include env files in docs/repo zips — a previous docs zip contained live keys from another project (owner confirmed they were old).
10. **Prettier reflows long JSX lines** after `pnpm format`; re-read a file before patching it with exact-string edits.
11. **Hero visuals inherit `text-white`.** Anything placed in `PageHero`'s `visual` slot is wrapped in `text-ink`; white cards inside blue sections must set their own text colour.
12. **Sticky table cells need an opaque background.** On `/pricing` the sticky first column uses `group-hover:bg-brand-50` so it matches its row on hover.
13. **Illustrative numbers must be computed, not typed.** The offer card's $1,152.47 equals `monthlyPayment(25000, 24, 9.9)`; keep them in sync if defaults change.
14. **`/features/[slug]` uses `dynamicParams = false`.** Adding a feature = adding an entry to `src/content/features.ts`; unknown slugs return the 404.
15. **No scroll-jacking.** The pinned horizontal "How it works" track was removed (owner: hard to use, last card cut off). Prefer in-view reveals over pinned/scroll-driven sections, and never let content depend on scroll position to be visible.
16. **No apps.** C2 is online banking only (owner). Never write "app", "tap", "phone wallet", "selfie" or show phone mockups; say "online" / "online banking" / "click". Only exception: the Help FAQ "Is there a mobile app?" (answer: no).
17. **`/login` has no credential fields.** It is an honest coming-soon page (noindex). Don't add a fake sign-in form.
18. **Screenshot QA:** wait ~3s (or scroll through) before capturing; entrance and in-view animations otherwise show half-faded elements.
19. **Hosting is Netlify (D-13).** Build settings live in `netlify.toml`; don't also set them in the Netlify UI. `NEXT_PUBLIC_*` env vars are set in Site configuration → Environment variables and need a redeploy to take effect.
