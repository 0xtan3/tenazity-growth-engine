import { useRef, useEffect } from "react";
import { debounce } from "@/hooks/useCanvasVisibility";

// Throttle to 24fps — a scrolling grid doesn't need 60fps
const TARGET_FPS = 24;
const FRAME_INTERVAL = 1000 / TARGET_FPS;

export default function NeonGrid() {
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
      timeRef.current += 0.5;
      const t = timeRef.current;

      const gridSize = 60;
      const perspective = 0.5;

      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(139, 92, 246, 0.08)";

      // Horizontal lines
      const offset = t % gridSize;
      for (let y = h / 2; y < h; y += Math.max(1, (y - h / 2) * perspective)) {
        const actualY = y + offset * ((y - h / 2) / h);
        if (actualY < h) {
          ctx.beginPath();
          ctx.moveTo(0, actualY);
          ctx.lineTo(w, actualY);
          ctx.stroke();
        }
      }

      // Vertical lines (perspective)
      const center = w / 2;
      for (let i = -20; i <= 20; i++) {
        ctx.beginPath();
        const startX = center + i * gridSize;
        const endX = center + i * gridSize * 4;
        ctx.moveTo(startX, h / 2);
        ctx.lineTo(endX, h);
        ctx.stroke();
      }

      // Fade out top edge
      const gradient = ctx.createLinearGradient(0, h / 2, 0, h / 2 + 100);
      gradient.addColorStop(0, "#0A0514");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, h / 2, w, 100);
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
