import { Hero } from "@/components/home/Hero";
import { Essentials } from "@/components/home/Essentials";
import { Segments, Tools, Journey, Credit, Security, Faq, FinalCta } from "@/components/home/Sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Segments />
      <Essentials />
      <Tools />
      <Journey />
      <Credit />
      <Security />
      <Faq />
      <FinalCta />
    </>
  );
}
