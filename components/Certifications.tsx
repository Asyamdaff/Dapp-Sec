import Section from "./Section";
import Reveal from "./Reveal";
import CertificateThumbnail from "./CertificateThumbnail";
import { certifications } from "@/lib/content";

export default function Certifications() {
  return (
    <Section id="certifications" index="06" eyebrow="Certifications" title="Credentials that back up the practice.">
      <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2">
        {certifications.map((c, i) => (
          <Reveal as="li" key={c.name} delay={i * 80} className="bg-ink">
            <div className="group flex h-full items-center gap-6 p-6 transition-colors duration-500 hover:bg-charcoal md:p-8">
              <CertificateThumbnail src={c.image} alt={c.name} />

              <div className="min-w-0 flex-1">
                <p className="text-lg text-white">{c.name}</p>
                <p className="mt-1 text-sm text-slate-500">{c.issuer}</p>
                <p className="mt-3 font-mono text-[11px] tracking-wide text-slate-600">
                  {c.expires ? `Issued ${c.issued} · Expires ${c.expires}` : `Issued ${c.issued}`}
                </p>
              </div>

              <span
                aria-hidden
                className="self-start font-mono text-xs text-slate-600 transition-colors duration-500 group-hover:text-accent"
              >
                0{i + 1}
              </span>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}