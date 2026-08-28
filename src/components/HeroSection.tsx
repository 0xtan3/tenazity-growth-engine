import { useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2, Clock, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMagneticHover } from "@/hooks/useMagneticHover";
import ScrollRevealText from "@/components/ui/ScrollRevealText";
import NeonSparks from "@/components/ui/NeonSparks";

function MagneticButton({ children, href, className = "" }: { children: React.ReactNode; href: string; className?: string }) {
  const { x, y, onMouseMove, onMouseLeave } = useMagneticHover(0.25, 20, 180);

  return (
    <motion.a
      href={href}
      style={{ x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.a>
  );
}

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const mouseX = useSpring(0.5, { stiffness: 120, damping: 20 });
  const mouseY = useSpring(0.5, { stiffness: 120, damping: 20 });

  // Parallax transforms for dot grid & gradient mesh (mouse follow)
  const dotX = useTransform(mouseX, [0, 1], [-12, 12]);
  const dotY = useTransform(mouseY, [0, 1], [-12, 12]);
  const meshX = useTransform(mouseX, [0, 1], [-20, 20]);
  const meshY = useTransform(mouseY, [0, 1], [-20, 20]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[95vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20 border-b border-border/40"
    >
      <NeonSparks />

      {/* Animated Gradient mesh background */}
      <motion.div
        style={{
          x: meshX,
          y: meshY,
          willChange: "transform",
        }}
        className="absolute inset-0 gradient-mesh pointer-events-none opacity-80"
      />

      {/* Interactive Dot Grid layer */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          willChange: "transform",
        }}
        className="absolute inset-[-40px] dot-grid opacity-30 pointer-events-none"
      />

      {/* Soft radial glow — steel blue */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(63, 114, 175, 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        {/* Studio Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/60 border border-border/70 text-xs font-mono text-muted-foreground shadow-sm backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span>Small Team. Big Impact.</span>
          <span className="text-border">·</span>
          <span className="text-foreground font-semibold">Tenazity</span>
        </motion.div>

        {/* Headline */}
        <div className="mb-6">
          <h1 className="sr-only">
            Tenazity builds digital products people love using — web apps, SaaS MVPs, and growth tools with care.
          </h1>
          <ScrollRevealText
            text="We build products people actually love using."
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.06] justify-center"
            highlightWords={["products", "love"]}
            highlightClass="text-gradient-accent drop-shadow-sm"
          />
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          We're a small, senior team that designs and engineers web apps, SaaS products, and growth tools — with the kind of care you'd give your own startup.
        </motion.p>

        {/* CTA Button Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <MagneticButton href="#contact">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base px-8 h-14 rounded-full glow-pink shine-sweep transition-all duration-300 hover:scale-105 shadow-xl cursor-pointer"
            >
              Start a Project <ArrowRight className="ml-2" size={18} />
            </Button>
          </MagneticButton>

          <MagneticButton href="#work">
            <Button
              size="lg"
              variant="outline"
              className="border-border/80 glass-card backdrop-blur-md text-foreground hover:bg-secondary/80 font-bold text-base px-8 h-14 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer flex items-center gap-2 shadow-lg"
            >
              <Sparkles size={16} className="text-accent" />
              See Our Work
            </Button>
          </MagneticButton>
        </motion.div>

        {/* Clean Callout Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-6 py-4 rounded-full glass-card border border-border/70 backdrop-blur-xl shadow-lg text-xs sm:text-sm font-semibold glow-border-wrapper hover:shadow-cyan/10"
        >
          <div className="flex items-center gap-2 text-foreground">
            <Flame size={16} className="text-accent" />
            <span>Currently taking on 2 new projects</span>
          </div>
          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-border" />
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock size={16} className="text-primary" />
            <span>2-3 week delivery</span>
          </div>
          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-border" />
          <div className="flex items-center gap-2 text-emerald-500">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <span>100% custom code</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default HeroSection;
