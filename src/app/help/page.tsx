import type { Metadata } from "next";
import { HelpView } from "@/components/help/HelpCenter";
import { CardGrid } from "@/components/shared/Blocks";
import { CtaBand } from "@/components/shared/CtaBand";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Icons } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/motion";
import { HELP } from "@/content/help";

export const metadata: Metadata = { title: HELP.meta.title, description: HELP.meta.description };

export default function HelpPage() {
  const h = HELP;
  return (
    <HelpView>
      <section
        id="security"
        className="scroll-mt-24 border-t border-line bg-white py-[var(--space-section)]"
        aria-labelledby="security-title"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading id="security-title" eyebrow={h.security.eyebrow} title={h.security.title} />
          <CardGrid items={h.security.items} cols={2} />
        </div>
      </section>

      <section
        id="fraud"
        className="relative scroll-mt-24 overflow-hidden bg-navy py-[var(--space-section)] text-white"
        aria-labelledby="fraud-title"
      >
        <span
          aria-hidden="true"
          className="absolute -top-10 right-[12%] h-[130%] w-10 skew-x-[-40deg] bg-gold/20"
        />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading id="fraud-title" eyebrow={h.fraud.eyebrow} title={h.fraud.title} light />
          <p className="mt-5 max-w-2xl text-lg text-white/80">{h.fraud.body}</p>
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {h.fraud.steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.12}>
                <li className="h-full list-none rounded-3xl bg-white/[0.06] p-7 ring-1 ring-white/10">
                  <span className="font-display text-5xl font-extrabold text-gold [font-stretch:120%]">
                    {s.n}
                  </span>
                  <span className="mt-4 block font-display text-xl font-bold [font-stretch:112%]">
                    {s.title}
                  </span>
                  <span className="mt-2 block text-white/75">{s.body}</span>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={0.2}>
            <p className="mt-8 flex items-start gap-3 rounded-2xl bg-gold p-5 font-semibold text-ink">
              <Icons.shield className="mt-0.5 size-5 shrink-0" />
              {h.fraud.warning}
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand id="help-cta" {...h.cta} />
    </HelpView>
  );
}
