// "Open an account" page copy. Mirrors docs/content/page-copy/open-account.md — change both together.

export const OPEN_ACCOUNT = {
  meta: {
    title: "Open an account",
    description: "Join the C2 waitlist and be first to open a business account.",
  },
  eyebrow: "Open an account",
  title: "Join the C2 waitlist",
  body: "C2 is opening to businesses in stages. Tell us a little about yours and we'll email you as soon as you can apply.",
  points: [
    "It takes under a minute",
    "No credit check to join the waitlist",
    "We only email you about your C2 application",
  ],
  form: {
    steps: ["Your business", "Your details"],
    typeQuestion: "What kind of business do you run?",
    types: [
      { value: "sole-trader", label: "Sole trader", hint: "You run the business on your own" },
      { value: "freelancer", label: "Freelancer", hint: "You sell your skills to clients" },
      { value: "limited-company", label: "Limited company", hint: "Registered company with directors" },
      { value: "not-registered", label: "Not registered yet", hint: "You're about to start" },
    ],
    continue: "Continue",
    back: "Back",
    detailsTitle: "Where can we reach you?",
    labels: {
      name: "Full name",
      email: "Email address",
      business: "Business name",
      country: "Country",
      turnover: "Expected monthly turnover",
      consent: "I agree that C2 may email me about my waitlist place. I can unsubscribe at any time.",
    },
    optional: "optional",
    selectPlaceholder: "Choose one",
    countries: [
      "Syria",
      "United Arab Emirates",
      "Saudi Arabia",
      "Jordan",
      "Lebanon",
      "Türkiye",
      "Egypt",
      "United Kingdom",
      "Other",
    ],
    turnovers: ["Under $5,000", "$5,000 – $25,000", "$25,000 – $100,000", "Over $100,000"],
    submit: "Join the waitlist",
    sending: "Sending…",
    notConfigured:
      "Sign-ups aren't switched on in this environment yet, so this form can't be sent. Set NEXT_PUBLIC_FORMSPREE_ENDPOINT to turn it on.",
    errors: {
      type: "Choose the option that fits your business best.",
      name: "Enter your full name.",
      email: "Enter an email address like name@example.com.",
      business: "Enter your business name.",
      country: "Choose your country.",
      consent: "Tick the box so we can email you about your place.",
      send: "We couldn't send your details. Check your connection and try again.",
    },
    success: {
      title: "You're on the list",
      body: "We've saved your place. We'll email {email} as soon as you can open your C2 account.",
    },
  },
};
