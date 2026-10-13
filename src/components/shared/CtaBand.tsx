"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic, Reveal, WordReveal } from "@/components/ui/motion";

/** Full-width closing call to action that grows into place as it scrolls in. */
export function CtaBand({
  id,
  title,
  cta,
  note,
}: {
  id: string;
  title: string;
  cta: { label: string; href: string };
  note?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [56, 0]);
  const slash = useTransform(scrollYProgress, [0, 1], [-120, 0]);
  return (
    <section ref={ref} aria-labelledby={id} className="bg-white">
      <motion.div
        className="relative overflow-hidden bg-brand px-5 py-28 text-center text-white sm:py-36"
        style={{ scale, borderRadius: radius }}
      >
        <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ x: slash }}>
          <span className="absolute -top-10 left-[12%] h-[140%] w-20 skew-x-[-40deg] bg-white/[0.06]" />
          <span className="absolute -top-10 left-[3%] h-[140%] w-8 skew-x-[-40deg] bg-gold/80" />
          <span className="absolute -top-10 right-[14%] h-[140%] w-28 skew-x-[-40deg] bg-white/[0.05]" />
        </motion.div>
        <WordReveal
          id={id}
          text={title}
          className="relative mx-auto max-w-4xl text-[clamp(2.2rem,5.4vw,4.6rem)] font-extrabold tracking-[-0.035em] [font-stretch:118%]"
        />
        <Reveal delay={0.2} className="relative mt-10 flex flex-col items-center gap-4">
          <Magnetic>
            <ButtonLink href={cta.href} variant="gold" size="lg" arrow>
              {cta.label}
            </ButtonLink>
          </Magnetic>
          {note && <p className="text-sm text-white/80">{note}</p>}
        </Reveal>
      </motion.div>
    </section>
  );
}
