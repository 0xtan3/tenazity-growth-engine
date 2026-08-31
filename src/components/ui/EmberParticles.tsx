import { useRef, useEffect } from "react";
import { debounce } from "@/hooks/useCanvasVisibility";

interface Ember {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  drift: number;
  driftSpeed: number;
  hue: number;
  life: number;
  maxLife: number;
  flickerOffset: number;
}

const EMBER_COLORS = [183, 188, 192, 200, 0]; // Cyan/Teal (#00ADB5) and silver (#EEEEEE)

function createEmber(canvasWidth: number, canvasHeight: number): Ember {
  return {
    x: Math.random() * canvasWidth,
    y: canvasHeight + Math.random() * 40,
    size: Math.random() * 1.8 + 0.6,
    opacity: Math.random() * 0.2 + 0.05,
    speed: Math.random() * 0.4 + 0.15,
    drift: (Math.random() - 0.5) * 0.3,
    driftSpeed: Math.random() * 0.0015 + 0.0008,
    hue: EMBER_COLORS[Math.floor(Math.random() * EMBER_COLORS.length)],
    life: 0,
    maxLife: Math.random() * 450 + 250,
    flickerOffset: Math.random() * Math.PI * 2,
  };
}

export default function EmberParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const embersRef = useRef<Ember[]>([]);
  const animationRef = useRef<number>(0);
  // Cache dimensions to avoid getBoundingClientRect every frame
  const dimsRef = useRef({ width: 0, height: 0 });
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateDims = () => {
      const rect = canvas.getBoundingClientRect();
      dimsRef.current = { width: rect.width, height: rect.height };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      dimsRef.current = { width: rect.width, height: rect.height };
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    const debouncedResize = debounce(resize, 150);
    window.addEventListener("resize", debouncedResize);

    // Initialize embers — reduced from 45 to 28 for lighter load
    const { width, height } = dimsRef.current;
    const EMBER_COUNT = Math.min(28, Math.floor(width / 30));
    embersRef.current = Array.from({ length: EMBER_COUNT }, () =>
      createEmber(width, height)
    );
    embersRef.current.forEach((e) => {
      e.y = Math.random() * height;
      e.life = Math.random() * e.maxLife;
    });

    // IntersectionObserver — pause when off screen
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { rootMargin: "100px" }
    );
    observer.observe(canvas);

    let frame = 0;
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      if (!isVisibleRef.current) return; // Pause when off-screen

      const { width, height } = dimsRef.current;
      ctx.clearRect(0, 0, width, height);
      frame++;

      embersRef.current.forEach((ember, i) => {
        ember.y -= ember.speed;
        ember.x += Math.sin(frame * ember.driftSpeed + ember.flickerOffset) * ember.drift;
        ember.life++;

        const flicker = Math.sin(frame * 0.05 + ember.flickerOffset) * 0.15;
        const lifeRatio = ember.life / ember.maxLife;
        const fadeIn = Math.min(lifeRatio * 5, 1);
        const fadeOut = lifeRatio > 0.7 ? 1 - (lifeRatio - 0.7) / 0.3 : 1;
        const currentOpacity = Math.max(0, ember.opacity * fadeIn * fadeOut + flicker * 0.1);

        const saturation = 85;
        const lightness = 60;

        // Outer glow
        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${ember.hue}, ${saturation}%, ${lightness}%, ${currentOpacity * 0.15})`;
        ctx.fill();

        // Core ember
        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${ember.hue}, ${saturation}%, ${lightness}%, ${currentOpacity})`;
        ctx.fill();

        // Hot center
        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.size * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${ember.hue}, 60%, 85%, ${currentOpacity * 0.8})`;
        ctx.fill();

        if (ember.life >= ember.maxLife || ember.y < -20) {
          embersRef.current[i] = createEmber(width, height);
        }
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
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
}
