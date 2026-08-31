import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use a raw scroll listener with direct DOM manipulation — no framer-motion spring
    // overhead on every single scroll event. requestAnimationFrame batches updates for
    // smooth 60fps rendering without blocking the main thread.
    let rafId: number;

    const updateProgress = () => {
      const bar = barRef.current;
      if (!bar) return;

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateProgress(); // Set initial state

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none">
      {/* Progress bar — direct DOM style manipulation avoids framer-motion overhead */}
      <div
        ref={barRef}
        className="h-[3px] w-full origin-left"
        style={{
          background: "linear-gradient(90deg, #8B5CF6, #EC4899, #A3E635)",
          boxShadow: "0 0 14px rgba(236, 72, 153, 0.6)",
          transform: "scaleX(0)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
