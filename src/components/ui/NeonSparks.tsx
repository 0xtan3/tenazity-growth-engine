import { useRef, useEffect, useCallback } from "react";

interface Spark {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  speedY: number;
  driftAmplitude: number;
  driftFreq: number;
  phase: number;
  color: string;
  life: number;
  maxLife: number;
}

const COLORS = [
  "139, 92, 246",   // #8B5CF6 Electric Purple
  "236, 72, 153",   // #EC4899 Hot Pink
  "163, 230, 53",   // #A3E635 Lime Green
  "56, 189, 248",   // #38BDF8 Sky Blue
];

function createSpark(w: number, h: number): Spark {
  const colorIdx = Math.floor(Math.random() * COLORS.length);
  const baseOpacity = Math.random() * 0.4 + 0.2;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    baseX: Math.random() * w,
    baseY: Math.random() * h,
    size: Math.random() * 2.5 + 1.0,
    opacity: baseOpacity,
    baseOpacity,
    speedY: -(Math.random() * 0.4 + 0.1),
    driftAmplitude: Math.random() * 20 + 5,
    driftFreq: Math.random() * 0.003 + 0.001,
    phase: Math.random() * Math.PI * 2,
    color: COLORS[colorIdx],
    life: Math.random() * 400,
    maxLife: Math.random() * 600 + 200,
  };
}

export default function NeonSparks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Spark[]>([]);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const frameRef = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Only track mouse if within the hero section bounds roughly (or just let it track anywhere)
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

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
    window.addEventListener("mousemove", handleMouseMove);

    // Initialize particles
    const PARTICLE_COUNT = 60; // Concentrated for hero section
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
      createSpark(canvas.clientWidth, canvas.clientHeight)
    );

    const animate = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      ctx.clearRect(0, 0, w, h);
      frameRef.current++;

      // Adjust mouse pos relative to canvas parent
      const rect = canvas.getBoundingClientRect();
      const mx = mouseRef.current.x - rect.left;
      const my = mouseRef.current.y - rect.top;
      const frame = frameRef.current;

      particlesRef.current.forEach((p, i) => {
        // Update position
        p.y += p.speedY;
        p.x = p.baseX + Math.sin(frame * p.driftFreq + p.phase) * p.driftAmplitude;
        p.life++;

        // Mouse repulsion — gentle push
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 150;

        if (dist < repelRadius && dist > 0) {
          const force = (1 - dist / repelRadius) * 4; // Stronger push for sparks
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        // Fade lifecycle
        const lifeRatio = p.life / p.maxLife;
        const fadeIn = Math.min(lifeRatio * 4, 1);
        const fadeOut = lifeRatio > 0.75 ? 1 - (lifeRatio - 0.75) / 0.25 : 1;
        const flicker = Math.sin(frame * 0.05 + p.phase) * 0.1;
        const currentOpacity = Math.max(0, p.baseOpacity * fadeIn * fadeOut + flicker);

        // Draw outer glow (Neon effect)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${currentOpacity * 0.2})`;
        ctx.fill();

        // Draw core particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${currentOpacity})`;
        ctx.fill();

        // Draw bright center (White-hot core)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.8})`;
        ctx.fill();

        // Recycle dead particles
        if (p.life >= p.maxLife || p.y < -30) {
          particlesRef.current[i] = createSpark(w, h);
          particlesRef.current[i].y = h + Math.random() * 40;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [handleMouseMove]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
