
"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 450);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className={`
        fixed bottom-24 right-6 z-50
        flex h-11 w-11 items-center justify-center
        rounded-full border border-white/10
        bg-[#111318]/90 text-[#7dd3fc]
        shadow-lg shadow-black/20 backdrop-blur-md
        transition-all duration-300 ease-out
        hover:border-[#7dd3fc]/40
        hover:bg-[#7dd3fc]/10
        hover:-translate-y-1
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#7dd3fc]
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[#0a0b0e]
        ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  );
}
