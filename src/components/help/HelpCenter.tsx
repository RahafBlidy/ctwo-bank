"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FaqList } from "@/components/shared/FaqList";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Icons } from "@/components/ui/icons";
import { EASE } from "@/components/ui/motion";
import { HELP } from "@/content/help";

const ALL = "all";

/** Search box shown in the hero; filters the answers in HelpTopics. */
export function HelpSearch({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const t = HELP.search;
  return (
    <motion.form
      role="search"
      className="relative mt-9 max-w-xl"
      onSubmit={(e) => {
        e.preventDefault();
        document.getElementById("topics")?.scrollIntoView({ behavior: "smooth" });
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
    >
      <label htmlFor="help-search" className="sr-only">
        {t.label}
      </label>
      <svg
        viewBox="0 0 24 24"
        className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-ink-2"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="m16 16 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        id="help-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t.placeholder}
        autoComplete="off"
        className="h-14 w-full rounded-full bg-white pr-5 pl-13 text-base text-ink shadow-[0_20px_40px_-20px_rgb(6_20_51/0.6)] outline-none placeholder:text-muted focus-visible:ring-4 focus-visible:ring-gold"
      />
    </motion.form>
  );
}

/** Topic pills + filtered answers. */
export function HelpTopics({ query }: { query: string }) {
  const t = HELP.search;
  const [topic, setTopic] = useState<string>(ALL);
  const q = query.trim().toLowerCase();

  const items = useMemo(() => {
    const pool = HELP.topics.filter((x) => topic === ALL || x.id === topic).flatMap((x) => x.faq);
    return q ? pool.filter((f) => `${f.q} ${f.a}`.toLowerCase().includes(q)) : pool;
  }, [topic, q]);

  const pills = [{ id: ALL, label: t.all, icon: null }, ...HELP.topics];

  return (
    <div>
      <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
        {pills.map((p) => {
          const on = topic === p.id;
          const Ico = p.icon ? Icons[p.icon] : null;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setTopic(p.id)}
              aria-pressed={on}
              className={`relative inline-flex h-11 items-center gap-2 rounded-full px-4 text-[15px] font-semibold transition-colors ${on ? "text-white" : "bg-white text-ink-2 ring-1 ring-line hover:text-ink"}`}
            >
              {on && (
                <motion.span
                  layoutId="help-topic-pill"
                  className="absolute inset-0 rounded-full bg-brand"
                  transition={{ type: "spring", stiffness: 450, damping: 34 }}
                />
              )}
              {Ico && <Ico className="relative size-4" />}
              <span className="relative">{p.label}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-ink-2" aria-live="polite">
        {t.results(items.length)}
      </p>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${topic}|${q}`}
          className="mt-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          {items.length ? (
            <FaqList items={items} idPrefix="help" />
          ) : (
            <p className="rounded-[var(--radius-card)] bg-white p-8 text-ink-2 ring-1 ring-line">{t.empty}</p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/** Hero + answers, sharing the search text. The static sections around it are rendered by the page. */
export function HelpView({ children }: { children?: React.ReactNode }) {
  const [query, setQuery] = useState("");
  return (
    <>
      <PageHero {...HELP.hero}>
        <HelpSearch value={query} onChange={setQuery} />
      </PageHero>
      <section id="topics" className="scroll-mt-24 py-[var(--space-section)]" aria-labelledby="topics-title">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <SectionHeading id="topics-title" eyebrow={HELP.topicsEyebrow} title={HELP.topicsTitle} />
          <HelpTopics query={query} />
        </div>
      </section>
      {children}
    </>
  );
}
