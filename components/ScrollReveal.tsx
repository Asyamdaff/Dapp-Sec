"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    document.documentElement.classList.add("js");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const elements = document.querySelectorAll(".reveal");

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.classList.add("is-visible");
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    // Observe existing and newly added reveal elements.
    const observeRevealElements = (root: ParentNode) => {
      if (
        root instanceof Element &&
        root.matches(".reveal")
      ) {
        observer.observe(root);
      }

      root.querySelectorAll(".reveal").forEach((element) => {
        observer.observe(element);
      });
    };

    observeRevealElements(document);

    // Detect elements dynamically added to the page.
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            observeRevealElements(node);
          }
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}