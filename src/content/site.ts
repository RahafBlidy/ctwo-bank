// Shared site content: navigation, footer and global strings.
// Mirrors docs/content/page-copy/_shared.md — change both together.

export const SITE = {
  name: "C2 Banking System",
  shortName: "C2",
  tagline: "Business banking that keeps pace with you.",
  disclaimer:
    "C2 Banking System is a concept project for demonstration. It is not a bank, does not hold client money and does not offer regulated financial services.",
};

export type NavLink = { label: string; href: string; description?: string };
export type NavGroup = {
  label: string;
  intro: string;
  links: NavLink[];
  feature?: { title: string; body: string; href: string; cta: string };
};

// Primary navigation (Tide-style mega menu: product groups with descriptions + a featured promo)
export const NAV: NavGroup[] = [
  {
    label: "Business accounts",
    intro: "One account for sole traders, freelancers and limited companies.",
    links: [
      { label: "Compare accounts", href: "/accounts", description: "Free, Plus and Pro side by side" },
      {
        label: "Sole traders",
        href: "/accounts#sole-traders",
        description: "Simple banking for one-person businesses",
      },
      {
        label: "Limited companies",
        href: "/accounts#limited-companies",
        description: "Multi-user access and approvals",
      },
      { label: "Business savings", href: "/features/savings", description: "Put spare cash to work" },
    ],
    feature: {
      title: "Open in about 10 minutes",
      body: "Apply online. No branch visit, no paperwork.",
      href: "/open-account",
      cta: "Open an account",
    },
  },
  {
    label: "Features",
    intro: "Tools that take the admin out of running a business.",
    links: [
      { label: "Payments", href: "/features/payments", description: "Send, receive and schedule payments" },
      { label: "Invoicing", href: "/features/invoicing", description: "Create, send and chase invoices" },
      { label: "Cards & expenses", href: "/features/cards", description: "Team cards with spending limits" },
      { label: "Accounting", href: "/features/accounting", description: "Sync transactions with your books" },
    ],
    feature: {
      title: "New: pay-by-link invoices",
      body: "Every invoice gets a link your customer can pay in seconds.",
      href: "/features/invoicing",
      cta: "See invoicing",
    },
  },
  {
    label: "Credit",
    intro: "Flexible finance for growing businesses.",
    links: [
      { label: "Business loans", href: "/credit#loans", description: "Fixed repayments, clear terms" },
      { label: "Credit line", href: "/credit#credit-line", description: "Draw funds when you need them" },
      {
        label: "Loan calculator",
        href: "/credit#calculator",
        description: "Estimate your monthly repayment",
      },
    ],
  },
];

export const NAV_SIMPLE: NavLink[] = [
  { label: "Pricing", href: "/pricing" },
  { label: "Help", href: "/help" },
];

export const FOOTER: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Products",
    links: [
      { label: "Business accounts", href: "/accounts" },
      { label: "Payments", href: "/features/payments" },
      { label: "Invoicing", href: "/features/invoicing" },
      { label: "Cards & expenses", href: "/features/cards" },
      { label: "Accounting", href: "/features/accounting" },
      { label: "Credit", href: "/credit" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About C2", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Help & support",
    links: [
      { label: "Help centre", href: "/help" },
      { label: "Security", href: "/help#security" },
      { label: "Report fraud", href: "/help#fraud" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy policy", href: "/legal/privacy" },
      { label: "Terms of use", href: "/legal/terms" },
      { label: "Cookies", href: "/legal/cookies" },
    ],
  },
];

export const PROMO = {
  tag: "New",
  text: "Pay-by-link invoices are here: get paid the moment your customer clicks pay.",
  cta: "Learn more",
  href: "/features/invoicing",
};
