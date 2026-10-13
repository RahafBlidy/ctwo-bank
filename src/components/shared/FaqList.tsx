"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Icons } from "@/components/ui/icons";
import { EASE } from "@/components/ui/motion";

export type FaqItem = { q: string; a: string };

/** Accordion list of questions. `idPrefix` keeps ids unique when several lists share a page. */
export function FaqList({ items, idPrefix }: { items: readonly FaqItem[]; idPrefix: string }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="border-t border-line">
      {items.map((f, i) => {
        const on = open === i;
        return (
          <div key={f.q} className="border-b border-line">
            <h3 className="font-sans text-lg font-semibold tracking-normal [font-stretch:100%]">
              <button
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
                onClick={() => setOpen(on ? -1 : i)}
                aria-expanded={on}
                aria-controls={`${idPrefix}-a-${i}`}
                id={`${idPrefix}-q-${i}`}
              >
                {f.q}
                <motion.span
                  className={`grid size-9 shrink-0 place-items-center rounded-full ring-1 transition-colors ${on ? "bg-gold text-ink ring-gold" : "ring-line"}`}
                  animate={{ rotate: on ? 45 : 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                >
                  <Icons.plus className="size-4" />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  id={`${idPrefix}-a-${i}`}
                  role="region"
                  aria-labelledby={`${idPrefix}-q-${i}`}
                  className="overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <p className="max-w-[60ch] pb-6 text-ink-2">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
