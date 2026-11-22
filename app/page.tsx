import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CompanyMarquee from "@/components/CompanyMarquee";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import ScrollReveal from "@/components/ScrollReveal";
import { site } from "@/lib/content";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>

      <Nav />

      <ScrollReveal />

      <main id="main">
        <Hero />

        <About />

        <div className="reveal">
          <CompanyMarquee />
        </div>

        <div className="reveal">
          <Skills />
        </div>

        <div className="reveal">
          <Experience />
        </div>

        <div className="reveal">
          <Projects />
        </div>

        <div className="reveal">
          <Certifications />
        </div>

        <div className="reveal">
          <Contact />
        </div>
      </main>

      <footer className="border-t border-white/[0.06] px-6 py-8 text-xs text-slate-500 md:px-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>

          <p className="font-mono">
            Built with Next.js, React, TypeScript &amp; Tailwind CSS
          </p>
        </div>
      </footer>
    </>
  );
}
