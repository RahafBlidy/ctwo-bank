# C2 Banking System — Claude Code Instructions

> This file governs the primary build agent in the c2-banking repository.
> Companion docs: docs/WORKFLOW.md, docs/ROADMAP.md, docs/PROJECT-STATUS.md,
> docs/TECH-ARCHITECTURE.md, docs/DESIGN.md, docs/NOTES.md and AGENTS.md.

## Project context

**C2 Banking System** is a multi-page marketing website for a digital business-banking service (concept brand,
owner: Sozana Blidy). It follows the spirit and navigation of tide.co (product mega-menu, plan-led pages, one
strong "Open an account" journey) with the motion register of the Kestrel project. It is a **concept**: it makes
no regulatory claims, holds no client money and has no real banking back end (D-05).

Approved conversion priorities: **primary** — join the waitlist at `/open-account`; **secondary** — compare
accounts (`/accounts`) and explore credit (`/credit`). There is no authentication, database or private area
(see docs/TECH-ARCHITECTURE.md); do not invent one.

Approved facts and copy live in `docs/content/locked-facts.md` and `docs/content/page-copy/*.md`, mirrored in
code under `src/content/*.ts`. Implement them exactly. GitHub is the source of truth. Netlify provides PR
Previews and Production. Work one sprint at a time from docs/ROADMAP.md.

## Owner workflow (binding)

- Owner environment: **Windows, VS Code, Command Prompt** (not PowerShell), **pnpm**. Any command given to the
  owner must work in cmd (no `rm -rf`, no `export`; use `rmdir /s /q`, `set`, etc.).
- Changes are delivered as a **delta zip**: only changed files, full paths preserved, extracted at the repo root.
  Full zips only on explicit owner request (scaffold, D-01; Netlify-ready copy, 2026-10-13).
- Read every file before editing it; make surgical edits; verify after every change and report the checks.
- The owner handles git: explicit `git add <path>` only — **never `git add -A`** — feature branch → PR → merge.
- Small batches (3–5 steps). Confirm before risky or hard-to-undo operations.
- Ambiguity → do the safe part and list decision items separately, clearly marked.
- Secrets never in chat or commits. If a secret appears in a paste or screenshot, tell the owner to rotate it.
- Keep `docs/NOTES.md` (project gotchas) current.
- All technical content in English.

## Start every session

1. Read docs/PROJECT-STATUS.md, including current stage, active sprint, and open decisions.
2. Read the active sprint scope and exit checklist in docs/ROADMAP.md, and docs/NOTES.md.
3. Inspect package.json, next.config.ts, the source tree, current branch, and git status.
4. Read every task input and relevant approved copy/design file before editing.
5. Confirm the task names the files allowed to change. If another file is needed, stop and explain why.
6. Work only inside the active sprint and branch named by the task.

## Stack and sources of truth

The selected stack is **Next.js 15 (App Router) + TypeScript strict + Tailwind CSS v4 + Motion 12 + pnpm**,
hosted on Netlify (D-13), recorded in docs/TECH-ARCHITECTURE.md.

Verify the on-disk implementation before relying on a note. If code and documentation disagree, report the
mismatch.

## Approved content and design

- Copy: `docs/content/page-copy/*.md` ↔ `src/content/*.ts` (change both together); facts in
  `docs/content/locked-facts.md`. New strings follow the voice rules in DESIGN.md §9.
- Design: docs/DESIGN.md. Tokens live only in `src/app/globals.css` (`@theme`). Never inline hex in components
  except the brand-locked logo whites in `C2Logo.tsx`.
- One public shell (Header + Footer in `src/app/layout.tsx`). Do not create page-specific chrome.
- Motion follows DESIGN.md §5 (Kestrel register, D-03). Every animation respects reduced motion via
  `MotionProvider`.
- If copy, design or architecture conflict, stop and record an open decision.

## Working rules

- Make the smallest safe change that completes the exact task.
- No unrelated refactors, renames, dependency changes, or cleanup.
- Preserve existing user changes.
- If the task is ambiguous, choose the smallest safe interpretation only when it cannot change the result
  materially; otherwise list it as a decision item.

## Security and environment safety

- Public env prefix: `NEXT_PUBLIC_` (world-readable). The project currently has **no server-only secrets**.
- Never open, read, copy, print, or modify `.env.local`. Use names from `.env.example` only.
- The waitlist form must never report success unless the provider accepted the submission.
- Security headers live in `next.config.ts`; do not weaken them.

## Verification

1. Typecheck: `pnpm typecheck`
2. Lint: `pnpm lint`
3. Format: `pnpm format:check`
4. Tests: N/A — fully static marketing site with a third-party form endpoint (see TECH-ARCHITECTURE §2)
5. Production build: `pnpm build` (record the route count)
6. Visual check: screenshots at 320 / 768 / 1440 of touched pages (DESIGN.md §8)

## Git and delivery rules

`main` is protected. Branch names: `claude/[SPRINT_ID]-short-slug` or `claude/fix-short-slug`.
Commit: NO and Push: NO unless a task prompt explicitly says YES. The owner commits, pushes and merges.

## Task report

Return: outcome; files changed (as the delta-zip list); checks run with results; visual verification;
risks/decision items (separate, marked); suggested commit message and explicit `git add` paths;
roadmap/status bookkeeping done or required.

Next step → AGENTS.md defines the independent review; docs/WORKFLOW.md defines the delivery chain.
