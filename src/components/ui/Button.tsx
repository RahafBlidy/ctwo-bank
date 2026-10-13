import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "gold" | "ghost" | "ghostLight" | "dark";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,color,box-shadow,transform] duration-200 active:scale-[0.97] focus-visible:outline-3";
const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-600 shadow-[0_10px_30px_-12px_rgb(1_82_251/0.7)]",
  gold: "bg-gold text-ink hover:brightness-105 shadow-[0_10px_30px_-12px_rgb(230_188_70/0.8)]",
  ghost: "text-ink ring-1 ring-inset ring-line bg-surface hover:ring-ink-2",
  ghostLight: "text-white ring-1 ring-inset ring-white/35 hover:ring-white hover:bg-white/5",
  dark: "bg-navy text-white hover:bg-navy-800",
};
const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-7 text-base",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`transition-transform duration-200 group-hover:translate-x-0.5 ${className}`}
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`mb-4 flex items-center gap-2 text-[13px] font-bold tracking-[0.14em] uppercase ${light ? "text-white" : "text-brand"}`}
    >
      <span aria-hidden="true" className="inline-block h-[3px] w-5 -skew-x-[40deg] rounded-sm bg-gold" />
      {children}
    </p>
  );
}
