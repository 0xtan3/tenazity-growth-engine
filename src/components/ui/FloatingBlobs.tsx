import { useRef, useEffect } from "react";

interface Blob {
  x: number;
  y: number;
  r: number;
  phase: number;
  speed: number;
  color: string;
}

export default function FloatingBlobs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const blobsRef = useRef<Blob[]>([]);

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

    const initBlobs = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      blobsRef.current = [
        { x: w * 0.2, y: h * 0.3, r: Math.min(w, h) * 0.2, phase: 0, speed: 0.005, color: "rgba(139, 92, 246, 0.08)" },
        { x: w * 0.8, y: h * 0.7, r: Math.min(w, h) * 0.25, phase: Math.PI, speed: 0.004, color: "rgba(236, 72, 153, 0.06)" },
        { x: w * 0.5, y: h * 0.5, r: Math.min(w, h) * 0.3, phase: Math.PI / 2, speed: 0.003, color: "rgba(163, 230, 53, 0.04)" }
      ];
    };

    initBlobs();

    const animate = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
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
      className="absolute inset-0 w-full h-full pointer-events-none z-0 mix-blend-screen"
      aria-hidden="true"
    />
  );
}
