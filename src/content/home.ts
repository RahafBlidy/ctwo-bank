// Home page copy. Mirrors docs/content/page-copy/home.md — change both together.
// Concept brand: no regulatory claims, no customer counts, no invented reviews (see docs/content/locked-facts.md).

export const HOME = {
  hero: {
    eyebrow: "Business banking",
    titleLead: "One account for",
    rotating: ["every invoice.", "every payment.", "every card.", "every business."],
    body: "Get paid faster, keep track of every expense and give your team their own cards. C2 brings your business money together in one place, online.",
    primaryCta: { label: "Open a free account", href: "/open-account" },
    secondaryCta: { label: "Compare accounts", href: "/accounts" },
    ticks: ["Apply in about 10 minutes", "No monthly fee on Free", "Online support, 7 days a week"],
  },
  segments: [
    "Sole traders",
    "Freelancers",
    "Limited companies",
    "Startups",
    "Online shops",
    "Cafés & restaurants",
    "Agencies",
    "Tradespeople",
    "Consultants",
    "Creators",
  ],
  essentials: {
    eyebrow: "Everything in one place",
    title: "Everything you need to run your business",
    items: [
      {
        key: "payments",
        title: "Fast payments",
        body: "Send and receive money instantly, schedule regular payments and pay suppliers in bulk.",
      },
      {
        key: "invoices",
        title: "Invoices that get paid",
        body: "Create an invoice in seconds, add a pay-by-link button and let C2 send the reminders.",
      },
      {
        key: "cards",
        title: "Cards for your team",
        body: "Issue virtual cards instantly. Set limits per person and freeze a card with one click.",
      },
      {
        key: "accounting",
        title: "Books that keep themselves",
        body: "Transactions are categorised and receipts matched, then synced to your accounting software.",
      },
      {
        key: "support",
        title: "Real people, real help",
        body: "Chat with our support team online, seven days a week.",
      },
    ],
  },
  tools: {
    eyebrow: "Grow with C2",
    title: "More than an account",
    items: [
      {
        key: "invoicing",
        title: "C2 Invoicing",
        body: "Branded invoices with pay-by-link and automatic reminders.",
        href: "/features/invoicing",
        tone: "brand",
      },
      {
        key: "savings",
        title: "C2 Savings",
        body: "Set money aside for tax and earn on spare cash.",
        href: "/features/savings",
        tone: "gold",
      },
      {
        key: "cards",
        title: "C2 Team Cards",
        body: "Virtual and physical cards with per-person limits.",
        href: "/features/cards",
        tone: "navy",
      },
      {
        key: "accounting",
        title: "C2 Accounting",
        body: "Automatic categories, receipt matching and nightly sync.",
        href: "/features/accounting",
        tone: "sky",
      },
    ],
  },
  journey: {
    eyebrow: "How it works",
    title: "From sign-up to first payment, the same day",
    steps: [
      {
        n: "01",
        title: "Apply online",
        body: "Tell us about you and your business. It takes about ten minutes.",
      },
      {
        n: "02",
        title: "Verify your identity",
        body: "Upload a photo of your ID and confirm it's you. Most checks finish in minutes.",
      },
      {
        n: "03",
        title: "Get your account details",
        body: "Your account number is ready straight away, so you can start getting paid.",
      },
      {
        n: "04",
        title: "Your card arrives",
        body: "Use a virtual card today. The physical card follows within a few working days.",
      },
    ],
  },
  credit: {
    eyebrow: "C2 Credit",
    title: "Funding that fits your plans",
    body: "Borrow for stock, equipment or a busy season, with fixed monthly repayments and no hidden fees.",
    cta: { label: "Explore credit", href: "/credit" },
    calculator: {
      title: "Estimate your repayment",
      amountLabel: "Loan amount",
      termLabel: "Term",
      rateNote:
        "Illustrative only, based on a 9.9% representative APR. Your actual rate depends on your application.",
      min: 1000,
      max: 100000,
      step: 1000,
      defaultAmount: 25000,
      terms: [12, 24, 36, 48],
      defaultTerm: 24,
      apr: 9.9,
    },
  },
  security: {
    eyebrow: "Security",
    title: "Your money, protected at every step",
    items: [
      {
        title: "Instant card freeze",
        body: "Lost your card? Freeze it in online banking and unfreeze it when you find it.",
      },
      {
        title: "Two-step login",
        body: "Every sign-in is protected by two-step verification with a one-time code.",
      },
      { title: "Real-time alerts", body: "An email alert for every payment, so nothing goes unnoticed." },
    ],
  },
  faq: {
    eyebrow: "Questions",
    title: "Good to know",
    items: [
      {
        q: "Who can open a C2 account?",
        a: "Sole traders, freelancers and limited companies with a registered address in a supported country. You need an email address and a valid photo ID.",
      },
      {
        q: "How long does it take?",
        a: "Most applications take about ten minutes. Once your identity is verified, your account details are ready straight away.",
      },
      {
        q: "Is there a monthly fee?",
        a: "The Free plan has no monthly fee. Plus and Pro add team cards, automation and priority support.",
      },
      {
        q: "Can I switch plans later?",
        a: "Yes. Upgrade, downgrade or cancel at any time in online banking. Changes start from your next billing date.",
      },
    ],
  },
  finalCta: {
    title: "Spend less time on admin. More time on your business.",
    cta: { label: "Open a free account", href: "/open-account" },
    note: "Takes about 10 minutes · No paperwork",
  },
};
