import { Eyebrow } from "@/components/ui/Button";
import { WordReveal } from "@/components/ui/motion";

/** Eyebrow + word-reveal h2, the standard section opener. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  light = false,
  center = false,
  className = "",
}: {
  id: string;
  eyebrow: string;
  title: string;
  light?: boolean;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={`${center ? "flex flex-col items-center text-center" : ""} ${className}`}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <WordReveal id={id} text={title} className="max-w-3xl text-[clamp(2rem,4.4vw,3.6rem)] font-extrabold" />
    </div>
  );
}
