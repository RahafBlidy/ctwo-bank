"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { C2Mark } from "@/components/brand/C2Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Icons } from "@/components/ui/icons";
import { AnimatedNumber, EASE, Magnetic } from "@/components/ui/motion";
import { HOME } from "@/content/home";

const { hero } = HOME;

const TX = [
  { name: "Invoice #2041 · Atlas Studio", amount: 1840, kind: "in" },
  { name: "Office rent", amount: -950, kind: "out" },
  { name: "Tax pot · 20%", amount: -368, kind: "pot" },
  { name: "Card · Software", amount: -49.99, kind: "out" },
  { name: "Card reader takings", amount: 612.4, kind: "in" },
] as const;

export function DashboardScreen() {
  const [balance, setBalance] = useState(24860.35);
  const [toast, setToast] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setToast(true), 1900);
    const t2 = setTimeout(() => setBalance((b) => b + 1840), 2200);
    const t3 = setTimeout(() => setToast(false), 5600);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);
  return (
    <div className="relative h-full bg-gradient-to-b from-white to-paper px-5 pt-5 pb-4 text-ink">
      <div className="flex items-center gap-2">
        <span className="grid size-7 place-items-center rounded-full bg-brand text-[10px] font-bold text-white">
          AS
        </span>
        <span className="text-[13px] font-semibold">Atlas Studio Ltd</span>
        <span className="ml-auto size-2 rounded-full bg-gold" aria-hidden="true" />
      </div>
      <p className="mt-5 text-[11px] text-muted">Business account</p>
      <p className="font-display text-[30px] leading-tight font-bold tracking-tight [font-stretch:105%]">
        <AnimatedNumber value={balance} decimals={2} prefix="$" startFromZero={false} duration={1.2} />
      </p>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {(["Pay", "Invoice", "Pots", "Cards"] as const).map((a, i) => (
          <motion.span
            key={a}
            className="flex flex-col items-center gap-1 text-[10.5px] text-ink-2"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + i * 0.07, type: "spring", stiffness: 320, damping: 18 }}
          >
            <span
              className={`grid size-10 place-items-center rounded-2xl ${i === 0 ? "bg-brand text-white" : "bg-brand-50 text-brand"}`}
            >
              {i === 0 ? (
                <Icons.payments className="size-5" />
              ) : i === 1 ? (
                <Icons.invoices className="size-5" />
              ) : i === 2 ? (
                <Icons.savings className="size-5" />
              ) : (
                <Icons.cards className="size-5" />
              )}
            </span>
            {a}
          </motion.span>
        ))}
      </div>
      <p className="mt-5 mb-1 text-[10px] font-semibold tracking-wider text-muted uppercase">Today</p>
      <ul>
        {TX.map((t, i) => (
          <motion.li
            key={t.name}
            className="flex items-center gap-2.5 border-b border-line py-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 + i * 0.08, duration: 0.6, ease: EASE }}
          >
            <span
              className={`grid size-7 shrink-0 place-items-center rounded-xl text-[11px] font-bold ${
                t.kind === "in"
                  ? "bg-positive/10 text-positive"
                  : t.kind === "pot"
                    ? "bg-gold-100 text-ink"
                    : "bg-paper text-ink-2"
              }`}
            >
              {t.kind === "in" ? "↙" : t.kind === "pot" ? "◔" : "↗"}
            </span>
            <span className="min-w-0 flex-1 truncate text-[11.5px]">{t.name}</span>
            <span className={`tabular text-[11.5px] font-semibold ${t.amount > 0 ? "text-positive" : ""}`}>
              {t.amount > 0 ? "+" : "−"}$
              {Math.abs(t.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </motion.li>
        ))}
      </ul>
      <AnimatePresence>
        {toast && (
          <motion.div
            className="absolute inset-x-3 top-3 z-10 flex items-center gap-2.5 rounded-2xl bg-navy p-3 text-white shadow-xl"
            initial={{ y: -70, opacity: 0, scale: 0.92 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -70, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            role="status"
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gold text-ink">
              <Icons.check className="size-4" />
            </span>
            <span>
              <b className="block text-[12.5px]">Invoice paid</b>
              <span className="text-[11px] text-white/75">Atlas Studio received $1,840.00</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Browser window frame: C2 is online banking only (no mobile apps). */
export function BrowserFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-[22px] bg-navy shadow-[0_50px_100px_-30px_rgb(6_20_51/0.65)] ring-1 ring-white/20 ${className}`}
    >
      <div className="flex items-center gap-3 px-4 py-3" aria-hidden="true">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-white/25" />
          <span className="size-2.5 rounded-full bg-white/25" />
          <span className="size-2.5 rounded-full bg-gold" />
        </span>
        <span className="flex h-7 flex-1 items-center justify-center gap-1.5 rounded-full bg-white/10 text-[11px] font-semibold text-white/80">
          <Icons.lock className="size-3" />
          C2 Online Banking
        </span>
      </div>
      <div className="h-[470px] overflow-hidden rounded-t-[14px] bg-white">{children}</div>
    </div>
  );
}

export function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % hero.rotating.length), 2400);
    return () => clearInterval(t);
  }, []);

  // pointer parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 16 });
  const sy = useSpring(my, { stiffness: 60, damping: 16 });
  const cardX = useTransform(sx, (v) => v * 26);
  const cardY = useTransform(sy, (v) => v * 26);
  const chipX = useTransform(sx, (v) => v * -30);
  const chipY = useTransform(sy, (v) => v * -30);
  const rotY = useTransform(sx, (v) => v * 8);
  const rotX = useTransform(sy, (v) => v * -8);

  // scroll: visual lifts, slashes drift
  const { scrollY } = useScroll();
  const lift = useTransform(scrollY, [0, 600], [0, -70]);
  const slashShift = useTransform(scrollY, [0, 600], [0, 120]);

  return (
    <section
      className="relative overflow-hidden bg-brand text-white"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {/* The logo's slash, as a background motif */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ x: slashShift }}
      >
        {[
          { l: "70%", t: "-20%", h: "140%", w: 140, c: "bg-white/[0.06]", d: 0.1 },
          { l: "86%", t: "-20%", h: "140%", w: 56, c: "bg-white/[0.07]", d: 0.3 },
          { l: "75%", t: "4%", h: "42%", w: 36, c: "hidden bg-gold lg:block", d: 0.45 },
        ].map((s, k) => (
          <motion.span
            key={k}
            className={`absolute rounded-md ${s.c}`}
            style={{ left: s.l, top: s.t, height: s.h, width: s.w, skewX: -40, originY: 0 }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.4, ease: EASE, delay: s.d }}
          />
        ))}
      </motion.div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pt-16 pb-24 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:pt-24 lg:pb-32">
        <div>
          <motion.p
            className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[13px] font-semibold tracking-wide ring-1 ring-white/20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="size-2 rounded-full bg-gold" aria-hidden="true" /> {hero.eyebrow}
          </motion.p>
          <h1 className="text-[clamp(2.5rem,5.4vw,4.6rem)] font-extrabold tracking-[-0.035em] [font-stretch:112%]">
            {hero.titleLead.split(" ").map((w, k) => (
              <span key={k}>
                <span className="word-mask">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.1 + k * 0.08 }}
                  >
                    {w}
                  </motion.span>
                </span>{" "}
              </span>
            ))}
            <span className="relative mt-[0.06em] block h-[1.15em] overflow-hidden text-gold [font-size:min(1em,9vw)]">
              <AnimatePresence initial={false}>
                <motion.span
                  key={hero.rotating[i]}
                  className="absolute left-0 whitespace-nowrap"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.55, ease: EASE }}
                >
                  {hero.rotating[i]}
                </motion.span>
              </AnimatePresence>
              <span className="invisible">{hero.rotating[0]}</span>
            </span>
          </h1>
          <motion.p
            className="mt-6 max-w-xl text-lg text-white/85 sm:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
          >
            {hero.body}
          </motion.p>
          <motion.div
            className="mt-9 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.65 }}
          >
            <Magnetic>
              <ButtonLink href={hero.primaryCta.href} variant="gold" size="lg" arrow>
                {hero.primaryCta.label}
              </ButtonLink>
            </Magnetic>
            <ButtonLink href={hero.secondaryCta.href} variant="ghostLight" size="lg">
              {hero.secondaryCta.label}
            </ButtonLink>
          </motion.div>
          <motion.ul
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-white/80"
            initial="h"
            animate="s"
            variants={{ s: { transition: { staggerChildren: 0.08, delayChildren: 0.85 } } }}
          >
            {hero.ticks.map((t) => (
              <motion.li
                key={t}
                className="flex items-center gap-2"
                variants={{ h: { opacity: 0, x: -8 }, s: { opacity: 1, x: 0 } }}
              >
                <Icons.check className="size-4 text-gold" /> {t}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <div className="relative mx-auto flex h-[600px] w-full max-w-[480px] items-center justify-center">
          <motion.div
            className="w-full"
            style={{ y: lift }}
            initial={{ opacity: 0, y: 80, rotate: 5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
          >
            <motion.div style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 900 }}>
              <BrowserFrame>
                <DashboardScreen />
              </BrowserFrame>
            </motion.div>
          </motion.div>

          {/* floating card */}
          <motion.div
            className="absolute -bottom-2 -left-2 z-10 sm:-left-6"
            style={{ x: cardX, y: cardY }}
            initial={{ opacity: 0, scale: 0.7, rotate: -18 }}
            animate={{ opacity: 1, scale: 1, rotate: -10 }}
            transition={{ delay: 0.9, type: "spring", stiffness: 120, damping: 14 }}
          >
            <div className="relative h-[120px] w-[196px] overflow-hidden rounded-2xl bg-navy p-4 shadow-2xl ring-1 ring-white/15">
              <span
                aria-hidden="true"
                className="absolute -top-4 right-10 h-40 w-5 skew-x-[-40deg] bg-gold"
              />
              <span
                aria-hidden="true"
                className="absolute -top-4 right-[68px] h-40 w-3 skew-x-[-40deg] bg-white/10"
              />
              <C2Mark tone="onDark" className="relative h-5 w-auto" />
              <span className="absolute bottom-4 left-4 text-[12px] font-semibold tracking-[0.18em] text-white/90">
                •••• 2041
              </span>
            </div>
          </motion.div>

          {/* floating chip */}
          <motion.div
            className="absolute top-[46%] -right-1 z-10 flex items-center gap-2.5 rounded-2xl bg-navy p-3 pr-4 text-white shadow-xl ring-1 ring-white/15 sm:-right-6"
            style={{ x: chipX, y: chipY }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, type: "spring", stiffness: 120, damping: 14 }}
          >
            <svg viewBox="0 0 36 36" className="size-10 -rotate-90" aria-hidden="true">
              <circle cx="18" cy="18" r="15" fill="none" stroke="rgb(255 255 255 / 0.2)" strokeWidth="4" />
              <motion.circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="var(--color-gold)"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 0.72 }}
                transition={{ delay: 1.4, duration: 1.4, ease: EASE }}
              />
            </svg>
            <span>
              <b className="block text-sm">Tax pot</b>
              <span className="text-xs text-white/75">$4,820 set aside</span>
            </span>
          </motion.div>
        </div>
      </div>

      {/* curved bottom edge */}
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
