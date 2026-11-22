import Section from "./Section";
import Reveal from "./Reveal";
import { experience } from "@/lib/content";

export default function Experience() {
  return (
    <Section
      id="experience"
      index="04"
      eyebrow="Experience"
      title="Where the work has taken me."
    >
      <ol>
        {experience.map((job, i) => (
          <Reveal
            as="li"
            key={job.role + job.period}
            delay={i * 120}
            className="group relative grid gap-4 border-l border-white/[0.08] pb-16 pl-8 last:pb-0 md:pl-10"
          >
            {/* Timeline Marker */}
            <span
              aria-hidden
              className={`absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full transition-all duration-500 group-hover:scale-125 ${
                job.current
                  ? "bg-accent ring-4 ring-accent/10 group-hover:ring-accent/20"
                  : "bg-slate-700 group-hover:bg-accent"
              }`}
            />

            {/* Period */}
            <p className="font-mono text-xs text-slate-500 transition-colors duration-300 group-hover:text-slate-400">
              {job.period}
            </p>

            {/* Role */}
            <h3 className="text-2xl font-medium text-white transition-colors duration-300 group-hover:text-accent">
              {job.role}
            </h3>

            {/* Organization */}
            <p className="text-sm text-accent/80">
              {job.org}
            </p>

            {/* Summary */}
            <p className="max-w-xl pt-2 leading-relaxed">
              {job.summary}
            </p>

            {/* Responsibilities */}
            <ul className="mt-2 max-w-xl space-y-3 text-sm leading-relaxed">
              {job.points.map((point) => (
                <li key={point} className="group/point flex gap-3">
                  <span
                    aria-hidden
                    className="mt-[0.7em] h-px w-4 shrink-0 bg-slate-600 transition-all duration-500 group-hover/point:w-6 group-hover/point:bg-accent"
                  />

                  <span className="transition-colors duration-300 group-hover/point:text-slate-200">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}