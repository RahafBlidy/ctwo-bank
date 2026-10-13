// Help centre (/help) and log-in placeholder (/login). Mirrors docs/content/page-copy/help.md — change both together.

export type HelpTopic = {
  id: string;
  label: string;
  icon: "check" | "accounting" | "payments" | "cards" | "savings" | "shield";
  faq: { q: string; a: string }[];
};

export const HELP = {
  meta: {
    title: "Help centre",
    description: "Answers about accounts, payments, cards, credit and security, plus how to report fraud.",
  },
  hero: {
    eyebrow: "Help centre",
    title: "How can we help?",
    body: "Search our answers or browse by topic. Still stuck? Our team is online seven days a week.",
  },
  search: {
    label: "Search the help centre",
    placeholder: "Try “invoice”, “card” or “limit”",
    all: "All topics",
    results: (n: number) => (n === 1 ? "1 answer" : `${n} answers`),
    empty: "No answers match that search. Try another word, or chat with our team online.",
  },
  topicsEyebrow: "Browse by topic",
  topicsTitle: "Popular answers",
  topics: [
    {
      id: "getting-started",
      label: "Getting started",
      icon: "check",
      faq: [
        {
          q: "Who can open a C2 account?",
          a: "Sole traders, freelancers and limited companies with a registered address in a supported country. You need an email address and a valid photo ID.",
        },
        {
          q: "How long does it take to apply?",
          a: "Most applications take about ten minutes online. Once your identity is verified, your account details are ready straight away.",
        },
        {
          q: "Is there a mobile app?",
          a: "No. C2 is online banking only. It works in any modern browser on your computer, tablet or phone, with nothing to install.",
        },
      ],
    },
    {
      id: "plans",
      label: "Account & plans",
      icon: "accounting",
      faq: [
        {
          q: "Can I change plan later?",
          a: "Yes. Upgrade, downgrade or cancel at any time in online banking. Changes start from your next billing date.",
        },
        {
          q: "Are there any hidden fees?",
          a: "No. Every fee is listed on the pricing page. If a fee ever changes, we'll tell you at least 30 days before it applies.",
        },
        {
          q: "Can I add other people to my account?",
          a: "Yes. Plus includes 5 team cards and Pro supports up to 50 users with roles and approvals.",
        },
      ],
    },
    {
      id: "payments",
      label: "Payments & invoicing",
      icon: "payments",
      faq: [
        {
          q: "How fast are local transfers?",
          a: "Most local transfers arrive within seconds, 24 hours a day.",
        },
        {
          q: "How do customers pay my invoices?",
          a: "By bank transfer to your account details, or by card through the pay-by-link button on every invoice.",
        },
        {
          q: "Is there a daily payment limit?",
          a: "Yes. You can see and adjust your limits in online banking, within the maximum for your plan.",
        },
      ],
    },
    {
      id: "cards",
      label: "Cards",
      icon: "cards",
      faq: [
        {
          q: "I've lost my card. What should I do?",
          a: "Freeze it in online banking straight away. If you find it, unfreeze it. If not, order a replacement from the same screen.",
        },
        {
          q: "How many cards can I have?",
          a: "1 on Free, 5 on Plus and up to 50 on Pro.",
        },
        {
          q: "Can I pay online and in shops?",
          a: "Yes. Use your card details to pay online, and your physical card to pay contactless in shops.",
        },
      ],
    },
    {
      id: "credit",
      label: "Credit",
      icon: "savings",
      faq: [
        {
          q: "Does using the loan calculator affect my credit score?",
          a: "No. Estimating a repayment never affects your credit score. A full application may involve a credit check, and we'll tell you before it happens.",
        },
        {
          q: "How do I apply for a loan?",
          a: "Choose an amount and a term online. We review your account activity and reply online.",
        },
      ],
    },
    {
      id: "security-faq",
      label: "Security",
      icon: "shield",
      faq: [
        {
          q: "How do I sign in safely?",
          a: "Every sign-in is protected by two-step verification with a one-time code. Never share that code with anyone, including us.",
        },
        {
          q: "Will C2 ever ask for my password?",
          a: "Never. We will never ask for your password or one-time code by email, phone or message.",
        },
      ],
    },
  ] satisfies HelpTopic[],
  security: {
    eyebrow: "Security",
    title: "How we keep your account safe",
    items: [
      {
        icon: "lock" as const,
        title: "Two-step verification",
        body: "Every sign-in needs your password and a one-time code.",
      },
      {
        icon: "bell" as const,
        title: "Real-time alerts",
        body: "An email alert for every payment, so nothing goes unnoticed.",
      },
      {
        icon: "cards" as const,
        title: "Freeze in one click",
        body: "Freeze a card the moment something looks wrong, and unfreeze it just as fast.",
      },
      {
        icon: "shield" as const,
        title: "Encrypted end to end",
        body: "Your data is encrypted in transit and at rest.",
      },
    ],
  },
  fraud: {
    eyebrow: "Report fraud",
    title: "Think something's wrong? Act fast.",
    body: "If you see a payment you don't recognise, or someone asks for your password or code, follow these steps straight away.",
    steps: [
      {
        n: "01",
        title: "Freeze your card",
        body: "Freeze any affected card in online banking. It takes one click.",
      },
      {
        n: "02",
        title: "Change your password",
        body: "Choose a new password you haven't used anywhere else.",
      },
      {
        n: "03",
        title: "Tell us online",
        body: "Go to Help → Report fraud in online banking. Our fraud team is available 24/7.",
      },
    ],
    warning: "C2 will never ask for your password or one-time code by email, phone or message.",
  },
  cta: {
    title: "Ready to bank online with C2?",
    cta: { label: "Join the waitlist", href: "/open-account" },
    note: "Takes under a minute",
  },
};

export const LOGIN = {
  meta: {
    title: "Log in",
    description: "C2 online banking is coming soon. Join the waitlist to be first to know.",
  },
  eyebrow: "Online banking",
  title: "Online banking is coming soon",
  body: "C2 is opening to businesses in stages. Join the waitlist and we'll email you as soon as online banking is ready for your business.",
  primary: { label: "Join the waitlist", href: "/open-account" },
  secondary: { label: "Visit the help centre", href: "/help" },
  points: [
    "Works in any modern browser, nothing to install",
    "Two-step verification on every sign-in",
    "Online support, 7 days a week",
  ],
  warning: "C2 will never ask for your password or one-time code by email, phone or message.",
};
