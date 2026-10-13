# C2 Banking System

Multi-page marketing website for **C2**, a digital business-banking concept: business accounts, payments,
invoicing, team cards and credit. Inspired by the spirit and navigation of tide.co, with rich motion.

> Concept project. C2 is not a bank and offers no regulated financial services.

## Stack

Next.js 15 (App Router) · TypeScript (strict) · Tailwind CSS v4 · Motion 12 · pnpm · Netlify.

## Run locally (Windows, Command Prompt)

```bat
pnpm install
pnpm dev
```

Open http://localhost:3000.

Optional: to switch on the waitlist form, create `.env.local` (never committed) from `.env.example` and set
`NEXT_PUBLIC_FORMSPREE_ENDPOINT`, then restart `pnpm dev`.

## Scripts

| Command             | What it does               |
| ------------------- | -------------------------- |
| `pnpm dev`          | Local dev server           |
| `pnpm typecheck`    | TypeScript strict check    |
| `pnpm lint`         | ESLint                     |
| `pnpm format`       | Prettier write             |
| `pnpm format:check` | Prettier check (CI)        |
| `pnpm build`        | Production build           |
| `pnpm start`        | Serve the production build |

Every PR runs the **Code Check** workflow (`.github/workflows/code-check.yml`).

## Deploy to Netlify

Settings live in `netlify.toml` (build `pnpm build`, publish `.next`, Node 22). Netlify detects Next.js and
applies its Next.js runtime automatically.

1. Push the repo to GitHub, then in Netlify: **Add new site → Import an existing project → GitHub** → pick the repo.
2. Netlify reads `netlify.toml`; leave the build settings as they are and click **Deploy**.
3. Optional, in **Site configuration → Environment variables**: `NEXT_PUBLIC_SITE_URL` (your Netlify URL) and
   `NEXT_PUBLIC_FORMSPREE_ENDPOINT` (switches the waitlist form on). Then **Deploys → Trigger deploy**.

## Project docs

Start with `docs/PROJECT-STATUS.md`, then `docs/ROADMAP.md`, `docs/TECH-ARCHITECTURE.md`, `docs/DESIGN.md`
and `docs/NOTES.md`. Agent rules: `CLAUDE.md` (builder) and `AGENTS.md` (reviewer).

## Structure

```
src/app/                 routes (/, /accounts, /pricing, /features/[slug], /credit, /help, /login,
                         /open-account, not-found), icons, global tokens
src/components/brand/    C2 logo (traced SVG)
src/components/layout/   Header (mega menu + mobile menu), Footer
src/components/home/     Home page sections
src/components/shared/   Shared page blocks (PageHero, FAQ, CTA band, plans, calculator)
src/components/help/     Help centre search + topic filter
src/components/forms/    Open-account waitlist form
src/components/ui/       Buttons, icons, motion helpers
src/content/             Page copy (mirrors docs/content/page-copy)
public/brand/            Logo files (SVG + PNG)
docs/                    Governing docs, templates, content
```
