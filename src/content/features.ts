// Feature pages (/features/[slug]). Mirrors docs/content/page-copy/features.md — change both together.

import type { PanelKey } from "@/components/home/Essentials";

export type Feature = {
  slug: string;
  name: string;
  icon: "payments" | "invoices" | "cards" | "accounting" | "savings";
  panel: PanelKey;
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; body: string };
  benefits: { title: string; body: string }[];
  steps: { title: string; body: string }[];
  tip: { title: string; body: string };
  faq: { q: string; a: string }[];
};

export const FEATURES: Feature[] = [
  {
    slug: "payments",
    name: "Payments",
    icon: "payments",
    panel: "payments",
    meta: {
      title: "Payments",
      description: "Send, receive and schedule business payments in seconds with C2.",
    },
    hero: {
      eyebrow: "Payments",
      title: "Money in and out, in seconds",
      body: "Pay suppliers, pay yourself and get paid, any time of day. Schedule regular payments once and let C2 handle the rest.",
    },
    benefits: [
      {
        title: "Instant local transfers",
        body: "Payments to local accounts arrive in seconds, including evenings and weekends.",
      },
      {
        title: "Scheduled and bulk payments",
        body: "Set up regular payments or pay many suppliers at once from a single upload.",
      },
      { title: "Saved payees", body: "Save the people you pay often and send money in two clicks." },
    ],
    steps: [
      { title: "Choose who to pay", body: "Pick a saved payee or add new account details." },
      { title: "Enter the amount", body: "Add a reference so both sides know what it's for." },
      {
        title: "Confirm with a one-time code",
        body: "The money is on its way, and you get a receipt in online banking.",
      },
    ],
    tip: {
      title: "Approvals on Pro",
      body: "On the Pro plan, larger payments can wait for a second person to approve them before they leave the account.",
    },
    faq: [
      {
        q: "How fast are local transfers?",
        a: "Most local transfers arrive within seconds, 24 hours a day.",
      },
      {
        q: "Can I send money abroad?",
        a: "Yes. International transfers are available on every plan, with the fees shown on the pricing page.",
      },
      {
        q: "Is there a daily limit?",
        a: "Yes. You can see and adjust your limits in online banking, within the maximum for your plan.",
      },
    ],
  },
  {
    slug: "invoicing",
    name: "Invoicing",
    icon: "invoices",
    panel: "invoices",
    meta: {
      title: "Invoicing",
      description: "Create branded invoices with pay-by-link and automatic reminders.",
    },
    hero: {
      eyebrow: "Invoicing",
      title: "Invoices that get paid on time",
      body: "Create a branded invoice in seconds, add a pay-by-link button and let C2 send the reminders. Payments match to the invoice automatically.",
    },
    benefits: [
      {
        title: "Pay-by-link",
        body: "Every invoice includes a link your customer can pay by card in seconds.",
      },
      {
        title: "Automatic reminders",
        body: "Polite reminders go out before and after the due date, so you don't have to chase.",
      },
      {
        title: "Automatic matching",
        body: "When a payment lands, the invoice is marked as paid. No spreadsheets.",
      },
    ],
    steps: [
      {
        title: "Add your customer and items",
        body: "Saved customers and items make the next invoice even faster.",
      },
      { title: "Send it", body: "By email or as a link you can share anywhere." },
      { title: "Get paid", body: "Track when it's viewed and see it marked paid the moment money arrives." },
    ],
    tip: {
      title: "Your brand on every invoice",
      body: "Add your logo and colours once and every invoice you send looks like you.",
    },
    faq: [
      { q: "How many invoices can I send?", a: "5 a month on Free and unlimited on Plus and Pro." },
      {
        q: "How do customers pay?",
        a: "By bank transfer to your account details, or by card through the pay-by-link button.",
      },
      {
        q: "Can I add tax to an invoice?",
        a: "Yes. Add tax per item or to the whole invoice, and C2 shows the totals clearly.",
      },
    ],
  },
  {
    slug: "cards",
    name: "Cards & expenses",
    icon: "cards",
    panel: "cards",
    meta: {
      title: "Cards & expenses",
      description: "Team cards with spending limits, instant virtual cards and receipt capture.",
    },
    hero: {
      eyebrow: "Cards & expenses",
      title: "A card for everyone who spends",
      body: "Issue virtual cards in seconds and physical cards in days. Set limits per person or per subscription, and freeze any card with one click.",
    },
    benefits: [
      {
        title: "Spending limits",
        body: "Set a monthly limit for each card and change it whenever you need.",
      },
      {
        title: "Instant virtual cards",
        body: "Create a card for a new hire or a single subscription in seconds.",
      },
      {
        title: "Receipts in one click",
        body: "Upload a photo or PDF of the receipt and C2 attaches it to the payment.",
      },
    ],
    steps: [
      { title: "Invite a team member", body: "They get their own login and card." },
      { title: "Set their limit", body: "Choose a monthly amount and where the card can be used." },
      { title: "See every payment live", body: "Email alerts and receipts flow into one place." },
    ],
    tip: {
      title: "Freeze, don't cancel",
      body: "Misplaced a card? Freeze it in online banking and unfreeze it when you find it.",
    },
    faq: [
      { q: "How many cards can I have?", a: "1 on Free, 5 on Plus and up to 50 on Pro." },
      {
        q: "Can I pay online and in shops?",
        a: "Yes. Use your card details to pay online, and your physical card to pay contactless in shops.",
      },
      { q: "Can I pay abroad?", a: "Yes. Card payments abroad have no fee on Plus and Pro." },
    ],
  },
  {
    slug: "accounting",
    name: "Accounting",
    icon: "accounting",
    panel: "accounting",
    meta: {
      title: "Accounting",
      description: "Automatic categories, receipt matching and nightly sync with your accounting software.",
    },
    hero: {
      eyebrow: "Accounting",
      title: "Books that keep themselves",
      body: "Every transaction is categorised, receipts are matched and tax is recorded. Then everything syncs to your accounting software overnight.",
    },
    benefits: [
      {
        title: "Smart categories",
        body: "C2 learns how you categorise payments and does it for you next time.",
      },
      {
        title: "Receipt matching",
        body: "Photos and email receipts attach to the right transaction automatically.",
      },
      {
        title: "Nightly sync",
        body: "Connect your accounting software once and your books stay up to date.",
      },
    ],
    steps: [
      { title: "Connect your software", body: "Link your accounting tool in a few clicks." },
      {
        title: "Review the suggestions",
        body: "Confirm categories with one click until C2 learns your rules.",
      },
      {
        title: "Export at year end",
        body: "Download clean reports for your accountant whenever you need them.",
      },
    ],
    tip: {
      title: "Share with your accountant",
      body: "Give your accountant read-only access so they can see what they need without asking.",
    },
    faq: [
      { q: "Which plans include accounting sync?", a: "Plus and Pro. Free includes categories and exports." },
      { q: "Can my accountant log in?", a: "Yes. Invite them with read-only access from the team settings." },
      { q: "Can I export my transactions?", a: "Yes, as CSV or PDF statements, on every plan." },
    ],
  },
  {
    slug: "savings",
    name: "Savings",
    icon: "savings",
    panel: "savings",
    meta: {
      title: "Savings",
      description: "Savings pots for tax, bills and a rainy day, with auto-save rules.",
    },
    hero: {
      eyebrow: "Savings",
      title: "Put money aside before you miss it",
      body: "Create pots for tax, bills or a rainy day. Auto-save rules move a slice of every payment you receive, so the money is there when you need it.",
    },
    benefits: [
      { title: "Tax pot", body: "Choose a percentage and C2 sets it aside from every payment that lands." },
      {
        title: "Unlimited pots",
        body: "On Plus and Pro, create as many pots as you need and name them your way.",
      },
      {
        title: "Move money any time",
        body: "Pots stay yours. Move money back to your main balance in one click.",
      },
    ],
    steps: [
      { title: "Create a pot", body: "Name it and set a goal if you want one." },
      { title: "Add a rule", body: "For example: save 20% of every payment from customers." },
      { title: "Watch it fill", body: "See progress towards each goal on your dashboard." },
    ],
    tip: {
      title: "Separate VAT",
      body: "Keep sales tax in its own pot so you never spend money that isn't yours.",
    },
    faq: [
      { q: "How many pots can I have?", a: "1 on Free and unlimited on Plus and Pro." },
      { q: "Can I take money out of a pot?", a: "Yes, at any time, instantly." },
      {
        q: "Do pots earn interest?",
        a: "Not yet. We'll announce interest-earning pots when they're available.",
      },
    ],
  },
];

export const FEATURES_SHARED = {
  benefitsEyebrow: "Why it helps",
  stepsEyebrow: "How it works",
  stepsTitle: "Three steps, all online",
  relatedEyebrow: "Explore more",
  relatedTitle: "Works even better together",
  faqEyebrow: "Questions",
  primary: { label: "Join the waitlist", href: "/open-account" },
  secondary: { label: "See pricing", href: "/pricing" },
  cta: {
    title: "Everything your business needs, all online.",
    cta: { label: "Join the waitlist", href: "/open-account" },
    note: "Takes under a minute",
  },
};

export const getFeature = (slug: string) => FEATURES.find((f) => f.slug === slug);
