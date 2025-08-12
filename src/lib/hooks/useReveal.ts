import { useEffect } from 'react';

/**
 * useReveal
 * Reveals elements matching the selector by toggling the 'is-visible' class
 * and applying optional data-delay / data-duration CSS timings.
 */
export function useReveal(selector: string = '.reveal-on-scroll') {
  useEffect(() => {
    const elements: NodeListOf<HTMLElement> = document.querySelectorAll(selector);
    elements.forEach((el) => {
      // Ensure base styles
      el.classList.add('reveal-on-scroll');
      el.style.willChange = 'opacity, transform';
      if (el.dataset.delay) el.style.transitionDelay = el.dataset.delay;
      if (el.dataset.duration) el.style.transitionDuration = el.dataset.duration;
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target); // reveal once
          }
        }
      },
      { threshold: 0.12 }
    );

    elements.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [selector]);
}