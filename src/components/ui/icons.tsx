// Small inline icon set (stroke icons, currentColor). Decorative: aria-hidden.
type P = { className?: string };
const s = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const Icons = {
  payments: ({ className }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path {...s} d="M4 8h13l-3-3M20 16H7l3 3" />
    </svg>
  ),
  invoices: ({ className }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path {...s} d="M7 3h10v18l-2.5-1.5L12 21l-2.5-1.5L7 21zM10 8h4M10 12h4" />
    </svg>
  ),
  cards: ({ className }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect {...s} x="3" y="6" width="18" height="12" rx="2.5" />
      <path {...s} d="M3 10h18M7 15h3" />
    </svg>
  ),
  accounting: ({ className }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path {...s} d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </svg>
  ),
  support: ({ className }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        {...s}
        d="M5 18v-5a7 7 0 0 1 14 0v5M5 18a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2M19 18a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2M19 18c0 2-2 3-5 3"
      />
    </svg>
  ),
  savings: ({ className }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        {...s}
        d="M4 11a8 6 0 0 1 15-2l2-1v4l-2 1a8 6 0 0 1-3 4v3h-3v-2h-3v2H7v-3a6 6 0 0 1-3-6zM15 10h.01"
      />
    </svg>
  ),
  shield: ({ className }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path {...s} d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4" />
    </svg>
  ),
  lock: ({ className }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect {...s} x="5" y="11" width="14" height="10" rx="2" />
      <path {...s} d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  ),
  bell: ({ className }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path {...s} d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 21h4" />
    </svg>
  ),
  check: ({ className }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path {...s} strokeWidth={2.4} d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  ),
  chevron: ({ className }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path {...s} d="M6 9l6 6 6-6" />
    </svg>
  ),
  plus: ({ className }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path {...s} strokeWidth={2.2} d="M12 5v14M5 12h14" />
    </svg>
  ),
};
