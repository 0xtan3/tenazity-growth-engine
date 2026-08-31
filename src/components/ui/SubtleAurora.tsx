import { useRef, useEffect } from "react";
import { debounce } from "@/hooks/useCanvasVisibility";

// Throttle to 24fps — orbs move imperceptibly slowly
const TARGET_FPS = 24;
const FRAME_INTERVAL = 1000 / TARGET_FPS;

export default function SubtleAurora() {
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

    const drawOrb = (cx: number, cy: number, r: number, color1: string, color2: string) => {
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      gradient.addColorStop(0, color1);
      gradient.addColorStop(1, color2);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = (timestamp: number) => {
      animationRef.current = requestAnimationFrame(animate);
      if (!isVisibleRef.current) return;
      if (timestamp - lastFrameTime.current < FRAME_INTERVAL) return;
      lastFrameTime.current = timestamp;

      const { w, h } = dimsRef.current;
      ctx.clearRect(0, 0, w, h);
      timeRef.current += 0.005;
      const t = timeRef.current;

      // Orb 1 (Purple)
      const x1 = w / 2 + Math.cos(t) * (w / 4);
      const y1 = h / 2 + Math.sin(t * 0.8) * (h / 4);
      drawOrb(x1, y1, w * 0.6, "rgba(139, 92, 246, 0.07)", "rgba(139, 92, 246, 0)");

      // Orb 2 (Pink)
      const x2 = w / 2 + Math.sin(t * 1.2) * (w / 3);
      const y2 = h / 2 + Math.cos(t * 0.9) * (h / 3);
      drawOrb(x2, y2, w * 0.5, "rgba(236, 72, 153, 0.05)", "rgba(236, 72, 153, 0)");
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
      // Removed mix-blend-screen — forces compositing layer, expensive
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-70"
      aria-hidden="true"
    />
  );
}
