import { useRef, useEffect } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  phase: number;
  speed: number;
}

export default function TwinklingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);

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

    const initStars = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const STAR_COUNT = 50;
      starsRef.current = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * parent.clientWidth,
        y: Math.random() * parent.clientHeight,
        size: Math.random() * 1.5 + 0.5,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
      }));
    };

    initStars();

    const animate = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      ctx.clearRect(0, 0, w, h);

      starsRef.current.forEach((s) => {
        s.phase += s.speed;
        // Twinkle between 0 and 0.4 opacity
        const opacity = (Math.sin(s.phase) + 1) / 2 * 0.4;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        // Occasionally blink pink
        ctx.fillStyle = Math.sin(s.phase * 0.5) > 0.9 
            ? `rgba(236, 72, 153, ${opacity + 0.2})` 
            : `rgba(255, 255, 255, ${opacity})`;
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
