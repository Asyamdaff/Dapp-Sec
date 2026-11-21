import Reveal from "./Reveal";
import { experience, hero, site } from "@/lib/content";

export default function Hero() {
  const current = experience.find((e) => e.current);

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pb-12 pt-32 md:px-12"
    >
      {/* Quiet atmosphere: one soft light source and one fine vertical rule. No grids or hacker motifs. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-48 top-[15%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.12),transparent)]" />
        <div className="absolute bottom-0 left-[25%] top-0 hidden w-px bg-gradient-to-b from-transparent via-white/[0.07] to-transparent md:block" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 items-center gap-16 md:grid-cols-12">
        <Reveal className="md:col-span-3">
          <p className="font-mono text-[11px] tracking-[0.22em] text-slate-600">INDEX — 01</p>
          <div className="mt-4 h-px w-10 bg-accent/50" aria-hidden />
          <dl className="mt-8 space-y-6 text-sm">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-600">Focus</dt>
              <dd className="mt-2 space-y-1 text-slate-300">
                <p>Endpoint Security & Management</p>
                <p>Security Engineering</p>
                <p>Vulnerability Management</p>
              </dd>
            </div>
            {current && (
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-600">Currently</dt>
                <dd className="mt-2 text-slate-300">
                  {current.role}
                  <span className="block text-slate-500">{current.org}</span>
                </dd>
              </div>
            )}
          </dl>
        </Reveal>

        <div className="md:col-span-9 md:text-right">
          <Reveal delay={100}>
            <p className="eyebrow">{hero.eyebrow}</p>
            <p className="mt-4 text-lg text-slate-300 md:text-xl">{site.name}</p>
          </Reveal>

          <Reveal delay={200}>
            <h1
              id="hero-title"
              className="display mt-6 text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-[5.5rem] lg:leading-[0.98]"
            >
              {hero.headline}
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="ml-auto mt-8 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">{hero.bio}</p>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-10 flex flex-wrap gap-4 md:justify-end">
              <a href="#projects" className="btn-primary group">
                View projects
                <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </a>
              <a href="#contact" className="btn-ghost group">
                Get in touch
                <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={500} className="relative mx-auto mt-16 flex w-full max-w-6xl justify-end md:justify-start">
        <a
          href="#about"
          className="group inline-flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-600 transition-colors hover:text-accent"
        >
          <span className="relative h-10 w-px overflow-hidden bg-white/10">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[drop_2.4s_ease-in-out_infinite] bg-accent" />
          </span>
          Scroll
        </a>
      </Reveal>
    </section>
  );
}
