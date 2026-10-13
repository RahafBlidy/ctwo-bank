// Business accounts page. Mirrors docs/content/page-copy/accounts.md — change both together.

export const ACCOUNTS = {
  meta: {
    title: "Business accounts",
    description:
      "Business accounts for sole traders, freelancers and limited companies. Compare Free, Plus and Pro.",
  },
  hero: {
    eyebrow: "Business accounts",
    title: "A business account that works as hard as you",
    body: "Open a C2 account online and run payments, invoices, cards and savings from one place.",
    primary: { label: "Join the waitlist", href: "/open-account" },
    secondary: { label: "See pricing", href: "/pricing" },
  },
  segments: [
    {
      id: "sole-traders",
      eyebrow: "Sole traders & freelancers",
      title: "Simple banking for one-person businesses",
      body: "Keep business money separate from personal money without the paperwork. Get paid by invoice or card, put tax aside automatically and see what's really yours to spend.",
      points: ["Open with just your ID", "Tax pot that fills itself", "Invoices with pay-by-link"],
      panel: "savings",
    },
    {
      id: "limited-companies",
      eyebrow: "Limited companies",
      title: "Built for teams, directors and growing companies",
      body: "Add directors and employees, give each person a card with their own limit and approve larger payments before they leave the account.",
      points: ["Multi-user access with roles", "Team cards with spending limits", "Payment approvals"],
      panel: "cards",
    },
  ],
  includes: {
    eyebrow: "Every account includes",
    title: "The essentials, on every plan",
    items: [
      {
        icon: "payments",
        title: "Instant local payments",
        body: "Send and receive money in seconds, any time of day.",
      },
      {
        icon: "cards",
        title: "A business card",
        body: "Virtual right away, physical in a few working days.",
      },
      {
        icon: "invoices",
        title: "Invoicing",
        body: "Create invoices with a pay-by-link button, all online.",
      },
      { icon: "savings", title: "Savings pots", body: "Set money aside for tax, bills or a rainy day." },
      { icon: "bell", title: "Real-time alerts", body: "An email alert for every payment in and out." },
      { icon: "support", title: "Online support", body: "Chat with our team seven days a week." },
    ],
  },
  plans: {
    eyebrow: "Plans",
    title: "Free, Plus or Pro",
    link: { label: "Compare every fee", href: "/pricing" },
  },
  faq: {
    eyebrow: "Questions",
    title: "About business accounts",
    items: [
      {
        q: "What do I need to open an account?",
        a: "An email address, a valid photo ID and, for limited companies, your company registration details.",
      },
      {
        q: "Can I have more than one user?",
        a: "Yes. Plus includes 5 team cards and Pro supports up to 50 users with roles and approvals.",
      },
      {
        q: "Can I open an account before my business is registered?",
        a: "You can join the waitlist now. We'll ask for registration details when you apply.",
      },
    ],
  },
  cta: {
    title: "One account for your whole business.",
    cta: { label: "Join the waitlist", href: "/open-account" },
    note: "Takes under a minute",
  },
};
