"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Applies the user's "reduce motion" OS setting to every animation (docs/DESIGN.md §5). */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
