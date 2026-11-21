import Section from "./Section";
import Reveal from "./Reveal";
import { experience } from "@/lib/content";

export default function Experience() {
  return (
    <Section id="experience" index="04" eyebrow="Experience" title="Where the work has taken me.">
      <ol>
        {experience.map((job, i) => (
          <Reveal
            as="li"
            key={job.role + job.period}
            delay={i * 120}
            className="relative grid gap-4 border-l border-white/[0.08] pb-16 pl-8 last:pb-0 md:pl-10"
          >
            <span
              aria-hidden
              className={`absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full ${
                job.current ? "bg-accent ring-4 ring-accent/10" : "bg-slate-700"
              }`}
            />
            <p className="font-mono text-xs text-slate-500">{job.period}</p>
            <h3 className="text-2xl font-medium text-white">{job.role}</h3>
            <p className="text-sm text-accent/80">{job.org}</p>
            <p className="max-w-xl pt-2 leading-relaxed">{job.summary}</p>
            <ul className="mt-2 max-w-xl space-y-3 text-sm leading-relaxed">
              {job.points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-slate-600" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
