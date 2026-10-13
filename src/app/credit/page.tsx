import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { LoanCalculator } from "@/components/shared/LoanCalculator";
import { OfferCard } from "@/components/shared/OfferCard";
import { StepsRow } from "@/components/shared/Blocks";
import { FaqList } from "@/components/shared/FaqList";
import { CtaBand } from "@/components/shared/CtaBand";
import { Eyebrow } from "@/components/ui/Button";
import { Icons } from "@/components/ui/icons";
import { Reveal, WordReveal } from "@/components/ui/motion";
import { CREDIT } from "@/content/credit";

export const metadata: Metadata = { title: CREDIT.meta.title, description: CREDIT.meta.description };

export default function CreditPage() {
  const c = CREDIT;
  return (
    <>
      <PageHero {...c.hero} visual={<OfferCard />} />

      <section className="py-[var(--space-section)]" aria-labelledby="products-title">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading id="products-title" eyebrow={c.products.eyebrow} title={c.products.title} />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {c.products.items.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <article
                  id={p.id}
                  className={`relative h-full overflow-hidden rounded-[2rem] p-8 sm:p-10 ${i === 0 ? "bg-navy text-white" : "bg-white ring-1 ring-line"}`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute -top-8 right-10 h-48 w-8 skew-x-[-40deg] ${i === 0 ? "bg-gold/80" : "bg-gold/40"}`}
                  />
                  <h3 className="relative text-3xl font-extrabold [font-stretch:112%]">{p.name}</h3>
                  <p className={`relative mt-3 max-w-md ${i === 0 ? "text-white/80" : "text-ink-2"}`}>
                    {p.body}
                  </p>
                  <dl className="relative mt-8 grid grid-cols-2 gap-x-6 gap-y-5">
                    {p.terms.map(([k, v]) => (
                      <div key={k}>
                        <dt className={`text-sm ${i === 0 ? "text-white/60" : "text-muted"}`}>{k}</dt>
                        <dd className="mt-1 font-semibold">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-4 text-sm text-ink-2">Figures are illustrative examples for this concept.</p>
        </div>
      </section>

      <section className="pb-[var(--space-section)]" aria-labelledby="calc-title">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-brand px-6 py-14 text-white sm:px-12 lg:px-16 lg:py-20">
            <span
              aria-hidden="true"
              className="absolute -top-10 right-[8%] h-[140%] w-24 skew-x-[-40deg] bg-white/[0.06]"
            />
            <div className="relative grid items-center gap-12 lg:grid-cols-2">
              <div>
                <Eyebrow light>{c.calculatorIntro.eyebrow}</Eyebrow>
                <WordReveal
                  id="calc-title"
                  text={c.calculatorIntro.title}
                  className="text-[clamp(2rem,4.2vw,3.4rem)] font-extrabold"
                />
                <Reveal delay={0.1}>
                  <p className="mt-5 max-w-md text-lg text-white/85">{c.calculatorIntro.body}</p>
                </Reveal>
              </div>
              <Reveal delay={0.15}>
                <LoanCalculator config={c.calculator} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-[var(--space-section)]" aria-labelledby="elig-title">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
          <SectionHeading id="elig-title" eyebrow={c.eligibility.eyebrow} title={c.eligibility.title} />
          <Reveal delay={0.1}>
            <ul className="grid gap-3">
              {c.eligibility.items.map((it) => (
                <li key={it} className="flex items-center gap-4 rounded-2xl bg-paper p-5 font-medium">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <Icons.check className="size-4" />
                  </span>
                  {it}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="py-[var(--space-section)]" aria-labelledby="credit-steps-title">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading id="credit-steps-title" eyebrow={c.steps.eyebrow} title={c.steps.title} />
          <StepsRow steps={c.steps.items} />
        </div>
      </section>

      <section className="bg-white py-[var(--space-section)]" aria-labelledby="credit-faq-title">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading id="credit-faq-title" eyebrow={c.faq.eyebrow} title={c.faq.title} />
          <FaqList items={c.faq.items} idPrefix="credit-faq" />
        </div>
      </section>

      <CtaBand id="credit-cta" {...c.cta} />
    </>
  );
}
