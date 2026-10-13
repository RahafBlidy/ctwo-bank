// Plans and fees. Mirrors docs/content/page-copy/pricing.md — change both together.
// D-11 (open): prices are the current lean and are always labelled "example pricing" on the page.

export type Plan = {
  id: "free" | "plus" | "pro";
  name: string;
  tagline: string;
  monthly: number; // USD per month, billed monthly
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
};

export const YEARLY_DISCOUNT = 0.2; // 20% off when billed yearly

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "For getting started",
    monthly: 0,
    features: [
      "Business account with a virtual card",
      "20 free local transfers a month",
      "5 invoices a month with pay-by-link",
      "1 savings pot",
      "Online support, 7 days a week",
    ],
    cta: { label: "Join the waitlist", href: "/open-account" },
  },
  {
    id: "plus",
    name: "Plus",
    tagline: "For growing businesses",
    monthly: 12,
    features: [
      "Everything in Free",
      "Unlimited local transfers",
      "Unlimited invoices and automatic reminders",
      "5 team cards with spending limits",
      "Unlimited pots and auto-save rules",
      "Accounting sync",
      "Priority chat support",
    ],
    cta: { label: "Join the waitlist", href: "/open-account" },
    featured: true,
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For teams and companies",
    monthly: 29,
    features: [
      "Everything in Plus",
      "Up to 50 team cards",
      "Payment approvals and user roles",
      "Accounts in USD, EUR, GBP and AED",
      "A dedicated account manager",
    ],
    cta: { label: "Join the waitlist", href: "/open-account" },
  },
];

export const PRICING = {
  meta: {
    title: "Pricing",
    description: "Free, Plus and Pro business accounts. Simple monthly plans with no hidden fees.",
  },
  hero: {
    eyebrow: "Pricing",
    title: "Simple plans. No surprises.",
    body: "Start free and upgrade when your business needs more. Every plan includes a business account, a card and online support.",
  },
  plans: {
    eyebrow: "Plans",
    title: "Pick the plan that fits today",
    monthlyLabel: "Monthly",
    yearlyLabel: "Yearly",
    yearlyBadge: "Save 20%",
    perMonth: "/ month",
    freeNote: "Free forever",
    monthlyNote: "Billed monthly. Cancel any time.",
    yearlyNote: (total: number) => `$${total.toFixed(2)} billed yearly`,
    popular: "Most popular",
    exampleNote: "Example pricing for this concept. Final prices will be confirmed before launch.",
  },
  fees: {
    eyebrow: "Fees",
    title: "Every fee, in one table",
    columns: ["Free", "Plus", "Pro"],
    rows: [
      { label: "Monthly fee", values: ["$0", "$12", "$29"] },
      { label: "Local transfers", values: ["20 free, then $0.20", "Unlimited", "Unlimited"] },
      { label: "International transfers", values: ["1.5%", "1%", "0.5%"] },
      { label: "Card payments abroad", values: ["1.5%", "No fee", "No fee"] },
      { label: "Cash withdrawals", values: ["$2 each", "2 free a month", "5 free a month"] },
      { label: "Team cards", values: ["1", "5", "50"] },
      { label: "Invoices with pay-by-link", values: ["5 a month", "Unlimited", "Unlimited"] },
      { label: "Accounting sync", values: ["—", "Included", "Included"] },
      { label: "Support", values: ["Online chat", "Priority chat", "Account manager"] },
    ],
  },
  faq: {
    eyebrow: "Questions",
    title: "Pricing questions",
    items: [
      {
        q: "Is the Free plan really free?",
        a: "Yes. There's no monthly fee on Free. You only pay the per-use fees listed in the table, such as transfers beyond the monthly allowance.",
      },
      {
        q: "Can I change plans later?",
        a: "Yes. Upgrade, downgrade or cancel at any time in online banking. Changes start from your next billing date.",
      },
      {
        q: "How does yearly billing work?",
        a: "Pay for twelve months up front and save 20% compared with paying monthly. You can switch back to monthly at renewal.",
      },
      {
        q: "Are there any hidden fees?",
        a: "No. Every fee is in the table above. If a fee ever changes, we'll tell you at least 30 days before it applies.",
      },
    ],
  },
  cta: {
    title: "Start free. Upgrade when you're ready.",
    cta: { label: "Join the waitlist", href: "/open-account" },
    note: "Takes under a minute",
  },
};
