# PROJECT-STATUS.md — Where the Build Stands

The living tracker for C2 Banking System. Any fresh session reads this file **first**.

## 1. Right now

| Item                 | Value                                                                                                                                                                            |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Current stage        | Setup Gate + Stage 0                                                                                                                                                             |
| Active sprint        | S0.3a — help, log-in placeholder, app→online copy — Status: Ready for Review                                                                                                     |
| Current branch       | `claude/S0.3a-help-login-online` (after S0.2 and the S0.2.1 fix merge)                                                                                                           |
| Next action          | 1. Owner: merge S0.2 + S0.2.1, then extract the S0.3a delta on a new branch and open the PR. 2. Confirm D-10/D-11 and whether to build `/about`, `/contact`, `/legal/*` (S0.3b). |
| Preview / Production | Netlify Deploy Preview per PR / `*.netlify.app` until a domain is chosen (D-13)                                                                                                  |
| Last updated         | 2026-10-13 — S0.3a built and verified locally (15 pages, 12 routes × 320/768/1440, 0 overflow)                                                                                   |

### How to resume in a fresh AI session

1. Read this file, then the active sprint in `docs/ROADMAP.md`, then `docs/NOTES.md`.
2. Read `CLAUDE.md` and the docs it points to.
3. Verify the repo state yourself (package.json, source tree, git log). Report mismatches.
4. Work only inside the active sprint.
5. Before ending: update §1–§3 here and tick the roadmap.

## 2. Sprint board

| Sprint     | Status           | Branch                           | PR  | Merged date | Notes                                                                                  |
| ---------- | ---------------- | -------------------------------- | --- | ----------- | -------------------------------------------------------------------------------------- |
| Setup Gate | In Progress      | `claude/S0.1-shell-home`         | —   | —           | Repo/Netlify/branch protection are owner steps                                         |
| S0.1       | Ready for Review | `claude/S0.1-shell-home`         | —   | —           | Record: `docs/sprint-prompts/S0.1-shell-home.md`                                       |
| S0.2       | Ready for Review | `claude/S0.2-product-pages`      | —   | —           | Record: `docs/sprint-prompts/S0.2-product-pages.md`                                    |
| S0.3       | In Progress      | `claude/S0.3a-help-login-online` | —   | —           | S0.3a done: `/help`, `/login`, app→online copy. Left: `/about`, `/contact`, `/legal/*` |

## 3. Last completed work

- 2026-10-13 — S0.3a: `/help` (search + topic filter, `#security`, `#fraud`) and `/login` placeholder (no credential fields, noindex). Owner: no mobile apps — all app/phone wording changed to online, hero phone mockup replaced by a browser window, footer app chips removed; Home "How it works" no longer pinned (S0.2.1). Checks green; 12 routes × 3 widths verified.
- 2026-10-13 — S0.2: `/accounts`, `/pricing` (monthly/yearly plans + fee table), `/credit` (offer card, calculator, eligibility, steps), `/features/[slug]` template with 5 pages. Shared components extracted (PageHero, SectionHeading, LoanCalculator, FaqList, CtaBand, PlanCards, StepsRow, CardGrid, OfferCard); Home refactored to use them with no visual change. Checks green; 10 routes × 3 widths verified.
- 2026-10-13 — S0.1: Next.js 15 + TS + Tailwind v4 + Motion scaffold, traced C2 logo, public shell, Home
  (9 sections), `/open-account` waitlist, 404. Local checks green; screenshots at 390 and 1440.

## 4. Next sprint

- S0.3b — `/about`, `/contact`, `/legal/privacy|terms|cookies` (owner to confirm: build them, or hide the links for now).

## 5. Blockers

| #   | Blocker                                                       | Blocking what             | Who unblocks | Since      |
| --- | ------------------------------------------------------------- | ------------------------- | ------------ | ---------- |
| 1   | GitHub repo name/URL and Netlify site not created yet         | Preview QA, review        | Owner        | 2026-10-13 |
| 2   | Formspree form not created (`NEXT_PUBLIC_FORMSPREE_ENDPOINT`) | Live waitlist submissions | Owner        | 2026-10-13 |

## 6. Checks status

| Check            | Last run   | Result  | Notes                                                                                                                             |
| ---------------- | ---------- | ------- | --------------------------------------------------------------------------------------------------------------------------------- |
| typecheck        | 2026-10-13 | pass    |                                                                                                                                   |
| lint             | 2026-10-13 | pass    |                                                                                                                                   |
| format:check     | 2026-10-13 | pass    |                                                                                                                                   |
| tests            | —          | N/A     | Fully static site (TECH-ARCHITECTURE §2)                                                                                          |
| build            | 2026-10-13 | pass    | 9 route entries (13 pages): `/`, `/accounts`, `/pricing`, `/credit`, `/features/[slug]` ×5, `/open-account`, `/_not-found`, icons |
| deployed Preview | —          | not run | Needs Netlify site                                                                                                                |

## 7. Locked decisions (do not reopen)

All accepted by the owner on 2026-10-13 ("go with your suggestions").

| ID   | Date       | Decision                                                                                                                                                   | Decided by |
| ---- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| D-01 | 2026-10-13 | New project scaffolded from scratch; first delivery is a full starter zip, all later deliveries are delta zips                                             | Owner      |
| D-02 | 2026-10-13 | Predevelopment GO gate waived — concept/portfolio build. Copy drafted per sprint for owner approval; Home is the design benchmark                          | Owner      |
| D-03 | 2026-10-13 | Motion register = Kestrel (springs, parallax, tilt, magnetic CTA, scroll-linked transforms) — supersedes DESIGN default §5; reduced motion stays mandatory | Owner      |
| D-04 | 2026-10-13 | Stack: Next.js 15 + TypeScript strict + Tailwind v4 + Motion + pnpm; no database; host Vercel                                                              | Owner      |
| D-05 | 2026-10-13 | Concept brand: footer disclaimer; no regulatory claims, customer counts, ratings or invented reviews                                                       | Owner      |
| D-06 | 2026-10-13 | Primary conversion = waitlist form posting to Formspree; disabled with an honest notice when unconfigured                                                  | Owner      |
| D-07 | 2026-10-13 | Logo redrawn as SVG by tracing the supplied PNG (white + gold paths, brand-blue tile)                                                                      | Owner      |
| D-08 | 2026-10-13 | Sitemap per TECH-ARCHITECTURE §3 (Tide-style groups: Business accounts · Features · Credit · Pricing · Help)                                               | Owner      |
| D-09 | 2026-10-13 | English only for launch; Arabic (next-intl) is a later, separately approved sprint                                                                         | Owner      |
| D-13 | 2026-10-13 | Hosting moves from Vercel to **Netlify** (owner). `netlify.toml` added; supersedes the host in D-04                                                        | Owner      |

## 8. Open decisions

| ID   | Decision needed                     | Options / current lean                                                                                                                       | Needed by | Status              |
| ---- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------- |
| D-10 | Currency / market shown in examples | **Applied provisionally in S0.2:** USD everywhere; owner to confirm                                                                          | Launch    | Open (lean applied) |
| D-11 | Plan prices for Free / Plus / Pro   | **Applied provisionally in S0.2:** $0 / $12 / $29 a month, 20% off yearly, fee table in `src/content/pricing.ts`, labelled "example pricing" | Launch    | Open (lean applied) |
| D-12 | Production domain                   | —                                                                                                                                            | Launch    | Open                |

## 9. Env vars record (NAMES only)

| Name                             | Public / server-only | Feature              | Set in                                           |
| -------------------------------- | -------------------- | -------------------- | ------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`           | Public               | Canonical URLs       | Netlify Production                               |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | Public               | Waitlist submissions | Netlify Preview + Production, local `.env.local` |

## 10. Known issues

| #   | Severity | Where               | Issue                                                                                                                                   | Status                  |
| --- | -------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| 1   | Low      | Header/footer links | Links to remaining S0.3 routes (`/about`, `/contact`, `/legal/*`) return the branded 404 (and Next prefetch logs 404s) until S0.3 ships | Open — closes with S0.3 |

## 11. Update rules

- Update this file in the same branch/PR as the work it describes.
- Strike through, never delete: resolved decisions, closed blockers, retired scope.
