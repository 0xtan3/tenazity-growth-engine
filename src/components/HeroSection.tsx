import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SplitText } from "@/components/ui/SplitText";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 1.2 } }, // Delayed to let the SplitText finish
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const HeroSection = () => (
  <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
    {/* Animated Gradient mesh background */}
    <motion.div 
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="absolute inset-0 gradient-mesh opacity-70" 
    />
    <div className="absolute inset-0 dot-grid opacity-[0.15]" />

    {/* Subtle radial gradient from center */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(circle at 50% 40%, hsl(245 58% 64% / 0.08) 0%, transparent 60%)",
      }}
    />

    <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl pt-16">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-primary/80 tracking-widest uppercase bg-primary/5 border border-primary/10 rounded-full px-4 py-1.5 shadow-sm backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Premium Digital Studio
        </span>
      </motion.div>

      <div className="mb-8 overflow-hidden py-2">
        {/* Semantic H1 for SEO and Screen Readers */}
        <h1 className="sr-only">
          Tenazity is a premium freelance digital studio. We design and build custom digital products, SaaS MVPs, and growth engines that work.
        </h1>
        
        {/* Visual-only animated text for users */}
        <div aria-hidden="true">
          <SplitText 
            text="We design & build digital products that work."
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-bold tracking-tight leading-[1.05]"
            highlightWord="digital"
            highlightClass="text-gradient-accent"
          />
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={fadeUp}
          className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed font-light"
        >
          Tenazity is a digital studio that turns ideas into high-performance
          websites, web apps, and growth engines — from first pixel to first
          million users.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#work">
            <Button
              size="lg"
              variant="outline"
              className="border-border/60 text-foreground hover:bg-secondary font-medium text-sm px-8 h-12 rounded-full transition-all duration-300 hover:scale-105"
            >
              See Our Work
            </Button>
          </a>
          <a href="#contact">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm px-8 h-12 rounded-full glow-subtle transition-all duration-300 hover:scale-105"
            >
              Start a Project <ArrowRight className="ml-2" size={16} />
            </Button>
          </a>
        </motion.div>
      </motion.div>
    </div>

    {/* Bottom fade */}
    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
  </section>
);

export default HeroSection;
