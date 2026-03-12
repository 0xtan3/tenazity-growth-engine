import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center opacity-40"
      style={{ backgroundImage: `url(${heroBg})` }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />

    <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="text-primary font-mono text-sm tracking-widest uppercase mb-6">
          Growth Operating System
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6">
          Build. <span className="text-primary glow-text">Scale.</span> Secure.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          The Growth Operating System for modern businesses. We integrate AI-driven marketing,
          high-performance development, and elite cybersecurity into one seamless engine.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
