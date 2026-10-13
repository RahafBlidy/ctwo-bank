"use client";

import type { ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ButtonLink } from "@/components/ui/Button";
import { EASE, Magnetic } from "@/components/ui/motion";

type Cta = { label: string; href: string };

/** Inner-page hero: brand-blue band, word-reveal h1, optional visual on the right. */
export function PageHero({
  eyebrow,
  title,
  body,
  primary,
  secondary,
  visual,
  children,
}: {
  eyebrow: string;
  title: string;
  body: string;
  primary?: Cta;
  secondary?: Cta;
  visual?: ReactNode;
  children?: ReactNode;
}) {
  const { scrollY } = useScroll();
  const drift = useTransform(scrollY, [0, 500], [0, 90]);
  const lift = useTransform(scrollY, [0, 500], [0, -50]);
  const words = title.split(" ");
  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ x: drift }}>
        {[
          { l: "68%", t: "-20%", h: "140%", w: 130, c: "bg-white/[0.06]", d: 0.1 },
          { l: "84%", t: "-20%", h: "140%", w: 50, c: "bg-white/[0.07]", d: 0.25 },
          { l: "76%", t: "6%", h: "38%", w: 30, c: "hidden bg-gold lg:block", d: 0.4 },
        ].map((s, k) => (
          <motion.span
            key={k}
            className={`absolute rounded-md ${s.c}`}
            style={{ left: s.l, top: s.t, height: s.h, width: s.w, skewX: -40, originY: 0 }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.3, ease: EASE, delay: s.d }}
          />
        ))}
      </motion.div>
      <div
        className={`relative mx-auto grid max-w-7xl items-center gap-12 px-5 pt-14 pb-20 sm:px-8 lg:pt-20 lg:pb-28 ${visual ? "lg:grid-cols-[1.05fr_0.95fr]" : ""}`}
      >
        <div className={visual ? "" : "max-w-3xl"}>
          <motion.p
            className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[13px] font-semibold tracking-wide ring-1 ring-white/20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="size-2 rounded-full bg-gold" aria-hidden="true" /> {eyebrow}
          </motion.p>
          <h1 className="text-[clamp(2.3rem,5vw,4.2rem)] font-extrabold tracking-[-0.03em] [font-stretch:112%]">
            {words.map((w, k) => (
              <span key={k}>
                <span className="word-mask">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.85, ease: EASE, delay: 0.08 + k * 0.06 }}
                  >
                    {w}
                  </motion.span>
                </span>
                {k < words.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>
          <motion.p
            className="mt-6 max-w-xl text-lg text-white/85 sm:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
          >
            {body}
          </motion.p>
          {(primary || secondary) && (
            <motion.div
              className="mt-9 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
            >
              {primary && (
                <Magnetic>
                  <ButtonLink href={primary.href} variant="gold" size="lg" arrow>
                    {primary.label}
                  </ButtonLink>
                </Magnetic>
              )}
              {secondary && (
                <ButtonLink href={secondary.href} variant="ghostLight" size="lg">
                  {secondary.label}
                </ButtonLink>
              )}
            </motion.div>
          )}
          {children}
        </div>
        {visual && (
          <motion.div
            className="relative flex justify-center text-ink"
            style={{ y: lift }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          >
            {visual}
          </motion.div>
        )}
      </div>
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="absolute bottom-[-1px] left-0 h-10 w-full sm:h-14"
      >
        <path d="M0 60V20C320 60 1120 60 1440 20V60Z" fill="var(--color-paper)" />
      </svg>
    </section>
  );
}
