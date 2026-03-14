import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const phases = [
  { word: "Build.", progress: 33 },
  { word: "Scale.", progress: 66 },
  { word: "Secure.", progress: 100 },
];

const CHAR_SET = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ{}[]<>/=";
const COL_COUNT = 40;

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, drops: number[]) => {
    ctx.fillStyle = "rgba(8, 10, 14, 0.12)";
    ctx.fillRect(0, 0, w, h);

    const fontSize = 14;
    const cols = Math.floor(w / fontSize);

    // Use CSS variable color via computed style
    ctx.fillStyle = "hsl(174 100% 50% / 0.35)";
    ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

    for (let i = 0; i < cols; i++) {
      const char = CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)];
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > h && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const fontSize = 14;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: cols }, () => Math.random() * -50);

    const id = setInterval(() => draw(ctx, canvas.width, canvas.height, drops), 50);

    return () => {
      clearInterval(id);
      window.removeEventListener("resize", resize);
    };
  }, [draw]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
};

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 1600),
      setTimeout(() => setExiting(true), 2400),
      setTimeout(onComplete, 3000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Matrix rain */}
          <MatrixRain />

          {/* Grid pattern background */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }} />

          {/* Radial glow */}
          <div className="absolute inset-0" style={{
            background: `radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.08) 0%, transparent 60%)`,
          }} />

          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo */}
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xl font-bold tracking-tight text-foreground"
            >
              <span className="text-primary">T</span>enazity
            </motion.p>

            {/* Phase words */}
            <div className="flex gap-4 text-4xl md:text-6xl font-bold tracking-tight">
              {phases.map((p, i) => (
                <motion.span
                  key={p.word}
                  initial={{ opacity: 0, y: 20 }}
                  animate={phase >= i ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={phase >= i ? "text-primary glow-text" : "text-muted-foreground/20"}
                >
                  {p.word}
                </motion.span>
              ))}
            </div>

            {/* Progress bar */}
            <div className="w-64 h-[2px] bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary glow-box"
                initial={{ width: "0%" }}
                animate={{ width: `${phases[phase].progress}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.3 }}
              className="text-xs font-mono text-muted-foreground tracking-widest uppercase"
            >
              Growth Operating System
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
