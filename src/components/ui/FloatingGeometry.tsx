import { useRef, useEffect } from "react";

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

export default function FloatingGeometry() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shapesRef = useRef<Shape[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
      canvas.style.width = `${parent.clientWidth}px`;
      canvas.style.height = `${parent.clientHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const SHAPE_COUNT = 15;
    shapesRef.current = Array.from({ length: SHAPE_COUNT }, () =>
      createShape(canvas.clientWidth, canvas.clientHeight)
    );

    const animate = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      ctx.clearRect(0, 0, w, h);

      shapesRef.current.forEach((s) => {
        s.x += s.speedX;
        s.y += s.speedY;
        s.rotation += s.rotSpeed;

        // Bounce off edges
        if (s.x < -s.size) s.x = w + s.size;
        if (s.x > w + s.size) s.x = -s.size;
        if (s.y < -s.size) s.y = h + s.size;
        if (s.y > h + s.size) s.y = -s.size;

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 2;
        
        // Add a subtle inner glow
        ctx.shadowColor = s.color.replace('0.15', '0.5');
        ctx.shadowBlur = 10;

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

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
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
