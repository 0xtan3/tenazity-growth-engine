import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <motion.div
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.4 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />

    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative z-10 container mx-auto px-4 text-center max-w-4xl"
    >
      <motion.p variants={fadeUp} className="text-primary font-mono text-sm tracking-widest uppercase mb-6">
        Growth Operating System
      </motion.p>
      <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6">
        Build. <span className="text-primary glow-text glitch-text" data-text="Scale.">Scale.</span> Secure.
      </motion.h1>
      <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
        The Growth Operating System for modern businesses. We integrate AI-driven marketing,
        high-performance development, and elite cybersecurity into one seamless engine.
      </motion.p>
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="#contact">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-box font-semibold text-base px-8">
            Get a Growth Audit <ArrowRight className="ml-2" size={18} />
          </Button>
        </a>
        <a href="#services">
          <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary font-semibold text-base px-8">
            Explore Services
          </Button>
        </a>
      </motion.div>
    </motion.div>
  </section>
);

export default HeroSection;
