import type { Metadata, Viewport } from "next";
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/figtree";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: { default: `${SITE.name} · Business banking`, template: `%s · ${SITE.shortName}` },
  description:
    "Business accounts, payments, invoicing, team cards and credit, all online. A C2 Banking System concept.",
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
};

export const viewport: Viewport = {
  themeColor: "#0152fb",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <MotionProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
