
import Section from "./Section";
import Reveal from "./Reveal";
import { skillGroups } from "@/lib/content";

export default function Skills() {
  return (
    <Section
      id="skills"
      index="03"
      eyebrow="Technical Skills"
      title="Tools I use to see, control, and verify the estate."
    >
      <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
        {skillGroups.map((group, i) => (
          <Reveal
            as="li"
            key={group.title}
            delay={i * 80}
            className="grid gap-5 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:items-baseline"
          >
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
              {group.title}
            </h3>

            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="cursor-default text-sm text-white/90 transition-colors duration-300 hover:text-accent md:text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
