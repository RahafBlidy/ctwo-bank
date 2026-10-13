"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { Eyebrow } from "@/components/ui/Button";
import { Icons } from "@/components/ui/icons";
import { EASE, WordReveal } from "@/components/ui/motion";
import { HOME } from "@/content/home";

const { essentials } = HOME;
const CYCLE_MS = 5000;
type Key = (typeof essentials.items)[number]["key"];

export type PanelKey = Key | "savings";

/** Animated product mock for a feature. Reused by /features/[slug]. */
export function FeaturePanel({ k }: { k: PanelKey }) {
  if (k === "savings")
    return (
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl">
        <p className="text-sm font-semibold text-muted">Savings pots</p>
        {[
          { n: "Tax", v: 4820, max: 6000, c: "bg-brand" },
          { n: "VAT", v: 1960, max: 3000, c: "bg-gold" },
          { n: "Rainy day", v: 2400, max: 5000, c: "bg-navy" },
        ].map((pot, i) => (
          <div key={pot.n} className="mt-5">
            <div className="flex justify-between text-sm">
              <b>{pot.n}</b>
              <span className="tabular text-ink-2">
                ${pot.v.toLocaleString("en-US")} of ${pot.max.toLocaleString("en-US")}
              </span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-paper">
              <motion.span
                className={`block h-full rounded-full ${pot.c}`}
                initial={{ width: 0 }}
                animate={{ width: `${(pot.v / pot.max) * 100}%` }}
                transition={{ delay: 0.15 + i * 0.12, duration: 0.9, ease: EASE }}
              />
            </div>
          </div>
        ))}
        <div className="mt-6 rounded-2xl bg-gold-100 p-3 text-sm font-semibold">
          Auto-save 20% of every payment into Tax
        </div>
      </div>
    );
  if (k === "payments")
    return (
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl">
        <p className="text-sm font-semibold text-muted">Send money</p>
        <p className="mt-1 font-display text-4xl font-bold [font-stretch:105%]">$2,450.00</p>
        <div className="mt-5 grid gap-3">
          {["Northwind Supplies", "Cedar Logistics", "Bright Print Co."].map((n, i) => (
            <motion.div
              key={n}
              className="flex items-center gap-3 rounded-2xl bg-paper p-3"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.1, ease: EASE, duration: 0.5 }}
            >
              <span className="grid size-9 place-items-center rounded-full bg-brand-50 text-xs font-bold text-brand">
                {n.slice(0, 2).toUpperCase()}
              </span>
              <span className="flex-1 text-sm font-semibold">{n}</span>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${i === 0 ? "bg-positive/10 text-positive" : "bg-brand-50 text-brand"}`}
              >
                {i === 0 ? "Sent" : "Scheduled"}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    );
  if (k === "invoices")
    return (
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-muted">Invoice #2041</p>
            <p className="font-semibold">Atlas Studio</p>
          </div>
          <span className="rounded-full bg-gold-100 px-2.5 py-1 text-xs font-bold">Due in 7 days</span>
        </div>
        <div className="mt-5 grid gap-2 text-sm">
          {[
            ["Brand identity", "$1,400.00"],
            ["Website copy", "$440.00"],
          ].map(([a, b]) => (
            <div key={a} className="flex justify-between border-b border-line pb-2">
              <span className="text-ink-2">{a}</span>
              <span className="tabular font-semibold">{b}</span>
            </div>
          ))}
          <div className="flex justify-between pt-1 text-base font-bold">
            <span>Total</span>
            <span className="tabular">$1,840.00</span>
          </div>
        </div>
        <div className="mt-5 flex justify-between text-xs font-semibold">
          {["Sent", "Viewed", "Paid"].map((s, i) => (
            <motion.span
              key={s}
              className="flex items-center gap-1.5"
              initial={{ opacity: 0.25 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.5 }}
            >
              <span className={`size-2.5 rounded-full ${i === 2 ? "bg-positive" : "bg-brand"}`} /> {s}
            </motion.span>
          ))}
        </div>
        <div className="mt-4 rounded-2xl bg-brand p-3 text-center text-sm font-semibold text-white">
          Pay $1,840.00 by card
        </div>
      </div>
    );
  if (k === "cards")
    return (
      <div className="relative h-[300px] w-full max-w-sm">
        {[
          { bg: "bg-navy", label: "Marketing · $640 / $1,000", r: -8, y: 0 },
          { bg: "bg-brand", label: "Travel · $220 / $800", r: 0, y: 70 },
          { bg: "bg-gold", label: "Software · $312 / $400", r: 7, y: 140, dark: true },
        ].map((c, i) => (
          <motion.div
            key={c.label}
            className={`absolute left-1/2 h-[150px] w-[260px] -translate-x-1/2 overflow-hidden rounded-2xl p-4 shadow-xl ${c.bg} ${c.dark ? "text-ink" : "text-white"}`}
            style={{ top: c.y }}
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: c.r }}
            transition={{ delay: i * 0.12, type: "spring", stiffness: 160, damping: 18 }}
          >
            <span
              aria-hidden="true"
              className={`absolute -top-6 right-8 h-48 w-4 skew-x-[-40deg] ${c.dark ? "bg-white/40" : "bg-gold/80"}`}
            />
            <span className="relative text-sm font-semibold">{c.label}</span>
          </motion.div>
        ))}
      </div>
    );
  if (k === "accounting")
    return (
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl">
        <p className="text-sm font-semibold text-muted">Spending by category · this month</p>
        <div className="mt-6 flex h-40 items-end gap-3">
          {[62, 40, 85, 30, 55, 72].map((h, i) => (
            <motion.span
              key={i}
              className={`flex-1 rounded-t-lg ${i === 2 ? "bg-gold" : "bg-brand"}`}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.7, ease: EASE }}
            />
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-positive/10 p-3 text-sm font-semibold text-positive">
          <Icons.check className="size-4" /> 128 transactions synced last night
        </div>
      </div>
    );
  return (
    <div className="grid w-full max-w-sm gap-3">
      {[
        { me: false, t: "Hi! I need to add a second director to our account." },
        {
          me: true,
          t: "Happy to help. Go to Settings → Team and click “Invite”. I can stay with you while you do it.",
        },
        { me: false, t: "Done, thank you!" },
      ].map((m, i) => (
        <motion.p
          key={i}
          className={`max-w-[85%] rounded-3xl px-4 py-3 text-[15px] shadow-md ${m.me ? "justify-self-start rounded-bl-md bg-brand text-white" : "justify-self-end rounded-br-md bg-white"}`}
          initial={{ opacity: 0, y: 14, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.15 + i * 0.45, duration: 0.45, ease: EASE }}
        >
          {m.t}
        </motion.p>
      ))}
    </div>
  );
}

const ICON: Record<Key, (p: { className?: string }) => React.ReactElement> = {
  payments: Icons.payments,
  invoices: Icons.invoices,
  cards: Icons.cards,
  accounting: Icons.accounting,
  support: Icons.support,
};

export function Essentials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });

  useEffect(() => {
    if (paused || !inView) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % essentials.items.length), CYCLE_MS);
    return () => clearTimeout(t);
  }, [active, paused, inView]);

  const item = essentials.items[active];

  return (
    <section ref={ref} className="py-[var(--space-section)]" aria-labelledby="essentials-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Eyebrow>{essentials.eyebrow}</Eyebrow>
        <WordReveal
          id="essentials-title"
          text={essentials.title}
          className="max-w-3xl text-[clamp(2rem,4.4vw,3.6rem)] font-extrabold"
        />
        <div
          className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_1.05fr]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <ul role="tablist" aria-label="Business tools" className="grid gap-2">
            {essentials.items.map((it, idx) => {
              const on = idx === active;
              const Ico = ICON[it.key];
              return (
                <li key={it.key}>
                  <button
                    role="tab"
                    id={`ess-tab-${it.key}`}
                    aria-selected={on}
                    aria-controls="ess-panel"
                    onClick={() => setActive(idx)}
                    className={`relative w-full overflow-hidden rounded-3xl p-5 text-left transition-colors duration-300 ${on ? "bg-white shadow-[0_20px_50px_-30px_rgb(6_20_51/0.45)]" : "hover:bg-white/60"}`}
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className={`grid size-11 shrink-0 place-items-center rounded-2xl transition-colors ${on ? "bg-brand text-white" : "bg-brand-50 text-brand"}`}
                      >
                        <Ico className="size-5" />
                      </span>
                      <span className="font-display text-xl font-bold [font-stretch:110%]">{it.title}</span>
                    </span>
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.span
                          className="block overflow-hidden pl-[60px] text-ink-2"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                        >
                          <span className="block pt-2">{it.body}</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {on && (
                      <motion.span
                        key={`${active}-${paused}`}
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 h-[3px] bg-gold"
                        initial={{ width: "0%" }}
                        animate={{ width: paused ? "0%" : "100%" }}
                        transition={{ duration: paused ? 0 : CYCLE_MS / 1000, ease: "linear" }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
          <div
            id="ess-panel"
            role="tabpanel"
            aria-labelledby={`ess-tab-${item.key}`}
            className="relative grid min-h-[440px] place-items-center overflow-hidden rounded-[2rem] bg-brand-50 p-8"
          >
            <span
              aria-hidden="true"
              className="absolute -top-10 left-[18%] h-[130%] w-14 skew-x-[-40deg] bg-white/70"
            />
            <span
              aria-hidden="true"
              className="absolute -top-10 left-[30%] h-[130%] w-6 skew-x-[-40deg] bg-gold/60"
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={item.key}
                className="relative flex w-full justify-center"
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <FeaturePanel k={item.key} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
