// Credit page. Mirrors docs/content/page-copy/credit.md — change both together.
// Concept: all figures are illustrative examples (locked-facts.md).

export const CREDIT = {
  meta: {
    title: "Credit",
    description:
      "Business loans and a flexible credit line with clear terms. Estimate your monthly repayment.",
  },
  hero: {
    eyebrow: "C2 Credit",
    title: "Finance that keeps your business moving",
    body: "Borrow for stock, equipment or a busy season. Clear terms, fixed repayments and a decision online.",
    primary: { label: "Join the waitlist", href: "/open-account" },
    secondary: { label: "Estimate a repayment", href: "#calculator" },
  },
  products: {
    eyebrow: "Two ways to borrow",
    title: "Choose how you want to borrow",
    items: [
      {
        id: "loans",
        name: "Business loan",
        body: "Borrow a fixed amount and repay it in equal monthly instalments.",
        terms: [
          ["Amount", "$1,000 – $100,000"],
          ["Term", "12 – 48 months"],
          ["Repayments", "Fixed, monthly"],
          ["Early repayment", "No fee"],
        ],
      },
      {
        id: "credit-line",
        name: "Credit line",
        body: "Get an approved limit and draw funds when you need them. Pay interest only on what you use.",
        terms: [
          ["Limit", "$500 – $50,000"],
          ["Drawdowns", "Instant, online"],
          ["Interest", "Only on what you use"],
          ["Repayments", "Flexible, monthly minimum"],
        ],
      },
    ],
  },
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
  calculatorIntro: {
    eyebrow: "Loan calculator",
    title: "See what you'd repay each month",
    body: "Move the slider and pick a term. The estimate updates instantly, so you can plan before you apply.",
  },
  eligibility: {
    eyebrow: "Who can apply",
    title: "What you need to apply",
    items: [
      "A C2 business account",
      "At least 6 months of trading history",
      "A registered business address in a supported country",
      "Recent account activity we can review",
    ],
  },
  steps: {
    eyebrow: "How it works",
    title: "Apply in three steps",
    items: [
      { n: "01", title: "Tell us what you need", body: "Choose an amount and a term online." },
      { n: "02", title: "Get a decision", body: "We review your account activity and reply online." },
      {
        n: "03",
        title: "Receive the funds",
        body: "Accept the offer and the money arrives in your C2 account.",
      },
    ],
  },
  faq: {
    eyebrow: "Questions",
    title: "About C2 Credit",
    items: [
      {
        q: "Will checking my rate affect my credit score?",
        a: "Estimating a repayment with the calculator never affects your credit score. A full application may involve a credit check, and we'll tell you before it happens.",
      },
      {
        q: "Can I repay early?",
        a: "Yes. You can repay a business loan early at any time with no early repayment fee.",
      },
      {
        q: "What can I use the money for?",
        a: "Any business purpose, such as stock, equipment, hiring or covering a seasonal gap.",
      },
    ],
  },
  cta: {
    title: "Ready to grow? Start with an account.",
    cta: { label: "Join the waitlist", href: "/open-account" },
    note: "Credit is available to C2 account holders",
  },
};
