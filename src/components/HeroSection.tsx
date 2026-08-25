import { useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2, Clock, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmberParticles from "@/components/ui/EmberParticles";
import { useMagneticHover } from "@/hooks/useMagneticHover";
import ScrollRevealText from "@/components/ui/ScrollRevealText";

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
      {/* Animated Gradient mesh background — Notion palette */}
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

      {/* Floating Ember Particles */}
      <EmberParticles />

      {/* Radial spotlight center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, hsl(217 91% 60% / 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        {/* Studio Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 border border-border/70 text-xs font-mono text-muted-foreground shadow-sm backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span>Bespoke Digital Studio</span>
          <span className="text-border">·</span>
          <span className="text-foreground font-semibold">Tenazity</span>
        </motion.div>

        {/* Headline */}
        <div className="mb-6">
          <h1 className="sr-only">
            Tenazity is a premium digital studio. We design and build custom digital products, SaaS MVPs, and growth engines that work.
          </h1>
          <ScrollRevealText
            text="We design & build digital products that work."
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.06] justify-center"
            highlightWords={["digital", "products"]}
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
          Tenazity turns ambitious concepts into high-performance web apps, SaaS MVPs, and automated growth engines — designed to convert visitors into loyal clients.
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
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base px-8 h-13 rounded-full glow-subtle shine-sweep transition-all duration-300 hover:scale-105 shadow-xl cursor-pointer"
            >
              Start a Project <ArrowRight className="ml-2" size={18} />
            </Button>
          </MagneticButton>

          <MagneticButton href="#work">
            <Button
              size="lg"
              variant="outline"
              className="border-border/80 bg-card/60 backdrop-blur-md text-foreground hover:bg-secondary/80 font-medium text-base px-8 h-13 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              <Sparkles size={16} className="text-primary" />
              Explore Live Work
            </Button>
          </MagneticButton>
        </motion.div>

        {/* Clean Callout Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-6 py-3.5 rounded-2xl bg-card/60 border border-border/70 backdrop-blur-xl shadow-lg text-xs sm:text-sm"
        >
          <div className="flex items-center gap-2 text-foreground font-medium">
            <Flame size={15} className="text-primary" />
            <span>2 Sprint Slots Open for Q3</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-border" />
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock size={15} className="text-primary" />
            <span>2-3 Week Fast-Track Delivery</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-border" />
          <div className="flex items-center gap-2 text-emerald-400 font-medium">
            <CheckCircle2 size={15} className="text-emerald-400" />
            <span>100% Bespoke Code</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default HeroSection;
