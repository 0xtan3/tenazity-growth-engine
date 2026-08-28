import { useRef, useEffect } from "react";

export default function SubtleAurora() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

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

    const animate = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      ctx.clearRect(0, 0, w, h);
      timeRef.current += 0.005; // Very slow
      const t = timeRef.current;

      // Draw two large, blurry, soft orbs
      const drawOrb = (cx: number, cy: number, r: number, color1: string, color2: string) => {
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      };

      // Orb 1 (Purple)
      const x1 = w / 2 + Math.cos(t) * (w / 4);
      const y1 = h / 2 + Math.sin(t * 0.8) * (h / 4);
      drawOrb(x1, y1, w * 0.6, "rgba(139, 92, 246, 0.07)", "rgba(139, 92, 246, 0)");

      // Orb 2 (Pink)
      const x2 = w / 2 + Math.sin(t * 1.2) * (w / 3);
      const y2 = h / 2 + Math.cos(t * 0.9) * (h / 3);
      drawOrb(x2, y2, w * 0.5, "rgba(236, 72, 153, 0.05)", "rgba(236, 72, 153, 0)");

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
      className="absolute inset-0 w-full h-full pointer-events-none z-0 mix-blend-screen opacity-70"
      aria-hidden="true"
    />
  );
}
