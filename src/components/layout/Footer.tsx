import Link from "next/link";
import { C2Mark } from "@/components/brand/C2Logo";
import { FOOTER, SITE } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-navy text-white/70">
      <div className="mx-auto max-w-7xl px-5 pt-20 pb-10 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="C2 Banking System, home">
              <C2Mark tone="onDark" className="h-8 w-auto" />
              <span className="font-display text-base font-bold text-white [font-stretch:115%]">Banking</span>
            </Link>
            <p className="mt-4 max-w-xs">{SITE.tagline}</p>
          </div>
          {FOOTER.map((col) => (
            <div key={col.heading}>
              <h2 className="font-sans text-[15px] font-semibold tracking-normal text-white [font-stretch:100%]">
                {col.heading}
              </h2>
              <ul className="mt-4 grid gap-2.5 text-[15px]">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/50 md:flex-row md:items-start md:justify-between">
          <p className="max-w-3xl">{SITE.disclaimer}</p>
          <p className="shrink-0">© {new Date().getFullYear()} C2 Banking System</p>
        </div>
      </div>
    </footer>
  );
}
