"use client";

import { type ElementType, type ReactNode, useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade + rise on scroll into view. Content is visible without JS (initial state set only after hydration). */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Heading that reveals word by word. */
export function WordReveal({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  onView = true,
  id,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  onView?: boolean;
  id?: string;
}) {
  const words = text.split(" ");
  const trigger = onView
    ? { whileInView: "show", viewport: { once: true, margin: "-60px" } }
    : { animate: "show" };
  return (
    <Tag className={className} id={id}>
      <motion.span initial="hidden" {...trigger} className="inline">
        {words.map((w, i) => (
          <span key={i}>
            <span className="word-mask">
              <motion.span
                variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
                transition={{ duration: 0.75, ease: EASE, delay: delay + i * 0.045 }}
              >
                {w}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/** Number that counts up when first seen, then animates between values. */
export function AnimatedNumber({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 0.9,
  startFromZero = true,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  startFromZero?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const from = useRef(startFromZero ? 0 : value);
  const [display, setDisplay] = useState(startFromZero ? 0 : value);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(from.current, value, { duration, ease: EASE, onUpdate: setDisplay });
    from.current = value;
    return () => controls.stop();
  }, [value, inView, duration]);

  return (
    <span ref={ref} className="tabular">
      {prefix}
      {display.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

/** Wrapper that is gently pulled toward the cursor (desktop pointer only). */
export function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 240, damping: 18 });
  const sy = useSpring(y, { stiffness: 240, damping: 18 });
  const ix = useTransform(sx, (v) => v * 0.35);
  const iy = useTransform(sy, (v) => v * 0.35);
  return (
    <motion.span
      ref={ref}
      className="inline-flex"
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.span className="inline-flex" style={{ x: ix, y: iy }}>
        {children}
      </motion.span>
    </motion.span>
  );
}
