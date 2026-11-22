import Section from "./Section";
import Reveal from "./Reveal";
import { site } from "@/lib/content";

export default function Contact() {
  const links = [
    {
      label: "LinkedIn",
      value: site.linkedin.replace(/^https?:\/\/(www\.)?/, ""),
      href: site.linkedin,
    },
    {
      label: "GitHub",
      value: site.github.replace(/^https?:\/\/(www\.)?/, ""),
      href: site.github,
    },
  ];

  return (
    <Section
      id="contact"
      index="07"
      eyebrow="Contact"
      title="Open to security engineering conversations."
    >
      {/* Contact Introduction */}
      <Reveal>
        <p className="max-w-xl text-xl leading-relaxed text-white md:text-2xl md:leading-relaxed">
          I'm open to professional opportunities, collaborations, and
          technical discussions in cybersecurity, particularly Endpoint
          Security & Management, Security Engineering, and Vulnerability
          Management. Feel free to connect with me on LinkedIn.
        </p>

        {/* Primary CTA */}
        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary group mt-10"
        >
          <span>Start a conversation</span>

          <span
            aria-hidden
            className="transition-transform duration-500 group-hover:translate-x-1.5"
          >
            →
          </span>
        </a>
      </Reveal>

      {/* Social Links */}
      <Reveal delay={150}>
        <ul className="mt-20 divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-6 px-3 py-6 transition-colors duration-500 hover:bg-white/[0.015] sm:px-4"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500 transition-colors duration-300 group-hover:text-accent">
                  {link.label}
                </span>

                <span className="flex min-w-0 items-center gap-3 text-base text-white transition-colors duration-500 group-hover:text-accent md:text-lg">
                  <span className="link-line truncate">
                    {link.value}
                  </span>

                  <span
                    aria-hidden
                    className="shrink-0 transition-transform duration-500 group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}