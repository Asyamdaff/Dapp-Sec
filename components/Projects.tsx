import Section from "./Section";
import Reveal from "./Reveal";
import { projects } from "@/lib/content";

export default function Projects() {
  return (
    <Section
      id="projects"
      index="05"
      eyebrow="Projects"
      title="Selected security engineering work."
    >
      <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
        {projects.map((p, i) => (
          <Reveal
            as="li"
            key={p.title}
            delay={i * 60}
            className="group relative grid gap-4 py-10 transition-colors duration-500 hover:bg-white/[0.015] md:grid-cols-[3rem_minmax(0,1fr)] md:gap-6"
          >
            {/* Project Number */}
            <span className="font-mono text-xs text-slate-600 transition-colors duration-500 group-hover:text-accent md:pt-2">
              {String(i + 1).padStart(2, "0")}
            </span>

            <div>
              {/* Project Title */}
              <h3 className="text-2xl font-medium text-white transition-all duration-500 group-hover:translate-x-1 group-hover:text-accent">
                {p.title}
              </h3>

              {/* Project Description */}
              <p className="mt-3 max-w-xl leading-relaxed transition-colors duration-500 group-hover:text-slate-300">
                {p.body}
              </p>

              {/* Project Tags */}
              <ul className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-slate-400 transition-all duration-500 group-hover:border-accent/25 group-hover:text-accent/80"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}