import Section from "./Section";
import Reveal from "./Reveal";
import { about } from "@/lib/content";

export default function About() {
  return (
    <Section id="about" index="02" eyebrow="About" title="Engineering endpoint security across enterprise environments.">
      <div className="space-y-6 text-lg leading-relaxed md:text-xl md:leading-relaxed">
        {about.paragraphs.map((p, i) => (
          <Reveal key={i} delay={i * 100}>
            <p>{p}</p>
          </Reveal>
        ))}
      </div>
      <Reveal delay={200}>
        <ul className="mt-16 grid gap-8 border-t border-white/[0.08] pt-10 sm:grid-cols-3">
          {about.focus.map((f) => (
            <li key={f} className="group">
              <span className="mb-5 block h-px w-8 bg-accent/60 transition-all duration-700 group-hover:w-16 group-hover:bg-accent" />
              <p className="text-sm text-white">{f}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
