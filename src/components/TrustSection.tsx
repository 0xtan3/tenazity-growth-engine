import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const techStack = ["Go", "Python", "Next.js", "FastAPI", "ClickHouse", "React", "Tailwind", "Docker"];

const scanLines = [
  { delay: 0, text: "$ tenazity-scan --target *.tenazity.dev --mode deep", type: "cmd" },
  { delay: 600, text: "[INFO]  Initializing EASM engine v3.2.1...", type: "info" },
  { delay: 1200, text: "[INFO]  Enumerating subdomains............. 47 found", type: "info" },
  { delay: 1900, text: "[INFO]  Port scanning 47 hosts (TCP/UDP).. done", type: "info" },
  { delay: 2500, text: "[SCAN]  Running CVE database match......... 142,891 signatures", type: "scan" },
  { delay: 3200, text: "[SCAN]  TLS certificate audit.............. ✓ all valid", type: "pass" },
  { delay: 3800, text: "[SCAN]  Header security analysis........... ✓ HSTS, CSP, X-Frame", type: "pass" },
  { delay: 4300, text: "[SCAN]  SQL injection vectors.............. 0 found", type: "pass" },
  { delay: 4800, text: "[SCAN]  XSS attack surface................. 0 found", type: "pass" },
  { delay: 5300, text: "[SCAN]  Authentication bypass attempts..... 0 found", type: "pass" },
  { delay: 5800, text: "[WARN]  Outdated dependency: lodash@4.17.20 → 4.17.21", type: "warn" },
  { delay: 6400, text: "[SCAN]  API endpoint fuzzing............... 238 tested, 0 vulnerable", type: "pass" },
  { delay: 7000, text: "[INFO]  Generating compliance report....... OWASP Top 10", type: "info" },
  { delay: 7600, text: "", type: "blank" },
  { delay: 7800, text: "  ╔══════════════════════════════════════════╗", type: "result" },
  { delay: 8000, text: "  ║  SCAN COMPLETE — SECURITY SCORE: 97/100  ║", type: "result" },
  { delay: 8200, text: "  ║  Status: HARDENED  |  Threats: 0 CRITICAL ║", type: "result" },
  { delay: 8400, text: "  ╚══════════════════════════════════════════╝", type: "result" },
];

const TerminalWindow = () => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [started, setStarted] = useState(false);
  const termRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const timers = scanLines.map((line, i) =>
      setTimeout(() => {
        setVisibleLines(i + 1);
        if (termRef.current) {
          termRef.current.scrollTop = termRef.current.scrollHeight;
        }
      }, line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [started]);

  const getLineColor = (type: string) => {
    switch (type) {
      case "cmd": return "text-primary";
      case "pass": return "text-emerald-400";
      case "warn": return "text-amber-400";
      case "result": return "text-primary font-bold";
      case "scan": return "text-foreground/80";
      case "info": return "text-muted-foreground";
      default: return "";
    }
  };

  return (
    <div ref={containerRef} className="w-full max-w-2xl mx-auto">
      <div className="rounded-lg border border-border overflow-hidden bg-background/80 backdrop-blur-sm">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-secondary/50 border-b border-border">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
          </div>
          <span className="text-[10px] font-mono text-muted-foreground ml-2">tenazity-scan — security audit</span>
        </div>
        {/* Terminal body */}
        <div ref={termRef} className="p-4 h-72 overflow-y-auto font-mono text-xs leading-relaxed">
          {scanLines.slice(0, visibleLines).map((line, i) => (
            <div key={i} className={`${getLineColor(line.type)} ${i === visibleLines - 1 ? "animate-fade-in" : ""}`}>
              {line.text || "\u00A0"}
            </div>
          ))}
          {started && visibleLines < scanLines.length && (
            <span className="inline-block w-1.5 h-3.5 bg-primary animate-pulse ml-0.5" />
          )}
        </div>
      </div>
    </div>
  );
};

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const fontSize = 14;
    let columns: number;
    let drops: number[];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1).map(() => Math.random() * -50);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.fillStyle = "rgba(8, 10, 15, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "hsl(174 100% 50% / 0.12)";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < columns; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i] += 0.4;
      }
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

const TrustSection = () => (
  <section className="relative py-24 lg:py-32 overflow-hidden">
    {/* Matrix rain */}
    <MatrixRain />
    {/* Grid overlay */}
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.04]"
      style={{
        backgroundImage:
          "linear-gradient(hsl(174 100% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(174 100% 50%) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />
    {/* CRT Scan lines */}
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.03]"
      style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(174 100% 50%) 2px, hsl(174 100% 50%) 4px)",
      }}
    />
    {/* Vignette */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: "radial-gradient(ellipse at center, transparent 0%, transparent 50%, hsl(220 20% 4% / 0.4) 100%)",
      }}
    />
    <div className="relative z-10 container mx-auto px-4">
      {/* Security Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center mb-10"
      >
        <ShieldCheck className="mx-auto text-primary mb-4" size={40} />
        <h3 className="text-2xl md:text-3xl font-bold mb-3">Security-First Engineering</h3>
        <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Every line of code we write is audited for vulnerabilities. We don't just build; we protect.
        </p>
      </motion.div>

      {/* Terminal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-20"
      >
        <TerminalWindow />
      </motion.div>

      {/* Tech Stack Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-center text-xs font-mono text-muted-foreground uppercase tracking-widest mb-8">
          Our Tech Stack
        </p>
        <div className="overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
          <div className="flex marquee">
            {[...techStack, ...techStack].map((tech, i) => (
              <div key={`${tech}-${i}`} className="flex-shrink-0 mx-8 flex items-center justify-center">
                <span className="text-lg font-mono text-muted-foreground/60 whitespace-nowrap">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default TrustSection;
