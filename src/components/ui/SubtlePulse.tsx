import { useRef, useEffect } from "react";
import { debounce } from "@/hooks/useCanvasVisibility";

// Throttle to 20fps — pulse rings expand extremely slowly
const TARGET_FPS = 20;
const FRAME_INTERVAL = 1000 / TARGET_FPS;

export default function SubtlePulse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const dimsRef = useRef({ w: 0, h: 0 });
  const isVisibleRef = useRef(false);
  const lastFrameTime = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      dimsRef.current = { w, h };
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const debouncedResize = debounce(resize, 150);
    window.addEventListener("resize", debouncedResize);

    // IntersectionObserver — pause when off screen
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { rootMargin: "100px" }
    );
    observer.observe(canvas);

    const animate = (timestamp: number) => {
      animationRef.current = requestAnimationFrame(animate);
      if (!isVisibleRef.current) return;
      if (timestamp - lastFrameTime.current < FRAME_INTERVAL) return;
      lastFrameTime.current = timestamp;

      const { w, h } = dimsRef.current;
      ctx.clearRect(0, 0, w, h);
      timeRef.current += 0.002;
      const t = timeRef.current;

      const cx = w / 2;
      const cy = h / 2;
      const maxRadius = Math.max(w, h);
      const numRings = 5;

      ctx.lineWidth = 1;

      for (let i = 0; i < numRings; i++) {
        const phase = (i / numRings) + t;
        const normalizedPhase = phase % 1;
        const radius = normalizedPhase * maxRadius;
        const opacity = (1 - normalizedPhase) * 0.08;

        ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      cancelAnimationFrame(animationRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
