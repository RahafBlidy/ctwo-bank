"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ButtonLink } from "@/components/ui/Button";
import { Icons } from "@/components/ui/icons";
import { AnimatedNumber, EASE, Reveal } from "@/components/ui/motion";
import { PLANS, PRICING, YEARLY_DISCOUNT, type Plan } from "@/content/pricing";

export type IconKey = keyof typeof Icons;

/* ---------- Plan cards with monthly / yearly switch ---------- */
export function PlanCards({ showToggle = true }: { showToggle?: boolean }) {
  const t = PRICING.plans;
  const [yearly, setYearly] = useState(false);
  const price = (p: Plan) => (yearly ? +(p.monthly * (1 - YEARLY_DISCOUNT)).toFixed(2) : p.monthly);

  return (
    <div>
      {showToggle && (
        <div className="flex justify-center">
          <div
            className="inline-flex rounded-full bg-white p-1 ring-1 ring-line"
            role="group"
            aria-label="Billing period"
          >
            {[
              { v: false, l: t.monthlyLabel },
              { v: true, l: t.yearlyLabel },
            ].map((o) => {
              const on = yearly === o.v;
              return (
                <button
                  key={o.l}
                  type="button"
                  onClick={() => setYearly(o.v)}
                  aria-pressed={on}
                  className={`relative h-11 rounded-full px-5 text-[15px] font-semibold transition-colors ${on ? "text-white" : "text-ink-2 hover:text-ink"}`}
                >
                  {on && (
                    <motion.span
                      layoutId="billing-pill"
                      className="absolute inset-0 rounded-full bg-brand"
                      transition={{ type: "spring", stiffness: 450, damping: 34 }}
                    />
                  )}
                  <span className="relative inline-flex items-center gap-2">
                    {o.l}
                    {o.v && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] ${on ? "bg-gold text-ink" : "bg-gold-100 text-ink"}`}
                      >
                        {t.yearlyBadge}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-3">
        {PLANS.map((p, i) => {
          const v = price(p);
          return (
            <motion.article
              key={p.id}
              className={`relative flex flex-col rounded-[2rem] p-7 sm:p-8 ${p.featured ? "bg-navy text-white shadow-[0_40px_80px_-40px_rgb(6_20_51/0.8)]" : "bg-white ring-1 ring-line"}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
            >
              {p.featured && (
                <span className="absolute top-6 right-6 rounded-full bg-gold px-3 py-1 text-xs font-bold text-ink">
                  {t.popular}
                </span>
              )}
              <h3 className="text-2xl font-extrabold [font-stretch:112%]">{p.name}</h3>
              <p className={p.featured ? "text-white/75" : "text-ink-2"}>{p.tagline}</p>
              <p className="mt-6 flex items-baseline gap-1 font-display [font-stretch:105%]">
                <span className="self-start pt-2 text-2xl font-bold">$</span>
                <span className="text-6xl leading-none font-extrabold tracking-tight">
                  <AnimatedNumber value={v} decimals={v % 1 ? 2 : 0} startFromZero={false} duration={0.45} />
                </span>
                <span className={`ml-1 font-sans text-base ${p.featured ? "text-white/70" : "text-muted"}`}>
                  {t.perMonth}
                </span>
              </p>
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={`${p.id}-${yearly}`}
                  className={`mt-2 min-h-6 text-sm ${p.featured ? "text-white/75" : "text-ink-2"}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  {p.monthly === 0 ? t.freeNote : yearly ? t.yearlyNote(v * 12) : t.monthlyNote}
                </motion.p>
              </AnimatePresence>
              <ButtonLink href={p.cta.href} variant={p.featured ? "gold" : "primary"} className="mt-6 w-full">
                {p.cta.label}
              </ButtonLink>
              <ul className="mt-7 grid gap-3">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span
                      className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${p.featured ? "bg-gold text-ink" : "bg-brand-50 text-brand"}`}
                    >
                      <Icons.check className="size-3" />
                    </span>
                    <span className={p.featured ? "text-white/90" : "text-ink"}>{f}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </div>
      <p className="mt-6 text-center text-sm text-ink-2">{t.exampleNote}</p>
    </div>
  );
}

/* ---------- Numbered steps ---------- */
export function StepsRow({ steps }: { steps: { title: string; body: string; n?: string }[] }) {
  return (
    <ol className="mt-12 grid gap-5 md:grid-cols-3">
      {steps.map((s, i) => (
        <Reveal key={s.title} delay={i * 0.1}>
          <li className="relative h-full list-none overflow-hidden rounded-[var(--radius-card)] bg-white p-7 ring-1 ring-line">
            <span
              aria-hidden="true"
              className="absolute -top-6 -right-4 h-32 w-6 skew-x-[-40deg] bg-gold/30"
            />
            <span className="font-display text-5xl font-extrabold text-brand [font-stretch:118%]">
              {s.n ?? String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-5 text-xl font-bold [font-stretch:110%]">{s.title}</h3>
            <p className="mt-2 text-ink-2">{s.body}</p>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}

/* ---------- Icon card grid ---------- */
export function CardGrid({
  items,
  cols = 3,
}: {
  items: { title: string; body: string; icon?: IconKey }[];
  cols?: 2 | 3;
}) {
  return (
    <div className={`mt-12 grid gap-5 sm:grid-cols-2 ${cols === 3 ? "lg:grid-cols-3" : ""}`}>
      {items.map((it, i) => {
        const Ico = Icons[it.icon ?? "check"];
        return (
          <Reveal key={it.title} delay={(i % 3) * 0.08}>
            <div className="group h-full rounded-[var(--radius-card)] bg-white p-7 ring-1 ring-line transition-shadow duration-300 hover:shadow-[0_24px_50px_-30px_rgb(6_20_51/0.4)]">
              <span className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand transition-transform duration-300 group-hover:-rotate-6">
                <Ico className="size-6" />
              </span>
              <h3 className="mt-6 text-xl font-bold [font-stretch:110%]">{it.title}</h3>
              <p className="mt-2 text-ink-2">{it.body}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
