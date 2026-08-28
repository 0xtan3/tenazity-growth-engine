import { useRef, useEffect } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+{}|:<>?";
const COLORS = [
  "rgba(139, 92, 246, 0.4)", // Electric Purple
  "rgba(236, 72, 153, 0.4)", // Hot Pink
  "rgba(163, 230, 53, 0.4)", // Lime Green
  "rgba(6, 182, 212, 0.4)",  // Cyan
];

export default function PopCodeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const dropsRef = useRef<number[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let columns = 0;
    const fontSize = 14;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
      canvas.style.width = `${parent.clientWidth}px`;
      canvas.style.height = `${parent.clientHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      columns = Math.floor(parent.clientWidth / fontSize);
      dropsRef.current = [];
      for (let x = 0; x < columns; x++) {
        dropsRef.current[x] = Math.random() * -100; // Start offscreen randomly
      }
    };

    resize();
    window.addEventListener("resize", resize);

    let lastTime = 0;
    const fps = 20; // Slower, more readable matrix
    const interval = 1000 / fps;

    const animate = (time: number) => {
      animationRef.current = requestAnimationFrame(animate);

      if (time - lastTime < interval) return;
      lastTime = time;

      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;

      // Fading trail effect
      ctx.fillStyle = "rgba(10, 5, 20, 0.15)";
      ctx.fillRect(0, 0, w, h);

      ctx.font = `bold ${fontSize}px monospace`;
      
      for (let i = 0; i < dropsRef.current.length; i++) {
        const text = CHARS.charAt(Math.floor(Math.random() * CHARS.length));
        
        // Randomly pick color per drop
        ctx.fillStyle = COLORS[Math.floor(Math.random() * COLORS.length)];
        
        ctx.fillText(text, i * fontSize, dropsRef.current[i] * fontSize);
        
        if (dropsRef.current[i] * fontSize > h && Math.random() > 0.975) {
          dropsRef.current[i] = 0;
        }
        
        dropsRef.current[i]++;
      }
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
      className="absolute inset-0 w-full h-full pointer-events-none z-0 mix-blend-screen opacity-50"
      aria-hidden="true"
    />
  );
}
