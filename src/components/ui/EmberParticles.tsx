import { useRef, useEffect } from "react";

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Initialize embers
    const rect = canvas.getBoundingClientRect();
    const EMBER_COUNT = Math.min(45, Math.floor(rect.width / 25));
    embersRef.current = Array.from({ length: EMBER_COUNT }, () =>
      createEmber(rect.width, rect.height)
    );
    // Spread initial embers across the canvas so they don't all start at the bottom
    embersRef.current.forEach((e) => {
      e.y = Math.random() * rect.height;
      e.life = Math.random() * e.maxLife;
    });

    let frame = 0;
    const animate = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      frame++;

      embersRef.current.forEach((ember, i) => {
        // Update position
        ember.y -= ember.speed;
        ember.x += Math.sin(frame * ember.driftSpeed + ember.flickerOffset) * ember.drift;
        ember.life++;

        // Flicker opacity
        const flicker = Math.sin(frame * 0.05 + ember.flickerOffset) * 0.15;
        const lifeRatio = ember.life / ember.maxLife;
        const fadeIn = Math.min(lifeRatio * 5, 1); // fade in over first 20% of life
        const fadeOut = lifeRatio > 0.7 ? 1 - (lifeRatio - 0.7) / 0.3 : 1; // fade out last 30%
        const currentOpacity = Math.max(0, ember.opacity * fadeIn * fadeOut + flicker * 0.1);

        // Draw ember with glow
        const saturation = 85 + Math.random() * 10;
        const lightness = 55 + Math.random() * 15;

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

        // Recycle if dead or off-screen
        if (ember.life >= ember.maxLife || ember.y < -20) {
          embersRef.current[i] = createEmber(width, height);
        }
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
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
}
