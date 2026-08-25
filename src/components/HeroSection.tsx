import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmberParticles from "@/components/ui/EmberParticles";
import { useMagneticHover } from "@/hooks/useMagneticHover";
import ScrollRevealText from "@/components/ui/ScrollRevealText";

function MagneticButton({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) {
  const { x, y, onMouseMove, onMouseLeave } = useMagneticHover(0.25, 20, 180);
  
  return (
    <motion.a
      href={href}
      style={{ x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="inline-block"
    >
      {children}
    </motion.a>
  );
}

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const mouseX = useSpring(0.5, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0.5, { stiffness: 50, damping: 20 });

  // Scroll progress through the pinned section (0 → 1)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Phase 1 (0→0.3): Gradient mesh scales up from center
  const meshScale = useTransform(smoothProgress, [0, 0.3], [1.15, 1]);
  const meshOpacity = useTransform(smoothProgress, [0, 0.15], [0.4, 0.7]);

  // Phase 2 (0.3→0.6): Subtitle + CTA fade in
  const contentOpacity = useTransform(smoothProgress, [0.2, 0.4], [0, 1]);
  const contentY = useTransform(smoothProgress, [0.2, 0.4], [30, 0]);

  // Phase 3 (0.6→1.0): Pull-away — scale down + fade out
  const heroScale = useTransform(smoothProgress, [0.6, 1], [1, 0.92]);
  const heroOpacity = useTransform(smoothProgress, [0.65, 1], [1, 0]);
  const heroBrightness = useTransform(smoothProgress, [0.7, 1], [1, 0.7]);

  // Dot grid parallax (accelerates on exit)
  const dotGridY = useTransform(smoothProgress, [0.5, 1], [0, -120]);
  const dotGridOpacity = useTransform(smoothProgress, [0.6, 0.9], [0.15, 0]);

  // Badge entrance
  const badgeScale = useTransform(smoothProgress, [0, 0.1], [0.85, 1]);
  const badgeOpacity = useTransform(smoothProgress, [0, 0.1], [0, 1]);

  // Parallax transforms for dot grid (mouse)
  const dotX = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { stiffness: 50, damping: 20 });
  const dotY = useSpring(useTransform(mouseY, [0, 1], [-8, 8]), { stiffness: 50, damping: 20 });

  // Gradient mesh parallax (mouse — slower, deeper layer)
  const meshX = useSpring(useTransform(mouseX, [0, 1], [-15, 15]), { stiffness: 30, damping: 25 });
  const meshY = useSpring(useTransform(mouseY, [0, 1], [-15, 15]), { stiffness: 30, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section ref={sectionRef} className="pinned-section" style={{ height: "250vh" }}>
      <div
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="pinned-content"
      >
        <motion.div
          style={{
            scale: heroScale,
            opacity: heroOpacity,
            filter: useTransform(heroBrightness, (v) => `brightness(${v})`),
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Animated Gradient mesh background — parallax layer */}
          <motion.div
            style={{
              x: meshX,
              y: meshY,
              scale: meshScale,
              opacity: meshOpacity,
            }}
            className="absolute inset-0 gradient-mesh"
          />

          {/* Dot grid — parallax layer */}
          <motion.div
            style={{
              x: dotX,
              y: useTransform(
                [dotY, dotGridY] as any,
                ([dY, gY]: number[]) => dY + gY
              ),
              opacity: dotGridOpacity,
            }}
            className="absolute inset-[-20px] dot-grid"
          />

          {/* Ember particles — rising from the ashes */}
          <EmberParticles />

          {/* Subtle radial gradient from center */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, hsl(15 90% 55% / 0.06) 0%, transparent 60%)",
            }}
          />

          <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl pt-16">
            {/* Badge */}
            <motion.div
              style={{ scale: badgeScale, opacity: badgeOpacity }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-primary/80 tracking-widest uppercase bg-primary/5 border border-primary/10 rounded-full px-4 py-1.5 shadow-sm backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Premium Digital Studio
              </span>
            </motion.div>

            {/* Scroll-reveal headline */}
            <div className="mb-8 overflow-hidden py-2">
              {/* Semantic H1 for SEO and Screen Readers */}
              <h1 className="sr-only">
                Tenazity is a premium freelance digital studio. We design and build custom digital products, SaaS MVPs, and growth engines that work.
              </h1>

              {/* Visual-only animated text for users */}
              <ScrollRevealText
                text="We design & build digital products that work."
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-bold tracking-tight leading-[1.05]"
                highlightWords={["digital"]}
                highlightClass="text-gradient-accent"
                scrollRange={[0, 0.35]}
              />
            </div>

            {/* Subtitle + CTA — fade in with scroll */}
            <motion.div style={{ opacity: contentOpacity, y: contentY }}>
              <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed font-light">
                Tenazity is a digital studio that turns ideas into high-performance
                websites, web apps, and growth engines — from first pixel to first
                million users.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <MagneticButton href="#work">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-border/60 text-foreground hover:bg-secondary font-medium text-sm px-8 h-12 rounded-full transition-all duration-300 hover:scale-105"
                  >
                    See Our Work
                  </Button>
                </MagneticButton>
                <MagneticButton href="#contact">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm px-8 h-12 rounded-full glow-subtle shine-sweep transition-all duration-300 hover:scale-105"
                  >
                    Start a Project <ArrowRight className="ml-2" size={16} />
                  </Button>
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-20" />
      </div>
    </section>
  );
};

export default HeroSection;
