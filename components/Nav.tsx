"use client";

import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/content";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const progress = useRef<HTMLDivElement>(null);

  // Scroll state and progress bar. The bar is set via transform to avoid re-rendering on every scroll.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 24);
      if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Highlight the nav link for the section currently at the middle of the viewport.
  useEffect(() => {
    const targets = nav
      .map((n) => document.querySelector<HTMLElement>(n.href))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
        scrolled || open ? "border-b border-white/[0.06] bg-ink/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-12">
        <a href="#top" className="group flex items-baseline gap-1 text-sm font-medium tracking-tight text-white">
          {site.name.split(" ")[0]}
          <span className="text-accent transition-transform duration-500 group-hover:translate-x-0.5">.</span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => {
            const isActive = active === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`link-line pb-0.5 text-sm transition-colors duration-300 hover:text-white ${
                    isActive ? "text-white" : "text-slate-400"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="-mr-2 rounded-full p-2 text-slate-300 lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </nav>

      <div
        ref={progress}
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-accent/0 via-accent to-accent/0"
        style={{ transform: "scaleX(0)" }}
      />

      {open && (
        <ul id="mobile-menu" className="border-t border-white/[0.06] bg-ink/95 px-6 pb-8 pt-2 backdrop-blur-xl lg:hidden">
          {nav.map((item) => (
            <li key={item.href} className="border-b border-white/[0.05] last:border-0">
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-4 text-xl text-slate-300 transition-colors hover:text-white"
              >
                {item.label}
                <span aria-hidden className="font-mono text-xs text-slate-600">→</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
