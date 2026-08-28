import { useRef, useEffect } from "react";

export default function NeonGrid() {
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
      timeRef.current += 0.5; // Scroll speed
      const t = timeRef.current;

      const gridSize = 60;
      const perspective = 0.5;

      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(139, 92, 246, 0.08)"; // Very faint purple

      // Horizontal lines (moving forward)
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
        const endX = center + i * gridSize * 4; // Spread out at the bottom
        ctx.moveTo(startX, h / 2);
        ctx.lineTo(endX, h);
        ctx.stroke();
      }

      // Fade out top edge to blend seamlessly
      const gradient = ctx.createLinearGradient(0, h / 2, 0, h / 2 + 100);
      gradient.addColorStop(0, "#0A0514"); // Background color
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, h / 2, w, 100);

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
