import type { Metadata } from "next";
import Link from "next/link";
import { FeaturePanel, type PanelKey } from "@/components/home/Essentials";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CardGrid, PlanCards, type IconKey } from "@/components/shared/Blocks";
import { FaqList } from "@/components/shared/FaqList";
import { CtaBand } from "@/components/shared/CtaBand";
import { Eyebrow, Arrow } from "@/components/ui/Button";
import { Icons } from "@/components/ui/icons";
import { Reveal, WordReveal } from "@/components/ui/motion";
import { ACCOUNTS } from "@/content/accounts";

export const metadata: Metadata = { title: ACCOUNTS.meta.title, description: ACCOUNTS.meta.description };

export default function AccountsPage() {
  const a = ACCOUNTS;
  return (
    <>
      <PageHero {...a.hero} visual={<FeaturePanel k="payments" />} />

      {a.segments.map((s, i) => (
        <section key={s.id} id={s.id} className="py-[var(--space-section)]" aria-labelledby={`${s.id}-title`}>
          <div
            className={`mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}
          >
            <div>
              <Eyebrow>{s.eyebrow}</Eyebrow>
              <WordReveal
                id={`${s.id}-title`}
                text={s.title}
                className="text-[clamp(2rem,4vw,3.2rem)] font-extrabold"
              />
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-lg text-lg text-ink-2">{s.body}</p>
              </Reveal>
              <Reveal delay={0.2}>
                <ul className="mt-7 grid gap-3">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-3 font-medium">
                      <span className="grid size-7 place-items-center rounded-full bg-gold text-ink">
                        <Icons.check className="size-3.5" />
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <div className="relative grid min-h-[420px] place-items-center overflow-hidden rounded-[2rem] bg-brand-50 p-8">
                <span
                  aria-hidden="true"
                  className="absolute -top-10 left-[20%] h-[130%] w-14 skew-x-[-40deg] bg-white/70"
                />
                <span
                  aria-hidden="true"
                  className="absolute -top-10 left-[32%] h-[130%] w-6 skew-x-[-40deg] bg-gold/60"
                />
                <div className="relative flex w-full justify-center">
                  <FeaturePanel k={s.panel as PanelKey} />
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="bg-white py-[var(--space-section)]" aria-labelledby="includes-title">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading id="includes-title" eyebrow={a.includes.eyebrow} title={a.includes.title} />
          <CardGrid items={a.includes.items.map((it) => ({ ...it, icon: it.icon as IconKey }))} />
        </div>
      </section>

      <section className="py-[var(--space-section)]" aria-labelledby="plans-title">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading id="plans-title" eyebrow={a.plans.eyebrow} title={a.plans.title} center />
          <div className="mt-10">
            <PlanCards />
          </div>
          <p className="mt-4 text-center">
            <Link
              href={a.plans.link.href}
              className="group inline-flex items-center gap-1.5 font-semibold text-brand"
            >
              {a.plans.link.label} <Arrow />
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-white py-[var(--space-section)]" aria-labelledby="accounts-faq-title">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading id="accounts-faq-title" eyebrow={a.faq.eyebrow} title={a.faq.title} />
          <FaqList items={a.faq.items} idPrefix="accounts-faq" />
        </div>
      </section>

      <CtaBand id="accounts-cta" {...a.cta} />
    </>
  );
}
