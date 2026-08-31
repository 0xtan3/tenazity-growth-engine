import { useRef, useEffect } from "react";
import { debounce } from "@/hooks/useCanvasVisibility";

interface Blob {
  x: number;
  y: number;
  r: number;
  phase: number;
  speed: number;
  color: string;
}

// Throttle to ~20fps — blobs move imperceptibly slowly, 60fps is massive overkill
const TARGET_FPS = 20;
const FRAME_INTERVAL = 1000 / TARGET_FPS;

export default function FloatingBlobs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const blobsRef = useRef<Blob[]>([]);
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

      // Re-init blobs on resize
      blobsRef.current = [
        { x: w * 0.2, y: h * 0.3, r: Math.min(w, h) * 0.2, phase: 0, speed: 0.005, color: "rgba(139, 92, 246, 0.08)" },
        { x: w * 0.8, y: h * 0.7, r: Math.min(w, h) * 0.25, phase: Math.PI, speed: 0.004, color: "rgba(236, 72, 153, 0.06)" },
        { x: w * 0.5, y: h * 0.5, r: Math.min(w, h) * 0.3, phase: Math.PI / 2, speed: 0.003, color: "rgba(163, 230, 53, 0.04)" }
      ];
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
      timeRef.current += 1;
      const t = timeRef.current;

      blobsRef.current.forEach((b) => {
        const dx = Math.sin(t * b.speed + b.phase) * (w * 0.1);
        const dy = Math.cos(t * b.speed * 0.8 + b.phase) * (h * 0.1);

        const gradient = ctx.createRadialGradient(b.x + dx, b.y + dy, 0, b.x + dx, b.y + dy, b.r);
        gradient.addColorStop(0, b.color);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(b.x + dx, b.y + dy, b.r, 0, Math.PI * 2);
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
      // Removed mix-blend-screen — it forces a GPU compositing layer that's expensive
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
      aria-hidden="true"
    />
  );
}
