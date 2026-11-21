import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Props = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
};

/** Editorial frame: sticky index column on the left, headline and content on the right. */
export default function Section({ id, index, eyebrow, title, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-12 md:gap-x-12">
        <Reveal className="md:col-span-4 md:sticky md:top-32 md:self-start">
          <p className="font-mono text-xs text-slate-600">{index}</p>
          <div className="mt-4 h-px w-10 bg-accent/50" aria-hidden />
          <p className="eyebrow mt-4">{eyebrow}</p>
        </Reveal>
        <div className="md:col-span-8">
          <Reveal>
            <h2 id={`${id}-title`} className="display text-3xl sm:text-4xl md:text-[3.25rem] md:leading-[1.08]">
              {title}
            </h2>
          </Reveal>
          <div className="mt-14 md:mt-16">{children}</div>
        </div>
      </div>
    </section>
  );
}
