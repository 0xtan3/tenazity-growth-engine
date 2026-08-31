import { useRef, useEffect } from "react";
import { debounce } from "@/hooks/useCanvasVisibility";

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
  const dimsRef = useRef({ w: 0, h: 0 });
  const isVisibleRef = useRef(false);

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
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      dimsRef.current = { w, h };
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      columns = Math.floor(w / fontSize);
      dropsRef.current = [];
      for (let x = 0; x < columns; x++) {
        dropsRef.current[x] = Math.random() * -100;
      }
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

    let lastTime = 0;
    const fps = 20; // Slower, more readable matrix
    const interval = 1000 / fps;

    const animate = (time: number) => {
      animationRef.current = requestAnimationFrame(animate);
      if (!isVisibleRef.current) return; // Pause when off-screen
      if (time - lastTime < interval) return;
      lastTime = time;

      const { w, h } = dimsRef.current;

      // Fading trail effect
      ctx.fillStyle = "rgba(10, 5, 20, 0.15)";
      ctx.fillRect(0, 0, w, h);

      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < dropsRef.current.length; i++) {
        const text = CHARS.charAt(Math.floor(Math.random() * CHARS.length));
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
      window.removeEventListener("resize", debouncedResize);
      cancelAnimationFrame(animationRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      // Removed mix-blend-screen — forces GPU compositing layer
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40"
      aria-hidden="true"
    />
  );
}
