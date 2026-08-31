import { useRef, useEffect, useState } from "react";

/**
 * Tracks whether an element is visible in the viewport using IntersectionObserver.
 * Use this to pause canvas animation loops when they're off-screen, saving CPU/GPU.
 *
 * @param rootMargin - Extra margin around the viewport (default "100px" = start animating slightly before visible)
 * @returns { ref, isVisible } - Attach ref to the canvas/container; isVisible tells you when to run rAF
 */
export function useCanvasVisibility(rootMargin = "100px") {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, isVisible };
}

/**
 * A shared debounce utility for resize handlers on canvas components.
 * Prevents 9+ simultaneous layout recalculations during window resize.
 */
export function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}
