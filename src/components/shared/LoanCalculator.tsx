"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { AnimatedNumber, EASE } from "@/components/ui/motion";

export type LoanCalculatorConfig = {
  title: string;
  amountLabel: string;
  termLabel: string;
  rateNote: string;
  min: number;
  max: number;
  step: number;
  defaultAmount: number;
  terms: number[];
  defaultTerm: number;
  apr: number;
};

export function monthlyPayment(amount: number, months: number, apr: number) {
  const r = apr / 100 / 12;
  return (amount * r) / (1 - Math.pow(1 + r, -months));
}

/** Loan repayment estimator (dark card). Used on Home and /credit. */
export function LoanCalculator({
  config: c,
  id = "calculator",
}: {
  config: LoanCalculatorConfig;
  id?: string;
}) {
  const [amount, setAmount] = useState(c.defaultAmount);
  const [term, setTerm] = useState(c.defaultTerm);
  const monthly = useMemo(() => monthlyPayment(amount, term, c.apr), [amount, term, c.apr]);
  const total = monthly * term;
  const interestShare = ((total - amount) / total) * 100;
  const fill = ((amount - c.min) / (c.max - c.min)) * 100;

  return (
    <div
      className="rounded-[2rem] bg-navy/90 p-6 text-white ring-1 ring-white/10 backdrop-blur sm:p-8"
      id={id}
    >
      <h3 className="text-xl font-bold [font-stretch:110%]">{c.title}</h3>
      <label className="mt-6 block" htmlFor={`${id}-amount`}>
        <span className="flex items-baseline justify-between text-white/80">
          {c.amountLabel}
          <b className="font-display text-2xl text-white [font-stretch:105%]">
            <AnimatedNumber value={amount} prefix="$" startFromZero={false} duration={0.35} />
          </b>
        </span>
        <input
          id={`${id}-amount`}
          type="range"
          min={c.min}
          max={c.max}
          step={c.step}
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
          className="c2-range mt-4"
          style={{ ["--fill" as string]: `${fill}%` }}
        />
      </label>
      <fieldset className="mt-6">
        <legend className="text-white/80">{c.termLabel}</legend>
        <div className="mt-3 grid grid-cols-4 gap-2 rounded-full bg-white/10 p-1">
          {c.terms.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTerm(t)}
              aria-pressed={term === t}
              className={`relative h-10 rounded-full text-sm font-semibold transition-colors ${term === t ? "text-ink" : "text-white/80 hover:text-white"}`}
            >
              {term === t && (
                <motion.span
                  layoutId={`${id}-term-pill`}
                  className="absolute inset-0 rounded-full bg-gold"
                  transition={{ type: "spring", stiffness: 450, damping: 34 }}
                />
              )}
              <span className="relative">{t} mo</span>
            </button>
          ))}
        </div>
      </fieldset>
      <div className="mt-8 rounded-2xl bg-white/5 p-5">
        <p className="text-sm text-white/70">Estimated monthly repayment</p>
        <p className="font-display text-5xl font-extrabold text-gold [font-stretch:110%]" aria-live="polite">
          <AnimatedNumber value={monthly} prefix="$" decimals={2} startFromZero={false} duration={0.45} />
        </p>
        <div className="mt-4 flex h-2.5 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
          <motion.span
            className="h-full bg-white"
            animate={{ width: `${100 - interestShare}%` }}
            transition={{ duration: 0.5, ease: EASE }}
          />
          <motion.span
            className="h-full bg-gold"
            animate={{ width: `${interestShare}%` }}
            transition={{ duration: 0.5, ease: EASE }}
          />
        </div>
        <p className="mt-2 flex justify-between text-xs text-white/70">
          <span>Borrowed ${amount.toLocaleString("en-US")}</span>
          <span>Interest ${(total - amount).toLocaleString("en-US", { maximumFractionDigits: 0 })}</span>
        </p>
      </div>
      <p className="mt-4 text-xs text-white/60">{c.rateNote}</p>
    </div>
  );
}
