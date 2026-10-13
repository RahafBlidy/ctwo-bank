# ROADMAP.md — Build Order

Scope and dependency plan for C2 Banking System. `PROJECT-STATUS.md` records current state; `WORKFLOW.md`
records how work ships. Predevelopment was waived for this concept build (D-02); approved copy is drafted per
sprint in `docs/content/page-copy/` and approved by the owner with the PR.

## Setup Gate — delivery foundation

- [x] Governing docs filled for C2 (CLAUDE.md, TECH-ARCHITECTURE, DESIGN, ROADMAP, PROJECT-STATUS, NOTES).
- [ ] GitHub repo exists, `main` protected, Code Check required, direct/force pushes blocked. _(owner)_
- [x] Package manager (pnpm) and verification commands recorded.
- [ ] Netlify connected (D-13); Deploy Previews build; Production deploys only from `main`. _(owner)_
- [x] Rollback action recorded (Netlify "Publish deploy" on a previous deploy).
- [x] Env-var names documented without values; `.env*` ignored except `.env.example`.
- [x] Database/auth decision explicit: **None**.

**Exit:** the setup PR passes local checks, Preview QA, review, merge and Production smoke test.

## Stage 0 — fully working barebones website

| Sprint | Goal / scope                                                                                                                                        | Explicitly out of scope  | Acceptance criteria                                                                                  | Depends on | Status                                 |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------- | ---------- | -------------------------------------- |
| S0.1   | Scaffold, tokens, logo, public shell (promo bar, mega menu, mobile menu, footer), Home page with full motion, `/open-account` waitlist, branded 404 | Other content pages      | Home + waitlist render 320px→desktop; form validates and never fakes success; checks pass            | Setup Gate | Ready for Review                       |
| S0.2   | Product pages: `/accounts`, `/pricing`, `/features/*` (one template), `/credit`                                                                     | About/Help/Contact/Legal | Every product route renders approved copy with the shared shell; no prefetch 404s from product links | S0.1       | Ready for Review                       |
| S0.3   | Company & support pages: `/about`, `/help`, `/contact`, `/legal/*`, `/login` placeholder                                                            | New features             | Every nav/footer link resolves (zero 404s); page metadata set                                        | S0.2       | In Progress — S0.3a (help, login) done |

## Stage 1 — approved MVP additions (proposed, not yet approved)

| Sprint | Goal / scope                                                               | Explicitly out of scope | Acceptance criteria                        | Depends on      | Status      |
| ------ | -------------------------------------------------------------------------- | ----------------------- | ------------------------------------------ | --------------- | ----------- |
| S1.1   | SEO pack: sitemap.xml, robots.txt, Open Graph images, JSON-LD Organization | Analytics               | Valid sitemap/robots; OG preview renders   | S0.3            | Not Started |
| S1.2   | Arabic version with next-intl (D-09 follow-up)                             | New pages               | Full key parity EN/AR; RTL layout verified | S0.3 + decision | Not Started |

## Launch Gate

- [ ] All launch-scope sprints Done.
- [ ] QA-CHECKLIST, SECURITY-CHECKLIST, LAUNCH-CHECKLIST pass.
- [ ] Waitlist journey works on the real domain (Formspree endpoint set in Production).
- [ ] Rollback owner and action known.

## Universal sprint exit gate

- [ ] Allowed paths and acceptance criteria satisfied.
- [ ] `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm build` pass (tests N/A — static site).
- [ ] Screenshots at 320 / 768 / 1440 for touched pages.
- [ ] Netlify Deploy Preview tested on desktop and mobile.
- [ ] Independent review returned Approve at the tested head.
- [ ] PROJECT-STATUS.md and this roadmap updated in the same branch.

## Ordering rationale

S0.1 ships the shell, the benchmark page and the primary conversion first, so every later page inherits locked
chrome and tokens. S0.2 adds the product pages the mega menu points to; S0.3 closes every remaining link so the
site has no dead ends before launch.
