import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden py-28 text-center sm:py-36">
      <span
        aria-hidden="true"
        className="absolute -top-10 left-1/2 h-[140%] w-10 -translate-x-[120px] skew-x-[-40deg] bg-gold-100"
      />
      <span
        aria-hidden="true"
        className="absolute -top-10 left-1/2 h-[140%] w-24 translate-x-[20px] skew-x-[-40deg] bg-brand-50"
      />
      <div className="relative mx-auto max-w-xl px-5">
        <p className="font-display text-8xl font-extrabold text-brand [font-stretch:120%]">404</p>
        <h1 className="mt-4 text-3xl font-extrabold">This page isn&apos;t here yet</h1>
        <p className="mt-3 text-ink-2">
          It may have moved, or it&apos;s still being built. Head back home or open an account.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" variant="ghost">
            Back to home
          </ButtonLink>
          <ButtonLink href="/open-account" arrow>
            Open an account
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
