import Section from "./Section";
import Reveal from "./Reveal";
import { site } from "@/lib/content";

export default function Contact() {
  const links = [
    { label: "Email", value: site.email, href: `mailto:${site.email}`, external: false },
    {
      label: "LinkedIn",
      value: site.linkedin.replace(/^https?:\/\/(www\.)?/, ""),
      href: site.linkedin,
      external: true,
    },
    {
      label: "GitHub",
      value: site.github.replace(/^https?:\/\/(www\.)?/, ""),
      href: site.github,
      external: true,
    },
  ];

  return (
    <Section id="contact" index="07" eyebrow="Contact" title="Open to security engineering conversations.">
      <Reveal>
        <p className="max-w-xl text-xl leading-relaxed text-white md:text-2xl md:leading-relaxed">
          For roles, collaboration, or a technical conversation about Endpoint Security & Management, Security Engineering, or
          vulnerability management, email is the best route.
        </p>
        <a href={`mailto:${site.email}`} className="btn-primary group mt-10">
          Start a conversation
          <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
        </a>
      </Reveal>

      <Reveal delay={150}>
        <ul className="mt-20 divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                className="group flex items-center justify-between gap-6 py-6"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">{l.label}</span>
                <span className="flex items-center gap-3 text-base text-white transition-colors duration-500 group-hover:text-accent md:text-lg">
                  <span className="link-line">{l.value}</span>
                  <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
