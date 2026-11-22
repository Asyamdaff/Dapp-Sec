"use client";

import { useState } from "react";
import Section from "./Section";
import Reveal from "./Reveal";
import CertificateThumbnail from "./CertificateThumbnail";
import { certifications } from "@/lib/content";

const INITIAL_VISIBLE = 6;

export default function Certifications() {
  const [showAll, setShowAll] = useState(false);

  const visibleCertifications = showAll
    ? certifications
    : certifications.slice(0, INITIAL_VISIBLE);

  return (
    <Section
      id="certifications"
      index="06"
      eyebrow="Certifications"
      title="Credentials that back up the practice."
    >
      <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2">
        {visibleCertifications.map((c, i) => (
          <Reveal
            as="li"
            key={c.name}
            delay={Math.min(i * 60, 300)}
            className="group bg-ink"
          >
            <div className="flex h-full items-center gap-6 border border-transparent p-6 transition-all duration-500 hover:border-accent/20 hover:bg-charcoal md:p-8">
              {/* Certificate Thumbnail */}
              <div className="shrink-0 overflow-hidden rounded-xl [&_img]:transition-transform [&_img]:duration-500 group-hover:[&_img]:scale-105">
                <CertificateThumbnail src={c.image} alt={c.name} />
              </div>

              {/* Certificate Information */}
              <div className="min-w-0 flex-1">
                <p className="text-lg text-white transition-colors duration-300 group-hover:text-accent">
                  {c.name}
                </p>

                <p className="mt-1 text-sm text-slate-500 transition-colors duration-300 group-hover:text-slate-400">
                  {c.issuer}
                </p>

                <p className="mt-3 font-mono text-[11px] tracking-wide text-slate-600">
                  {c.expires
                    ? `Issued ${c.issued} · Expires ${c.expires}`
                    : `Issued ${c.issued}`}
                </p>
              </div>

              {/* Certificate Number */}
              <span
                aria-hidden
                className="self-start font-mono text-xs text-slate-600 transition-colors duration-500 group-hover:text-accent"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          </Reveal>
        ))}
      </ul>

      {/* Show All / Show Less */}
      {certifications.length > INITIAL_VISIBLE && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            aria-expanded={showAll}
            className="group inline-flex items-center gap-3 py-3 font-mono text-xs uppercase tracking-[0.16em] text-slate-400 transition-colors duration-300 hover:text-accent"
          >
            {showAll
              ? "Show less"
              : `Show all ${certifications.length} certifications`}

            <span
              aria-hidden
              className={`transition-transform duration-300 group-hover:translate-y-0.5 ${
                showAll ? "rotate-180" : ""
              }`}
            >
              ↓
            </span>
          </button>
        </div>
      )}
    </Section>
  );
}