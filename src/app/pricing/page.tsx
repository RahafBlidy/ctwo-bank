import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PlanCards } from "@/components/shared/Blocks";
import { FaqList } from "@/components/shared/FaqList";
import { CtaBand } from "@/components/shared/CtaBand";
import { Reveal } from "@/components/ui/motion";
import { PRICING } from "@/content/pricing";

export const metadata: Metadata = { title: PRICING.meta.title, description: PRICING.meta.description };

export default function PricingPage() {
  const p = PRICING;
  return (
    <>
      <PageHero {...p.hero} />

      <section className="py-[var(--space-section)]" aria-labelledby="plans-title" id="plans">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading id="plans-title" eyebrow={p.plans.eyebrow} title={p.plans.title} center />
          <div className="mt-10">
            <PlanCards />
          </div>
        </div>
      </section>

      <section className="bg-white py-[var(--space-section)]" aria-labelledby="fees-title" id="fees">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading id="fees-title" eyebrow={p.fees.eyebrow} title={p.fees.title} />
          <Reveal delay={0.1}>
            <div className="mt-10 overflow-x-auto rounded-[var(--radius-card)] ring-1 ring-line">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <caption className="sr-only">Fees by plan</caption>
                <thead>
                  <tr className="bg-paper">
                    <th
                      scope="col"
                      className="sticky left-0 bg-paper p-4 text-sm font-semibold text-ink-2 sm:p-5"
                    >
                      Fee
                    </th>
                    {p.fees.columns.map((c, i) => (
                      <th
                        key={c}
                        scope="col"
                        className={`p-4 font-display text-lg font-bold [font-stretch:110%] sm:p-5 ${i === 1 ? "text-brand" : ""}`}
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {p.fees.rows.map((r) => (
                    <tr
                      key={r.label}
                      className="group border-t border-line transition-colors hover:bg-brand-50"
                    >
                      <th
                        scope="row"
                        className="sticky left-0 bg-white p-4 font-semibold transition-colors group-hover:bg-brand-50 sm:p-5"
                      >
                        {r.label}
                      </th>
                      {r.values.map((v, i) => (
                        <td
                          key={i}
                          className={`tabular p-4 sm:p-5 ${i === 1 ? "font-semibold" : "text-ink-2"}`}
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <p className="mt-4 text-sm text-ink-2">{p.plans.exampleNote}</p>
        </div>
      </section>

      <section className="py-[var(--space-section)]" aria-labelledby="pricing-faq-title">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading id="pricing-faq-title" eyebrow={p.faq.eyebrow} title={p.faq.title} />
          <FaqList items={p.faq.items} idPrefix="pricing-faq" />
        </div>
      </section>

      <CtaBand id="pricing-cta" {...p.cta} />
    </>
  );
}
