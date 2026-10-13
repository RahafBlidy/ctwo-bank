"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ButtonLink, Arrow, Eyebrow } from "@/components/ui/Button";
import { Icons } from "@/components/ui/icons";
import { EASE, Reveal, WordReveal } from "@/components/ui/motion";
import { LoanCalculator } from "@/components/shared/LoanCalculator";
import { FaqList } from "@/components/shared/FaqList";
import { CtaBand } from "@/components/shared/CtaBand";
import { HOME } from "@/content/home";

/* ---------------- Segments marquee ---------------- */
export function Segments() {
  const list = [...HOME.segments, ...HOME.segments];
  return (
    <section aria-label="Who C2 is for" className="border-y border-line bg-white py-6">
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex w-max animate-marquee gap-12 hover:[animation-play-state:paused]">
          {list.map((s, i) => (
            <span
              key={i}
              aria-hidden={i >= HOME.segments.length}
              className="flex items-center gap-12 font-display text-2xl font-bold whitespace-nowrap text-ink [font-stretch:112%]"
            >
              {s}
              <span aria-hidden="true" className="inline-block h-5 w-2 skew-x-[-40deg] rounded-sm bg-gold" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Product tiles (tilt on hover) ---------------- */
const TONES: Record<string, string> = {
  brand: "bg-brand text-white",
  gold: "bg-gold text-ink",
  navy: "bg-navy text-white",
  sky: "bg-brand-100 text-ink",
};
const TILE_ICON = {
  invoicing: Icons.invoices,
  savings: Icons.savings,
  cards: Icons.cards,
  accounting: Icons.accounting,
} as const;

function Tile({ item, index }: { item: (typeof HOME.tools.items)[number]; index: number }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });
  const Ico = TILE_ICON[item.key as keyof typeof TILE_ICON];
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.08 }}
      style={{ perspective: 900 }}
    >
      <motion.div
        style={{ rotateX: srx, rotateY: sry }}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
          rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
        }}
        onPointerLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
      >
        <Link
          href={item.href}
          className={`group relative flex h-[300px] flex-col overflow-hidden rounded-[var(--radius-card)] p-7 ${TONES[item.tone]}`}
        >
          <span
            aria-hidden="true"
            className="absolute -right-6 -bottom-10 h-56 w-10 skew-x-[-40deg] bg-current opacity-[0.08] transition-transform duration-500 group-hover:translate-x-4"
          />
          <span
            aria-hidden="true"
            className="absolute right-10 -bottom-10 h-56 w-4 skew-x-[-40deg] bg-current opacity-[0.12] transition-transform duration-500 group-hover:translate-x-6"
          />
          <span className="grid size-12 place-items-center rounded-2xl bg-current/10">
            <Ico className="size-6" />
          </span>
          <span className="mt-auto font-display text-2xl font-bold [font-stretch:112%]">{item.title}</span>
          <span className="mt-2 max-w-[26ch] opacity-85">{item.body}</span>
          <span className="mt-5 inline-flex items-center gap-1.5 font-semibold">
            Learn more <Arrow />
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export function Tools() {
  return (
    <section className="pb-[var(--space-section)]" aria-labelledby="tools-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Eyebrow>{HOME.tools.eyebrow}</Eyebrow>
        <WordReveal
          id="tools-title"
          text={HOME.tools.title}
          className="text-[clamp(2rem,4.4vw,3.6rem)] font-extrabold"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HOME.tools.items.map((it, i) => (
            <Tile key={it.key} item={it} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Journey: steps reveal in turn, joined by a gold line ---------------- */
export function Journey() {
  const steps = HOME.journey.steps;

  return (
    <section className="bg-navy py-[var(--space-section)] text-white" aria-labelledby="journey-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Eyebrow light>{HOME.journey.eyebrow}</Eyebrow>
        <WordReveal
          id="journey-title"
          text={HOME.journey.title}
          className="max-w-3xl text-[clamp(2rem,4vw,3.4rem)] font-extrabold"
        />

        <div className="relative mt-12">
          {/* Connector line (desktop): draws once when the steps come into view */}
          <motion.span
            aria-hidden="true"
            className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-0.5 origin-left bg-gold/60 lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
          />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <motion.li
                key={s.n}
                className="relative flex list-none flex-col"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.15 }}
              >
                <span className="relative z-10 mx-auto hidden size-14 place-items-center rounded-full bg-gold font-display text-lg font-extrabold text-ink ring-8 ring-navy lg:grid">
                  {s.n}
                </span>
                <div className="group flex-1 overflow-hidden rounded-3xl bg-white/[0.06] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.1] lg:mt-6">
                  <span className="font-display text-5xl font-extrabold text-gold [font-stretch:120%] lg:hidden">
                    {s.n}
                  </span>
                  <span className="mt-4 block font-display text-xl font-bold [font-stretch:112%] lg:mt-0">
                    {s.title}
                  </span>
                  <span className="mt-2 block text-white/75">{s.body}</span>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-3xl bg-brand p-6 sm:flex-row sm:items-center sm:p-8">
            <span className="font-display text-2xl font-bold [font-stretch:112%] sm:text-3xl">
              Ready when you are.
            </span>
            <ButtonLink href="/open-account" variant="gold" arrow>
              Open a free account
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Credit ---------------- */
export function Credit() {
  return (
    <section className="py-[var(--space-section)]" id="credit" aria-labelledby="credit-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-brand px-6 py-14 text-white sm:px-12 lg:px-16 lg:py-20">
          <span
            aria-hidden="true"
            className="absolute -top-10 right-[8%] h-[140%] w-24 skew-x-[-40deg] bg-white/[0.06]"
          />
          <span
            aria-hidden="true"
            className="absolute -top-10 right-[20%] h-[140%] w-8 skew-x-[-40deg] bg-gold/70"
          />
          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow light>{HOME.credit.eyebrow}</Eyebrow>
              <WordReveal
                id="credit-title"
                text={HOME.credit.title}
                className="text-[clamp(2rem,4.2vw,3.4rem)] font-extrabold"
              />
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-md text-lg text-white/85">{HOME.credit.body}</p>
              </Reveal>
              <Reveal delay={0.2} className="mt-8">
                <ButtonLink href={HOME.credit.cta.href} variant="gold" arrow>
                  {HOME.credit.cta.label}
                </ButtonLink>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              <LoanCalculator config={HOME.credit.calculator} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Security ---------------- */
const SEC_ICONS = [Icons.lock, Icons.shield, Icons.bell];
export function Security() {
  return (
    <section className="pb-[var(--space-section)]" aria-labelledby="security-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <Eyebrow>{HOME.security.eyebrow}</Eyebrow>
            <WordReveal
              id="security-title"
              text={HOME.security.title}
              className="text-[clamp(2rem,4.2vw,3.4rem)] font-extrabold"
            />
          </div>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {HOME.security.items.map((it, i) => {
            const Ico = SEC_ICONS[i];
            return (
              <Reveal key={it.title} delay={i * 0.08}>
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
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
export function Faq() {
  return (
    <section className="bg-white py-[var(--space-section)]" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Eyebrow>{HOME.faq.eyebrow}</Eyebrow>
          <WordReveal
            id="faq-title"
            text={HOME.faq.title}
            className="text-[clamp(2rem,4.2vw,3.4rem)] font-extrabold"
          />
          <p className="mt-5 max-w-sm text-ink-2">
            More answers in the{" "}
            <Link href="/help" className="font-semibold text-brand underline-offset-4 hover:underline">
              Help centre
            </Link>
            .
          </p>
        </div>
        <FaqList items={HOME.faq.items} idPrefix="home-faq" />
      </div>
    </section>
  );
}

/* ---------------- Final CTA ---------------- */
export function FinalCta() {
  return (
    <CtaBand id="final-title" title={HOME.finalCta.title} cta={HOME.finalCta.cta} note={HOME.finalCta.note} />
  );
}
