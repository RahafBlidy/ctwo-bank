import type { Metadata } from "next";
import { BrowserFrame, DashboardScreen } from "@/components/home/Hero";
import { ButtonLink } from "@/components/ui/Button";
import { Icons } from "@/components/ui/icons";
import { Reveal, WordReveal } from "@/components/ui/motion";
import { LOGIN } from "@/content/help";

export const metadata: Metadata = {
  title: LOGIN.meta.title,
  description: LOGIN.meta.description,
  robots: { index: false },
};

export default function LoginPage() {
  const l = LOGIN;
  return (
    <section className="relative overflow-hidden bg-brand text-white" aria-labelledby="login-title">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-[20%] left-[62%] h-[140%] w-32 skew-x-[-40deg] bg-white/[0.06]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-[20%] left-[80%] h-[140%] w-12 skew-x-[-40deg] bg-white/[0.07]"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pt-14 pb-24 sm:px-8 lg:grid-cols-[1fr_1fr] lg:pt-20 lg:pb-32">
        <div>
          <Reveal>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[13px] font-semibold tracking-wide ring-1 ring-white/20">
              <Icons.lock className="size-3.5 text-gold" /> {l.eyebrow}
            </p>
          </Reveal>
          <WordReveal
            as="h1"
            id="login-title"
            text={l.title}
            className="text-[clamp(2.3rem,5vw,4.2rem)] font-extrabold tracking-[-0.03em] [font-stretch:112%]"
          />
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-xl text-lg text-white/85 sm:text-xl">{l.body}</p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={l.primary.href} variant="gold" size="lg" arrow>
                {l.primary.label}
              </ButtonLink>
              <ButtonLink href={l.secondary.href} variant="ghostLight" size="lg">
                {l.secondary.label}
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.5}>
            <ul className="mt-8 grid gap-2.5 text-[15px] text-white/85">
              {l.points.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <Icons.check className="size-4 shrink-0 text-gold" /> {p}
                </li>
              ))}
            </ul>
            <p className="mt-8 flex max-w-xl items-start gap-3 rounded-2xl bg-white/10 p-4 text-sm ring-1 ring-white/20">
              <Icons.shield className="mt-0.5 size-4 shrink-0 text-gold" />
              {l.warning}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="relative mx-auto w-full max-w-[480px] text-ink">
            <BrowserFrame>
              <DashboardScreen />
            </BrowserFrame>
            <span className="absolute -top-3 -right-2 rounded-full bg-gold px-3 py-1 text-xs font-bold text-ink shadow-lg sm:-right-4">
              Preview
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
