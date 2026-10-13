# TECH-ARCHITECTURE.md — Locked Stack and Architecture

The authoritative mechanics for C2 Banking System. If another document disagrees about the stack or deployment
model, this file wins; if the shipped repository disagrees, report the mismatch.

## 1. Project summary

| Item               | Decision                                                                                           |
| ------------------ | -------------------------------------------------------------------------------------------------- |
| Project / client   | C2 Banking System / Sozana Blidy (owner) — concept brand (D-05)                                    |
| Production domain  | TBD (Netlify default `*.netlify.app` until a domain is chosen)                                     |
| Primary conversion | Join the waitlist at `/open-account` (D-06)                                                        |
| Access model       | PUBLIC_ONLY                                                                                        |
| Content model      | STATIC_FILES — typed content modules in `src/content/*.ts` mirroring `docs/content/page-copy/*.md` |
| Repository         | `c2-banking` on GitHub — source of truth (name to be confirmed by owner)                           |

## 2. Locked stack

| Layer                | Choice                                                                              | Version / constraint           | Reason                                                                                        |
| -------------------- | ----------------------------------------------------------------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------- |
| Framework            | Next.js (App Router)                                                                | 15.5.x                         | Owner's standard; static prerender of every page                                              |
| Language             | TypeScript                                                                          | `strict: true`                 | House standard (TECHNICAL-INTEGRITY.md)                                                       |
| Styling              | Tailwind CSS v4 (`@theme` tokens in `src/app/globals.css`)                          | 4.x                            | One-file token source                                                                         |
| Motion               | `motion` (Framer Motion)                                                            | 12.4.x                         | Kestrel motion register (D-03)                                                                |
| Fonts                | `@fontsource-variable/archivo` (wdth) + `@fontsource-variable/figtree`              | 5.1.x                          | Self-hosted; no build-time network fetch                                                      |
| Forms and validation | Client validation + Formspree endpoint (`NEXT_PUBLIC_FORMSPREE_ENDPOINT`), honeypot | —                              | No server code to maintain (D-06)                                                             |
| Auth                 | NONE                                                                                | —                              | Marketing site                                                                                |
| Database             | NONE                                                                                | —                              | Formspree dashboard is the submission store                                                   |
| Hosting              | Netlify (D-13)                                                                      | `netlify.toml`, Node 22        | Owner's host; Deploy Previews per PR + Production from `main`                                 |
| Package manager      | pnpm                                                                                | `packageManager: pnpm@10.28.0` | Never mix managers                                                                            |
| Verification         | `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm build`; tests **N/A**     |                                | Fully static site with no auth/DB/payments — the only dynamic path is a third-party form POST |

**Never:** swap a locked layer or add a production dependency without an explicit, recorded decision.

## 3. Routes and shells

One shell: **Public** (`src/app/layout.tsx`: skip link, promo bar, Header with mega menu, Footer).

| Route                                                                       | Purpose                                       | Access | Shell  | Status        |
| --------------------------------------------------------------------------- | --------------------------------------------- | ------ | ------ | ------------- |
| `/`                                                                         | Home                                          | Public | Public | Built (S0.1)  |
| `/open-account`                                                             | Waitlist — primary conversion                 | Public | Public | Built (S0.1)  |
| `/accounts`                                                                 | Compare Free / Plus / Pro                     | Public | Public | Built (S0.2)  |
| `/pricing`                                                                  | Plans and fees                                | Public | Public | Built (S0.2)  |
| `/features/payments` · `/invoicing` · `/cards` · `/accounting` · `/savings` | Feature pages (one template)                  | Public | Public | Built (S0.2)  |
| `/credit`                                                                   | Loans, credit line, calculator                | Public | Public | Built (S0.2)  |
| `/about`                                                                    | Company story                                 | Public | Public | S0.3          |
| `/help`                                                                     | Help centre / FAQ                             | Public | Public | Built (S0.3a) |
| `/contact`                                                                  | Contact                                       | Public | Public | S0.3          |
| `/legal/privacy` · `/terms` · `/cookies`                                    | Legal                                         | Public | Public | S0.3          |
| `/login`                                                                    | Placeholder ("Online banking is coming soon") | Public | Public | Built (S0.3a) |
| `not-found`                                                                 | Branded 404                                   | Public | Public | Built (S0.1)  |

## 4. Data and files

None stored by the app. Waitlist submissions go to Formspree (owner's account); fields: business type, name,
email, business name, country, turnover band. Retention follows the Formspree account settings.

## 5. Authentication and authorization

None.

## 6. Environment variables — names only

Public prefix: `NEXT_PUBLIC_` (world-readable, inlined at build).

| Name                             | Public / server-only | Feature                      | Environments                 | Owner  |
| -------------------------------- | -------------------- | ---------------------------- | ---------------------------- | ------ |
| `NEXT_PUBLIC_SITE_URL`           | Public               | Canonical URL / metadataBase | Production                   | Sozana |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | Public               | Waitlist form submission     | Local / Preview / Production | Sozana |

When the endpoint is unset the form shows an honest "not switched on" notice and cannot submit.

## 7. Integrations

| Integration | Required for core journey? | Failure behavior                                                                | Env names                        | Data sent    |
| ----------- | -------------------------- | ------------------------------------------------------------------------------- | -------------------------------- | ------------ |
| Formspree   | Yes (waitlist)             | Honest error message, form stays filled; disabled with notice when unconfigured | `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | Fields in §4 |

**Conversion durability:** Formspree stores every submission in its dashboard **and** emails the owner — two
capture paths. Deliverability (SPF/DKIM/DMARC) applies only if a custom sending domain is added later.

## 8. Content operations

Copy is frozen in `docs/content/page-copy/*.md` and mirrored in `src/content/*.ts`; edits update both in the
same PR. No CMS.

## 9. Security and deployment

- Security headers in `next.config.ts`: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options: DENY`,
  `Permissions-Policy`; `poweredByHeader: false`. Verify on the deployed response.
- `main` is protected; Production deploys only from `main`; every PR gets a Netlify Deploy Preview.
- Rollback action: Netlify → Deploys → previous published deploy → **Publish deploy**.

## 10. Companion documents

ROADMAP.md · PROJECT-STATUS.md · WORKFLOW.md · DESIGN.md · SECURITY-CHECKLIST.md · NOTES.md.
SUPABASE-VERCEL-SETUP.md and SUPABASE-MCP-SAFETY.md are **Not Applicable** (no database).
