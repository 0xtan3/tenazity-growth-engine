import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, PenTool, Code, Rocket, Check, ArrowRight } from "lucide-react";
import ScrollRevealText from "@/components/ui/ScrollRevealText";

const processSteps = [
  {
    step: "01",
    title: "Discovery & Architecture",
    tagline: "Weeks 1",
    description:
      "We dive deep into your target audience, business goals, and technical requirements. We map out data models, user flows, and tech stacks to build a bulletproof roadmap.",
    details: ["Competitive audit & tech spec", "Data schema & API architecture", "Milestone timeline & scoping"],
    icon: Search,
  },
  {
    step: "02",
    title: "Interactive Prototyping",
    tagline: "Weeks 1-2",
    description:
      "We craft high-fidelity Figma prototypes with real user flows, micro-interactions, and conversion psychology. You experience the complete app before development begins.",
    details: ["High-fidelity Figma prototypes", "Design system & component library", "Interactive usability feedback"],
    icon: PenTool,
  },
  {
    step: "03",
    title: "Full-Stack Development",
    tagline: "Weeks 2-4",
    description:
      "We build your product using modern, battle-tested frameworks (React, Next.js, TypeScript). Fast 2-day sprint demos keep you in the loop every step of the way.",
    details: ["Clean, type-safe codebases", "Responsive across all viewports", "Automated tests & CI/CD pipeline"],
    icon: Code,
  },
  {
    step: "04",
    title: "Launch & Growth Engine",
    tagline: "Week 4+",
    description:
      "We deploy to global CDNs, configure production monitoring, and optimize technical SEO. We stay with you post-launch to ensure high performance and zero downtime.",
    details: ["Zero-downtime deployment", "Analytics & SEO configuration", "Ongoing maintenance & feature scaling"],
    icon: Rocket,
  },
];

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="py-24 lg:py-32 bg-secondary/15 relative overflow-hidden border-t border-border/40">
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 w-full">
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-[2px] w-12 bg-primary rounded-full" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Our 4-Step Framework
            </span>
          </div>
          <ScrollRevealText
            text="A proven process for predictable excellence."
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4"
            highlightWords={["predictable", "excellence."]}
            highlightClass="text-gradient-accent"
          />
          <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
            No guesswork. No radio silence. We run an agile, transparent execution model that takes your product from concept to production in weeks, not months.
          </p>
        </div>

        {/* Desktop & Tablet: Interactive Step Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative mb-12">
          {processSteps.map((item, index) => {
            const isActive = activeStep === index;
            const Icon = item.icon;

            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                onClick={() => setActiveStep(index)}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 relative border ${
                  isActive
                    ? "bg-card/90 border-primary/50 shadow-xl shadow-primary/10 -translate-y-1.5"
                    : "bg-card/40 border-border/50 hover:border-border hover:bg-card/60"
                }`}
              >
                {/* Active Indicator Top Bar */}
                {isActive && (
                  <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-primary to-amber-400 rounded-full" />
                )}

                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    <Icon size={22} />
                  </div>
                  <span
                    className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${
                      isActive
                        ? "bg-primary/15 text-primary border-primary/30"
                        : "bg-secondary/60 text-muted-foreground/60 border-border/30"
                    }`}
                  >
                    {item.step}
                  </span>
                </div>

                <div className="text-xs text-primary font-medium tracking-wide uppercase mb-1">
                  {item.tagline}
                </div>
                <h3 className="text-xl font-bold mb-3 tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light mb-4">
                  {item.description}
                </p>

                {/* Micro checklist */}
                <div className="space-y-1.5 pt-3 border-t border-border/40">
                  {item.details.map((detail, di) => (
                    <div key={di} className="flex items-center gap-1.5 text-[11px] text-muted-foreground/80">
                      <Check size={12} className={isActive ? "text-primary shrink-0" : "text-muted-foreground/40 shrink-0"} />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA banner under process */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-card/80 via-card/50 to-primary/10 border border-border/60 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <h4 className="text-lg sm:text-xl font-bold mb-1">Ready to launch your product?</h4>
            <p className="text-sm text-muted-foreground font-light">
              We provide fixed-scope estimates within 24 hours. Zero obligations.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl text-sm hover:bg-primary/90 transition-all hover:scale-105 shadow-md shadow-primary/20 shrink-0 cursor-pointer"
          >
            Start Your Sprint <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
