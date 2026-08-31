import { useRef, useEffect } from "react";
import { debounce } from "@/hooks/useCanvasVisibility";

interface Star {
  x: number;
  y: number;
  size: number;
  phase: number;
  speed: number;
}

// Throttle to 20fps — twinkling is designed to be slow
const TARGET_FPS = 20;
const FRAME_INTERVAL = 1000 / TARGET_FPS;

export default function TwinklingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
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

    const { w, h } = dimsRef.current;
    // Reduced from 50 to 35 stars
    const STAR_COUNT = 35;
    starsRef.current = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 1.5 + 0.5,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.01,
    }));

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

      starsRef.current.forEach((s) => {
        s.phase += s.speed;
        const opacity = (Math.sin(s.phase) + 1) / 2 * 0.4;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        // Occasionally blink pink
        ctx.fillStyle = Math.sin(s.phase * 0.5) > 0.9
          ? `rgba(236, 72, 153, ${opacity + 0.2})`
          : `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      });
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
      // Removed mix-blend-screen — forces expensive GPU compositing layer
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-70"
      aria-hidden="true"
    />
  );
}
