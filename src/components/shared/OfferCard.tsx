"use client";

import { motion } from "motion/react";
import { Icons } from "@/components/ui/icons";
import { EASE } from "@/components/ui/motion";

/** Illustrative "loan offer" mock for the /credit hero. Figures match the calculator defaults (9.9% APR). */
export function OfferCard() {
  const rows: [string, string][] = [
    ["Amount", "$25,000"],
    ["Term", "24 months"],
    ["Representative APR", "9.9%"],
    ["Monthly repayment", "$1,152.47"],
  ];
  return (
    <div className="relative w-full max-w-sm">
      <motion.div
        className="rounded-3xl bg-white p-6 text-ink shadow-xl"
        initial={{ rotate: -3 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-muted">Your loan offer</p>
          <motion.span
            className="flex items-center gap-1.5 rounded-full bg-positive/10 px-2.5 py-1 text-xs font-bold text-positive"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, type: "spring", stiffness: 300, damping: 18 }}
          >
            <Icons.check className="size-3.5" /> Approved
          </motion.span>
        </div>
        <dl className="mt-5 grid gap-3">
          {rows.map(([k, v], i) => (
            <motion.div
              key={k}
              className="flex justify-between border-b border-line pb-3 text-sm last:border-0"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease: EASE }}
            >
              <dt className="text-ink-2">{k}</dt>
              <dd className="tabular font-semibold">{v}</dd>
            </motion.div>
          ))}
        </dl>
        <div className="mt-4 rounded-2xl bg-brand p-3 text-center text-sm font-semibold text-white">
          Accept offer
        </div>
        <p className="mt-3 text-center text-xs text-muted">Illustrative example</p>
      </motion.div>
    </div>
  );
}
