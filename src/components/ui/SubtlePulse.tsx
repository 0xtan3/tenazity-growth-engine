import { useRef, useEffect } from "react";

export default function SubtlePulse() {
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
      timeRef.current += 0.002; // Very slow pulse
      const t = timeRef.current;

      const cx = w / 2;
      const cy = h / 2;
      const maxRadius = Math.max(w, h);
      const numRings = 5;

      ctx.lineWidth = 1;

      for (let i = 0; i < numRings; i++) {
        // Offset each ring's phase
        const phase = (i / numRings) + t;
        const normalizedPhase = phase % 1;
        
        const radius = normalizedPhase * maxRadius;
        // Fade out as it gets larger
        const opacity = (1 - normalizedPhase) * 0.08;

        ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`; // Subtle purple
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

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
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
