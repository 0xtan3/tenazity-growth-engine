import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Palette, Terminal, Search, PenTool, Code, Rocket, Check, ArrowRight } from "lucide-react";
import ScrollRevealText from "@/components/ui/ScrollRevealText";
import SubtleAurora from "@/components/ui/SubtleAurora";

const processSteps = [
  {
    step: "01",
    phase: "WEEK 1",
    title: "Discovery & Architecture",
    description:
      "We start by understanding your users, your goals, and what you actually need. We map out the technical plan so there are no surprises down the line.",
    deliverables: [
      "Competitive audit & tech spec",
      "Data schema & API design",
      "Clear milestone timeline",
    ],
    icon: Search,
    color: "from-primary/20 to-primary/5 border-primary/20",
    iconColor: "text-primary",
  },
  {
    step: "02",
    phase: "WEEKS 1-2",
    title: "Interactive Prototyping",
    description:
      "You'll get a clickable Figma prototype of the entire product before we write any code. Real flows, real interactions — not wireframe rectangles.",
    deliverables: [
      "High-fidelity Figma prototypes",
      "Design system & components",
      "Usability feedback loops",
    ],
    icon: PenTool,
    color: "from-accent/20 to-accent/5 border-accent/20",
    iconColor: "text-accent",
  },
  {
    step: "03",
    phase: "WEEKS 2-4",
    title: "Full-Stack Development",
    description:
      "We build with React, Next.js, and TypeScript. You get staging demos every 2 days so you're never left wondering what's happening.",
    deliverables: [
      "Clean, type-safe code",
      "Responsive on all devices",
      "Automated tests & CI/CD",
    ],
    icon: Code,
    color: "from-sky-500/20 to-sky-500/5 border-sky-500/20",
    iconColor: "text-sky-500",
  },
  {
    step: "04",
    phase: "WEEK 4+",
    title: "Launch & Growth",
    description:
      "We deploy to production, set up monitoring, and optimize for SEO. And we stick around after launch to make sure everything runs smoothly.",
    deliverables: [
      "Zero-downtime deployment",
      "Analytics & SEO setup",
      "Ongoing support & scaling",
    ],
    icon: Rocket,
    color: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20",
    iconColor: "text-emerald-500",
  },
];

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="py-24 lg:py-32 bg-secondary/10 relative overflow-hidden border-t border-border/40">
      <SubtleAurora />
      
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 w-full">
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-[2px] w-12 bg-primary rounded-full" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              How We Work
            </span>
          </div>
          <ScrollRevealText
            text="No surprises, no radio silence."
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4"
            highlightWords={["surprises,", "radio", "silence."]}
            highlightClass="text-gradient-accent"
          />
          <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
            We run a transparent, 4-step process that takes your product from idea to production in weeks. You'll always know where things stand.
          </p>
        </div>

        {/* Interactive Step Grid */}
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
                className={`cursor-pointer rounded-3xl p-6 sm:p-8 transition-all duration-300 relative border glass-card glow-border-wrapper ${
                  isActive
                    ? "border-primary/50 shadow-xl shadow-primary/10 -translate-y-1.5 bg-white/5"
                    : "border-border/50 hover:border-border hover:bg-white/5"
                }`}
              >
                {/* Active Indicator Top Bar */}
                {isActive && (
                  <div className="absolute top-0 left-8 right-8 h-[3px] bg-gradient-to-r from-primary via-accent to-[#A3E635] rounded-full" />
                )}

                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                        : "bg-secondary/60 text-muted-foreground"
                    }`}
                  >
                    <Icon size={22} />
                  </div>
                  <span
                    className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${
                      isActive
                        ? "bg-primary/20 text-primary border-primary/30"
                        : "glass-card text-muted-foreground/60 border-border/30"
                    }`}
                  >
                    {item.step}
                  </span>
                </div>

                <div className="text-xs text-primary font-medium tracking-wide uppercase mb-1">
                  {item.phase}
                </div>
                <h3 className="text-xl font-bold mb-3 tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light mb-4">
                  {item.description}
                </p>

                {/* Micro checklist */}
                <div className="space-y-1.5 pt-3 border-t border-border/40">
                  {item.deliverables.map((detail, di) => (
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
          className="rounded-3xl p-6 sm:p-8 glass-card border border-border/60 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <h4 className="text-lg sm:text-xl font-bold mb-1">Got a project in mind?</h4>
            <p className="text-sm text-muted-foreground font-light">
              We'll send you a clear scope and estimate within 24 hours. No strings attached.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-full text-sm hover:bg-primary/90 transition-all hover:scale-105 shadow-md shadow-primary/20 shrink-0 cursor-pointer glow-pink"
          >
            Start Your Sprint <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
