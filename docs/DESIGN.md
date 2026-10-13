# DESIGN.md — The Design System in Code

The taste contract for C2 Banking System. `docs/TECH-ARCHITECTURE.md` fixes the mechanics; this file fixes the
taste. Predevelopment mockups were waived (D-02): **the shipped Home page is the benchmark** every new page
measures against.

## 1. Binding rules

- [x] Approved copy (`docs/content/page-copy/`) and this file are the source of truth. Never invent colors,
      spacing values or copy outside them.
- [x] Drift rule: if a page disagrees with the benchmark, flag it in PROJECT-STATUS.md → Open decisions.
- [x] Code-wins tie-break: tokens in `src/app/globals.css` win; update this file in the same PR.
- [x] Locked facts (`docs/content/locked-facts.md`) are implemented verbatim.

## 2. Tokens (`src/app/globals.css` → `@theme`)

### Colors (from the supplied logo)

| Role                              | Token                                   | Hex               | Contrast note                                                                    |
| --------------------------------- | --------------------------------------- | ----------------- | -------------------------------------------------------------------------------- |
| Primary / brand                   | `--color-brand`                         | #0152FB           | White on brand 5.8:1 ✓ · gold on brand 3.2:1 → large text only                   |
| Brand hover                       | `--color-brand-600`                     | #0042CC           |                                                                                  |
| Brand tints                       | `--color-brand-50` / `-100`             | #EAF0FF / #D5E1FF | Surfaces only                                                                    |
| Accent (logo gold)                | `--color-gold`                          | #E6BC46           | **Never as text on white** (1.8:1). Ink on gold 10.0:1 ✓ · gold on navy 10.1:1 ✓ |
| Gold tint                         | `--color-gold-100`                      | #FBF1D3           | Notices                                                                          |
| Deep navy (dark sections, footer) | `--color-navy` / `-800`                 | #061433 / #0B1F4D |                                                                                  |
| Body text                         | `--color-ink`                           | #0B1530           | 16.7:1 on paper ✓                                                                |
| Secondary text                    | `--color-ink-2`                         | #4A5470           | 7.0:1 on paper ✓                                                                 |
| Muted text                        | `--color-muted`                         | #7C8599           | Non-essential labels only (3.4:1)                                                |
| Page background                   | `--color-paper`                         | #F4F6FB           |                                                                                  |
| Surface                           | `--color-surface`                       | #FFFFFF           |                                                                                  |
| Lines                             | `--color-line`                          | #E0E5EF           |                                                                                  |
| Positive / negative               | `--color-positive` / `--color-negative` | #0B7A52 / #B83232 | 5.4:1 / 5.9:1 on white; never color alone                                        |

Gold has one role: **the logo's slash** — eyebrow marks, the diagonal stripe motif, primary CTA on blue.

### Type

| Level        | Font                    | Size                         | Weight  | Notes                                                                                          |
| ------------ | ----------------------- | ---------------------------- | ------- | ---------------------------------------------------------------------------------------------- |
| Display / h1 | Archivo (wdth 112–118%) | clamp(2.5rem, 5.4vw, 4.6rem) | 800     | `tracking -0.035em`                                                                            |
| h2           | Archivo (wdth 112%)     | clamp(2rem, 4.4vw, 3.6rem)   | 800     | balance wrap                                                                                   |
| h3           | Archivo (wdth 110%)     | 1.25–1.5rem                  | 700     |                                                                                                |
| Body         | Figtree                 | 16–20px                      | 400–600 | line-height 1.6                                                                                |
| Eyebrow      | Figtree                 | 13px                         | 700     | uppercase, tracking 0.14em, gold slash mark; brand-blue text on light, white text on dark/blue |

Fonts are self-hosted via `@fontsource-variable` (no build-time network). One `<h1>` per page.

### Spacing and shape

| Token             | Value                    | Use                              |
| ----------------- | ------------------------ | -------------------------------- |
| `--space-section` | clamp(4.5rem, 9vw, 8rem) | Vertical rhythm between sections |
| `--radius-card`   | 1.5rem                   | Cards and tiles                  |
| Pill radius       | 999px                    | Buttons, chips                   |
| `--header-h`      | 72px                     | Sticky header height             |

## 3. Component register

| Component                                  | Code file                                                          | Notes                                                                |
| ------------------------------------------ | ------------------------------------------------------------------ | -------------------------------------------------------------------- |
| Logo (mark + site icon)                    | `src/components/brand/C2Logo.tsx`, `public/brand/*`                | Traced from supplied PNG                                             |
| Button / ButtonLink, Arrow, Eyebrow        | `src/components/ui/Button.tsx`                                     | Variants: primary, gold, ghost, ghostLight, dark                     |
| Icons                                      | `src/components/ui/icons.tsx`                                      | 24px stroke icons, `currentColor`                                    |
| Motion helpers                             | `src/components/ui/motion.tsx`                                     | Reveal, WordReveal, AnimatedNumber, Magnetic, EASE                   |
| Header (promo bar, mega menu, mobile menu) | `src/components/layout/Header.tsx`                                 | Locked chrome                                                        |
| Footer                                     | `src/components/layout/Footer.tsx`                                 | Locked chrome + concept disclaimer                                   |
| Browser-window mockup                      | `src/components/home/Hero.tsx` (`BrowserFrame`, `DashboardScreen`) | Online banking only — no phone/app mockups; reused on `/login`       |
| Help search + topic filter                 | `src/components/help/HelpCenter.tsx`                               | Client filter over `HELP.topics`; `layoutId` "help-topic-pill"       |
| Waitlist form                              | `src/components/forms/OpenAccountForm.tsx`                         | Two steps, honest states                                             |
| Inner-page hero                            | `src/components/shared/PageHero.tsx`                               | Blue band, word reveal, optional `visual` (rendered with `text-ink`) |
| Section heading                            | `src/components/shared/SectionHeading.tsx`                         | Eyebrow + word-reveal h2; pass a unique `id`                         |
| Plan cards + billing switch                | `src/components/shared/Blocks.tsx` (`PlanCards`)                   | Prices from `src/content/pricing.ts`                                 |
| Steps / card grid                          | `src/components/shared/Blocks.tsx` (`StepsRow`, `CardGrid`)        |                                                                      |
| Loan calculator                            | `src/components/shared/LoanCalculator.tsx`                         | `id` scopes the pill layoutId                                        |
| FAQ accordion                              | `src/components/shared/FaqList.tsx`                                | Unique `idPrefix` per list                                           |
| Closing CTA band                           | `src/components/shared/CtaBand.tsx`                                | Unique `id` per page                                                 |
| Feature mock panels                        | `src/components/home/Essentials.tsx` (`FeaturePanel`)              | payments, invoices, cards, accounting, support, savings              |
| Loan offer mock                            | `src/components/shared/OfferCard.tsx`                              | Figures match calculator defaults                                    |

## 4. Locked shell chrome

One shell: **Public**. Promo bar (dismissible per session) → sticky white header (hides on scroll-down, returns on
scroll-up) with a Tide-style mega menu (group intro · links with descriptions · featured blue card) → page →
navy footer with four link columns and the concept disclaimer. Identical on every page.

## 5. Motion rules — Kestrel register (D-03, supersedes the SOP default)

- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (`EASE`). Entrances 0.5–0.9s, travel 16–40px.
- Allowed (by D-03): word-by-word headline reveals, rotating hero line, springs on chips/cards, pointer parallax
  and 3D tilt (mouse pointers only), magnetic primary CTA, scroll-linked transforms (hero lift, final CTA growth;
  no pinned/scroll-jacked sections — "How it works" uses in-view step reveals and a drawn connector), animated counters, layout-animated pills.
- Signature motif: the logo's **40° slash** (gold + translucent white stripes) drawn in, drifting on scroll.
- **Every animation respects `prefers-reduced-motion`** via `MotionConfig reducedMotion="user"`.
- Never: auto-playing video, scroll-jacking that blocks reading, motion on body text.
- Gotcha: Motion's `transform` overrides Tailwind `skew-*` classes — on a `motion.*` element use `style={{ skewX }}`.

## 6. Accessibility checklist (WCAG AA)

- [x] Contrast per §2 table; gold never used as text on light backgrounds.
- [x] Visible gold focus ring on every interactive element; skip-to-content link.
- [x] Semantic landmarks, `lang="en"`, one h1 per page, section `aria-labelledby`.
- [x] Mega menu: `aria-expanded`, Escape closes; mobile menu is a modal dialog with scroll lock.
- [x] Form: labels, `aria-invalid`, `aria-describedby` error text, status/alert regions.
- [x] Tap targets ≥ 44px on mobile menu controls; no horizontal scroll at 320px+.
- [ ] Verify all of the above on the deployed Preview (QA-CHECKLIST Part 2).

## 7. Working rules

- Benchmark page: `/` (Home).
- Placeholder imagery: none — UI mockups are built in code (browser window, cards, panels).
- Reverted experiments: full-height gold stripe across the hero copy (too busy; now a short accent behind the hero visual). Phone mockup replaced by a browser window (owner: no apps).

## 8. Frontend craft

- **Visual thesis:** confident brand-blue banking that feels fast — the logo's gold slash is the motion signature.
- **Anti-generic rules:** tokens only; consistent pill/1.5rem shapes; designed hover/focus/active states;
  real copy only (no lorem).
- **Project anti-patterns:** no stock photos of people with laptops; no invented customer counts, ratings or
  reviews; no regulatory badges or deposit-protection claims; no gradient text; no gold text on white.
- **Visual QA evidence:** screenshots at 320 / 768 / 1440 for every touched page on the Preview.

## 9. Voice

Plain, confident, second person ("you", "your business"). Short sentences. Name what people do, not system
internals. Errors say what happened and how to fix it, without apologies.
