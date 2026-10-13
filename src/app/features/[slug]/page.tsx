import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FeaturePanel } from "@/components/home/Essentials";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CardGrid, StepsRow } from "@/components/shared/Blocks";
import { FaqList } from "@/components/shared/FaqList";
import { CtaBand } from "@/components/shared/CtaBand";
import { Arrow } from "@/components/ui/Button";
import { Icons } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/motion";
import { FEATURES, FEATURES_SHARED as S, getFeature } from "@/content/features";

export const dynamicParams = false;

export function generateStaticParams() {
  return FEATURES.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const f = getFeature((await params).slug);
  return f ? { title: f.meta.title, description: f.meta.description } : {};
}

export default async function FeaturePage({ params }: { params: Promise<{ slug: string }> }) {
  const f = getFeature((await params).slug);
  if (!f) notFound();
  const related = FEATURES.filter((x) => x.slug !== f.slug);

  return (
    <>
      <PageHero
        {...f.hero}
        primary={S.primary}
        secondary={S.secondary}
        visual={<FeaturePanel k={f.panel} />}
      />

      <section className="py-[var(--space-section)]" aria-labelledby="benefits-title">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            id="benefits-title"
            eyebrow={S.benefitsEyebrow}
            title={`What you get with ${f.name.toLowerCase()}`}
          />
          <CardGrid items={f.benefits.map((b) => ({ ...b, icon: f.icon }))} />
        </div>
      </section>

      <section className="pb-[var(--space-section)]" aria-labelledby="steps-title">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading id="steps-title" eyebrow={S.stepsEyebrow} title={S.stepsTitle} />
          <StepsRow steps={f.steps} />
          <Reveal delay={0.1}>
            <div className="relative mt-8 flex flex-col gap-2 overflow-hidden rounded-[var(--radius-card)] bg-gold-100 p-7 sm:flex-row sm:items-center sm:gap-6">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gold text-ink">
                <Icons.shield className="size-6" />
              </span>
              <p>
                <b className="block text-lg">{f.tip.title}</b>
                <span className="text-ink-2">{f.tip.body}</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-[var(--space-section)]" aria-labelledby="related-title">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading id="related-title" eyebrow={S.relatedEyebrow} title={S.relatedTitle} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r, i) => {
              const Ico = Icons[r.icon];
              return (
                <Reveal key={r.slug} delay={i * 0.06}>
                  <Link
                    href={`/features/${r.slug}`}
                    className="group flex h-full flex-col rounded-[var(--radius-card)] bg-paper p-6 ring-1 ring-transparent transition-[box-shadow,background-color] hover:bg-white hover:ring-line hover:shadow-[0_20px_40px_-28px_rgb(6_20_51/0.45)]"
                  >
                    <span className="grid size-11 place-items-center rounded-2xl bg-brand text-white transition-transform duration-300 group-hover:-rotate-6">
                      <Ico className="size-5" />
                    </span>
                    <span className="mt-5 font-display text-xl font-bold [font-stretch:110%]">{r.name}</span>
                    <span className="mt-1 text-sm text-ink-2">{r.meta.description}</span>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 font-semibold text-brand">
                      Learn more <Arrow />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-[var(--space-section)]" aria-labelledby="feature-faq-title">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading id="feature-faq-title" eyebrow={S.faqEyebrow} title={`${f.name} questions`} />
          <FaqList items={f.faq} idPrefix={`${f.slug}-faq`} />
        </div>
      </section>

      <CtaBand id="feature-cta" {...S.cta} />
    </>
  );
}
