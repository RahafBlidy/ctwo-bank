import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Button";
import { Icons } from "@/components/ui/icons";
import { Reveal, WordReveal } from "@/components/ui/motion";
import { OpenAccountForm } from "@/components/forms/OpenAccountForm";
import { OPEN_ACCOUNT } from "@/content/open-account";

export const metadata: Metadata = {
  title: OPEN_ACCOUNT.meta.title,
  description: OPEN_ACCOUNT.meta.description,
};

export default function OpenAccountPage() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <span
        aria-hidden="true"
        className="absolute -top-20 right-[6%] h-[120%] w-24 skew-x-[-40deg] bg-brand-50"
      />
      <span
        aria-hidden="true"
        className="absolute -top-20 right-[16%] h-[120%] w-8 skew-x-[-40deg] bg-gold-100"
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <Eyebrow>{OPEN_ACCOUNT.eyebrow}</Eyebrow>
          <WordReveal
            as="h1"
            onView={false}
            text={OPEN_ACCOUNT.title}
            className="text-[clamp(2.4rem,5vw,4rem)] font-extrabold"
          />
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-lg text-ink-2">{OPEN_ACCOUNT.body}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="mt-8 grid gap-3">
              {OPEN_ACCOUNT.points.map((p) => (
                <li key={p} className="flex items-center gap-3 font-medium">
                  <span className="grid size-7 place-items-center rounded-full bg-gold text-ink">
                    <Icons.check className="size-3.5" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <OpenAccountForm />
        </Reveal>
      </div>
    </section>
  );
}
