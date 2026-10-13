"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Icons } from "@/components/ui/icons";
import { EASE } from "@/components/ui/motion";
import { OPEN_ACCOUNT } from "@/content/open-account";

// Public endpoint (world-readable by design). When unset, submission is disabled — never a fake success (docs/TECH-ARCHITECTURE.md §7).
const ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "";

type Status = "idle" | "sending" | "sent" | "error";
type Fields = {
  name: string;
  email: string;
  business: string;
  country: string;
  turnover: string;
  consent: boolean;
};
const EMPTY: Fields = { name: "", email: "", business: "", country: "", turnover: "", consent: false };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function OpenAccountForm() {
  const c = OPEN_ACCOUNT.form;
  const [step, setStep] = useState<0 | 1>(0);
  const [type, setType] = useState<string>("");
  const [f, setF] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields | "type", string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const configured = ENDPOINT.startsWith("https://");

  function validate() {
    const e: typeof errors = {};
    if (f.name.trim().length < 2) e.name = c.errors.name;
    if (!EMAIL_RE.test(f.email.trim())) e.email = c.errors.email;
    if (type !== "not-registered" && f.business.trim().length < 2) e.business = c.errors.business;
    if (!f.country) e.country = c.errors.country;
    if (!f.consent) e.consent = c.errors.consent;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (!validate() || !configured) return;
    const data = new FormData(ev.currentTarget);
    if (data.get("_gotcha")) return; // honeypot filled → bot
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          businessType: type,
          name: f.name.trim(),
          email: f.email.trim(),
          business: f.business.trim(),
          country: f.country,
          turnover: f.turnover,
          _subject: "C2 waitlist sign-up",
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  const set = (k: keyof Fields) => (e: { target: { value: string } }) =>
    setF((p) => ({ ...p, [k]: e.target.value }));
  const field =
    "mt-2 h-12 w-full rounded-2xl border border-line bg-white px-4 text-[16px] text-ink outline-none transition-[border-color,box-shadow] focus:border-brand focus:ring-4 focus:ring-brand/15 aria-[invalid=true]:border-negative";

  if (status === "sent")
    return (
      <motion.div
        className="rounded-[2rem] bg-white p-8 text-center shadow-xl sm:p-12"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        role="status"
      >
        <motion.span
          className="mx-auto grid size-16 place-items-center rounded-full bg-gold text-ink"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.15 }}
        >
          <Icons.check className="size-8" />
        </motion.span>
        <h2 className="mt-6 text-3xl font-extrabold">{c.success.title}</h2>
        <p className="mx-auto mt-3 max-w-md text-ink-2">
          {c.success.body.replace("{email}", f.email.trim())}
        </p>
      </motion.div>
    );

  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-[0_30px_80px_-40px_rgb(6_20_51/0.45)] sm:p-10">
      {/* progress */}
      <div className="flex items-center gap-3 text-sm font-semibold text-ink-2">
        {c.steps.map((s, i) => (
          <span key={s} className="flex items-center gap-2">
            <span
              className={`grid size-7 place-items-center rounded-full text-xs transition-colors ${i <= step ? "bg-brand text-white" : "bg-paper text-muted"}`}
            >
              {i + 1}
            </span>
            <span className={i === step ? "text-ink" : ""}>{s}</span>
            {i === 0 && <span aria-hidden="true" className="mx-1 h-px w-8 bg-line" />}
          </span>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {step === 0 ? (
          <motion.fieldset
            key="s0"
            className="mt-8"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <legend className="font-display text-2xl font-bold [font-stretch:110%]">{c.typeQuestion}</legend>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {c.types.map((t) => {
                const on = type === t.value;
                return (
                  <label
                    key={t.value}
                    className={`relative cursor-pointer rounded-2xl p-5 ring-1 transition-[box-shadow,background-color] ${on ? "bg-brand-50 ring-2 ring-brand" : "ring-line hover:ring-ink-2"}`}
                  >
                    <input
                      type="radio"
                      name="businessType"
                      value={t.value}
                      checked={on}
                      onChange={() => setType(t.value)}
                      className="sr-only"
                    />
                    <span className="block font-semibold text-ink">{t.label}</span>
                    <span className="mt-1 block text-sm text-ink-2">{t.hint}</span>
                    {on && (
                      <motion.span
                        layoutId="type-check"
                        className="absolute top-4 right-4 grid size-6 place-items-center rounded-full bg-brand text-white"
                      >
                        <Icons.check className="size-3.5" />
                      </motion.span>
                    )}
                  </label>
                );
              })}
            </div>
            {errors.type && <p className="mt-3 text-sm font-medium text-negative">{errors.type}</p>}
            <button
              type="button"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-brand px-7 font-semibold text-white transition-colors hover:bg-brand-600"
              onClick={() => {
                if (!type) return setErrors({ type: c.errors.type });
                setErrors({});
                setStep(1);
              }}
            >
              {c.continue}
            </button>
          </motion.fieldset>
        ) : (
          <motion.form
            key="s1"
            className="mt-8"
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <h2 className="font-display text-2xl font-bold [font-stretch:110%]">{c.detailsTitle}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="oa-name" className="text-sm font-semibold">
                  {c.labels.name}
                </label>
                <input
                  id="oa-name"
                  autoComplete="name"
                  className={field}
                  value={f.name}
                  onChange={set("name")}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "oa-name-err" : undefined}
                />
                {errors.name && (
                  <p id="oa-name-err" className="mt-1.5 text-sm text-negative">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="oa-email" className="text-sm font-semibold">
                  {c.labels.email}
                </label>
                <input
                  id="oa-email"
                  type="email"
                  autoComplete="email"
                  className={field}
                  value={f.email}
                  onChange={set("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "oa-email-err" : undefined}
                />
                {errors.email && (
                  <p id="oa-email-err" className="mt-1.5 text-sm text-negative">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="oa-business" className="text-sm font-semibold">
                  {c.labels.business}{" "}
                  {type === "not-registered" && (
                    <span className="font-normal text-muted">({c.optional})</span>
                  )}
                </label>
                <input
                  id="oa-business"
                  autoComplete="organization"
                  className={field}
                  value={f.business}
                  onChange={set("business")}
                  aria-invalid={!!errors.business}
                  aria-describedby={errors.business ? "oa-business-err" : undefined}
                />
                {errors.business && (
                  <p id="oa-business-err" className="mt-1.5 text-sm text-negative">
                    {errors.business}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="oa-country" className="text-sm font-semibold">
                  {c.labels.country}
                </label>
                <select
                  id="oa-country"
                  className={field}
                  value={f.country}
                  onChange={set("country")}
                  aria-invalid={!!errors.country}
                  aria-describedby={errors.country ? "oa-country-err" : undefined}
                >
                  <option value="">{c.selectPlaceholder}</option>
                  {c.countries.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
                {errors.country && (
                  <p id="oa-country-err" className="mt-1.5 text-sm text-negative">
                    {errors.country}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="oa-turnover" className="text-sm font-semibold">
                  {c.labels.turnover} <span className="font-normal text-muted">({c.optional})</span>
                </label>
                <select id="oa-turnover" className={field} value={f.turnover} onChange={set("turnover")}>
                  <option value="">{c.selectPlaceholder}</option>
                  {c.turnovers.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </div>
            </div>
            {/* honeypot */}
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm text-ink-2">
              <input
                type="checkbox"
                checked={f.consent}
                onChange={(e) => setF((p) => ({ ...p, consent: e.target.checked }))}
                className="mt-0.5 size-5 accent-[var(--color-brand)]"
                aria-invalid={!!errors.consent}
                aria-describedby={errors.consent ? "oa-consent-err" : undefined}
              />
              {c.labels.consent}
            </label>
            {errors.consent && (
              <p id="oa-consent-err" className="mt-1.5 text-sm text-negative">
                {errors.consent}
              </p>
            )}

            {!configured && (
              <p className="mt-6 rounded-2xl bg-gold-100 p-4 text-sm text-ink" role="note">
                {c.notConfigured}
              </p>
            )}
            {status === "error" && (
              <p
                className="mt-6 rounded-2xl bg-negative/10 p-4 text-sm font-medium text-negative"
                role="alert"
              >
                {c.errors.send}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setStep(0)}
                className="h-12 rounded-full px-5 font-semibold text-ink ring-1 ring-line hover:ring-ink-2"
              >
                {c.back}
              </button>
              <button
                type="submit"
                disabled={!configured || status === "sending"}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-7 font-semibold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "sending" ? c.sending : c.submit}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
