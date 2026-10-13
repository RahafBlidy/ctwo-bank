"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { C2Mark } from "@/components/brand/C2Logo";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { Icons } from "@/components/ui/icons";
import { EASE } from "@/components/ui/motion";
import { NAV, NAV_SIMPLE, PROMO } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [promo, setPromo] = useState(true);
  const { scrollY } = useScroll();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("c2.promo.dismissed") === "1") setPromo(false);
    } catch {}
  }, []);

  // close menus on navigation
  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [pathname]);

  // Escape closes menus
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // lock page scroll behind the mobile menu
  useEffect(() => {
    document.documentElement.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 8);
    setHidden(y > 480 && y > prev && !open && !mobile);
  });

  function dismissPromo() {
    setPromo(false);
    try {
      sessionStorage.setItem("c2.promo.dismissed", "1");
    } catch {}
  }

  const openGroup = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  };

  const active = NAV.find((g) => g.label === open);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-gold px-4 py-2 font-semibold text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      <AnimatePresence initial={false}>
        {promo && (
          <motion.div
            className="overflow-hidden bg-navy text-white"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-12 py-2.5 text-center text-sm">
              <span className="rounded-full bg-gold px-2 py-0.5 text-[11px] font-bold tracking-wider text-ink uppercase">
                {PROMO.tag}
              </span>
              <span className="text-white/85">{PROMO.text}</span>
              <Link
                href={PROMO.href}
                className="group inline-flex items-center gap-1 font-semibold underline-offset-4 hover:underline"
              >
                {PROMO.cta} <Arrow />
              </Link>
              <button
                onClick={dismissPromo}
                aria-label="Dismiss announcement"
                className="absolute top-1/2 right-3 grid size-8 -translate-y-1/2 place-items-center rounded-full text-xl text-white/70 hover:bg-white/10 hover:text-white"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.header
        className={`sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300 ${
          scrolled || open
            ? "border-line bg-white/90 shadow-[0_8px_30px_-20px_rgb(6_20_51/0.35)] backdrop-blur-xl"
            : "border-transparent bg-white"
        }`}
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.35, ease: EASE }}
        onMouseLeave={scheduleClose}
      >
        <div className="mx-auto flex h-[var(--header-h)] max-w-7xl items-center gap-6 px-5 sm:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="C2 Banking System, home">
            <C2Mark className="h-7 w-auto" />
            <span className="hidden font-display text-[15px] leading-none font-bold tracking-tight text-ink [font-stretch:115%] sm:block">
              Banking
            </span>
          </Link>

          <nav aria-label="Main" className="ml-4 hidden h-full items-center gap-1 lg:flex">
            {NAV.map((g) => (
              <button
                key={g.label}
                className={`relative flex h-10 items-center gap-1 rounded-full px-3.5 text-[15px] font-medium transition-colors ${
                  open === g.label ? "bg-brand-50 text-brand" : "text-ink hover:bg-paper"
                }`}
                aria-expanded={open === g.label}
                aria-controls="mega-menu"
                onMouseEnter={() => openGroup(g.label)}
                onClick={() => setOpen(open === g.label ? null : g.label)}
              >
                {g.label}
                <motion.span animate={{ rotate: open === g.label ? 180 : 0 }} transition={{ duration: 0.25 }}>
                  <Icons.chevron className="size-4" />
                </motion.span>
              </button>
            ))}
            {NAV_SIMPLE.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onMouseEnter={scheduleClose}
                className="flex h-10 items-center rounded-full px-3.5 text-[15px] font-medium text-ink transition-colors hover:bg-paper"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="hidden h-10 items-center rounded-full px-3.5 text-[15px] font-medium text-ink hover:bg-paper sm:flex"
            >
              Log in
            </Link>
            <ButtonLink href="/open-account" size="sm">
              Open an account
            </ButtonLink>
            <button
              className="grid size-11 place-items-center rounded-full text-ink hover:bg-paper lg:hidden"
              onClick={() => setMobile(true)}
              aria-label="Open menu"
              aria-expanded={mobile}
            >
              <span className="flex w-5 flex-col gap-[5px]">
                <span className="h-0.5 rounded bg-current" />
                <span className="h-0.5 rounded bg-current" />
                <span className="h-0.5 w-3 rounded bg-current" />
              </span>
            </button>
          </div>
        </div>

        {/* Mega menu */}
        <AnimatePresence>
          {active && (
            <motion.div
              id="mega-menu"
              key="mega"
              className="absolute inset-x-0 top-full hidden border-t border-line bg-white shadow-[0_30px_60px_-30px_rgb(6_20_51/0.35)] lg:block"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: EASE }}
              onMouseEnter={() => openGroup(active.label)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.label}
                  className="mx-auto grid max-w-7xl grid-cols-[1fr_2fr_1.2fr] gap-10 px-8 py-9"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div>
                    <p className="font-display text-2xl font-bold text-ink [font-stretch:112%]">
                      {active.label}
                    </p>
                    <p className="mt-2 text-ink-2">{active.intro}</p>
                  </div>
                  <ul className="grid grid-cols-2 gap-2">
                    {active.links.map((l, i) => (
                      <motion.li
                        key={l.href}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.03 * i }}
                      >
                        <Link
                          href={l.href}
                          className="group block rounded-2xl p-4 transition-colors hover:bg-paper"
                        >
                          <span className="flex items-center gap-1.5 font-semibold text-ink group-hover:text-brand">
                            {l.label}
                            <Arrow className="opacity-0 group-hover:opacity-100" />
                          </span>
                          <span className="mt-0.5 block text-sm text-ink-2">{l.description}</span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                  {active.feature ? (
                    <Link
                      href={active.feature.href}
                      className="group relative overflow-hidden rounded-[var(--radius-card)] bg-brand p-6 text-white"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute right-6 -bottom-8 h-28 w-6 skew-x-[-40deg] rounded bg-gold/90"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute right-16 -bottom-8 h-28 w-6 skew-x-[-40deg] rounded bg-white/15"
                      />
                      <span className="relative block font-display text-xl font-bold [font-stretch:112%]">
                        {active.feature.title}
                      </span>
                      <span className="relative mt-2 block text-white/85">{active.feature.body}</span>
                      <span className="relative mt-5 inline-flex items-center gap-1.5 font-semibold">
                        {active.feature.cta} <Arrow />
                      </span>
                    </Link>
                  ) : (
                    <div />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <MobileMenu open={mobile} onClose={() => setMobile(false)} />
    </>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [group, setGroup] = useState<string | null>(null);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col bg-white lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={{ clipPath: "circle(0% at 94% 3%)" }}
          animate={{ clipPath: "circle(150% at 94% 3%)" }}
          exit={{ clipPath: "circle(0% at 94% 3%)" }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div className="flex h-[var(--header-h)] items-center justify-between border-b border-line px-5">
            <Link href="/" onClick={onClose} aria-label="C2 Banking System, home">
              <C2Mark className="h-7 w-auto" />
            </Link>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="grid size-11 place-items-center rounded-full text-3xl text-ink hover:bg-paper"
            >
              ×
            </button>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-4">
            {NAV.map((g, i) => (
              <motion.div
                key={g.label}
                className="border-b border-line"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + i * 0.05 }}
              >
                <button
                  className="flex w-full items-center justify-between py-4 text-left font-display text-2xl font-bold text-ink [font-stretch:112%]"
                  onClick={() => setGroup(group === g.label ? null : g.label)}
                  aria-expanded={group === g.label}
                >
                  {g.label}
                  <motion.span animate={{ rotate: group === g.label ? 180 : 0 }}>
                    <Icons.chevron className="size-6" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {group === g.label && (
                    <motion.ul
                      className="overflow-hidden"
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      {g.links.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} onClick={onClose} className="block py-2.5 pl-1">
                            <span className="block font-semibold text-ink">{l.label}</span>
                            <span className="block text-sm text-ink-2">{l.description}</span>
                          </Link>
                        </li>
                      ))}
                      <li className="h-3" />
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
            {[...NAV_SIMPLE, { label: "Log in", href: "/login" }].map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.27 + i * 0.05 }}
              >
                <Link
                  href={l.href}
                  onClick={onClose}
                  className="block border-b border-line py-4 font-display text-2xl font-bold text-ink [font-stretch:112%]"
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className="border-t border-line p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
            <ButtonLink href="/open-account" size="lg" className="w-full">
              Open an account
            </ButtonLink>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
