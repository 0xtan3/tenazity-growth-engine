import { useRef, useEffect } from "react";
import { debounce } from "@/hooks/useCanvasVisibility";

interface Shape {
  x: number;
  y: number;
  size: number;
  color: string;
  type: "circle" | "square" | "triangle";
  rotation: number;
  speedX: number;
  speedY: number;
  rotSpeed: number;
}

const COLORS = [
  "rgba(139, 92, 246, 0.15)", // Electric Purple
  "rgba(236, 72, 153, 0.15)", // Hot Pink
  "rgba(163, 230, 53, 0.15)", // Lime Green
  "rgba(6, 182, 212, 0.15)",  // Cyan
];

const STROKE_COLORS = [
  "rgba(139, 92, 246, 0.5)",
  "rgba(236, 72, 153, 0.5)",
  "rgba(163, 230, 53, 0.5)",
  "rgba(6, 182, 212, 0.5)",
];

function createShape(w: number, h: number): Shape {
  const types: ("circle" | "square" | "triangle")[] = ["circle", "square", "triangle"];
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    size: Math.random() * 60 + 20,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    type: types[Math.floor(Math.random() * types.length)],
    rotation: Math.random() * Math.PI * 2,
    speedX: (Math.random() - 0.5) * 0.4,
    speedY: (Math.random() - 0.5) * 0.4,
    rotSpeed: (Math.random() - 0.5) * 0.01,
  };
}

// Throttle to ~30fps — shapes move slowly, 60fps is overkill
const TARGET_FPS = 30;
const FRAME_INTERVAL = 1000 / TARGET_FPS;

export default function FloatingGeometry() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shapesRef = useRef<Shape[]>([]);
  const animationRef = useRef<number>(0);
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
    const SHAPE_COUNT = 12; // Reduced from 15
    shapesRef.current = Array.from({ length: SHAPE_COUNT }, () =>
      createShape(w, h)
    );

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

      shapesRef.current.forEach((s, idx) => {
        s.x += s.speedX;
        s.y += s.speedY;
        s.rotation += s.rotSpeed;

        if (s.x < -s.size) s.x = w + s.size;
        if (s.x > w + s.size) s.x = -s.size;
        if (s.y < -s.size) s.y = h + s.size;
        if (s.y > h + s.size) s.y = -s.size;

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);

        // Use strokeStyle without shadowBlur — shadowBlur is expensive GPU-side
        ctx.strokeStyle = STROKE_COLORS[idx % STROKE_COLORS.length];
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        if (s.type === "circle") {
          ctx.arc(0, 0, s.size / 2, 0, Math.PI * 2);
        } else if (s.type === "square") {
          ctx.rect(-s.size / 2, -s.size / 2, s.size, s.size);
        } else if (s.type === "triangle") {
          ctx.moveTo(0, -s.size / 2);
          ctx.lineTo(s.size / 2, s.size / 2);
          ctx.lineTo(-s.size / 2, s.size / 2);
          ctx.closePath();
        }
        ctx.stroke();
        ctx.restore();
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
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60"
      aria-hidden="true"
    />
  );
}
