import { useState } from "react";
import { motion } from "framer-motion";
import { PenTool, Code2, Cloud, ArrowUpRight, Check } from "lucide-react";
import { useMagneticHover } from "@/hooks/useMagneticHover";
import ScrollRevealText from "@/components/ui/ScrollRevealText";

const pillars = [
  {
    icon: PenTool,
    title: "UI/UX & Prototyping",
    tags: ["Figma", "User Research", "Interactive Prototypes", "Design Systems"],
    description:
      "We design bespoke, intuitive interfaces that captivate users and establish credibility, visualizing the entire product before a single line of code is written.",
    highlights: ["Pixel-perfect design systems", "High-fidelity clickable Figma", "Conversion-focused flows"],
  },
  {
    icon: Code2,
    title: "Full-Stack Engineering",
    tags: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS"],
    description:
      "We engineer lightning-fast, reactive web applications and SaaS platforms with clean component hierarchies, robust state management, and 60fps animations.",
    highlights: ["Sub-second page load speeds", "Type-safe robust architecture", "Mobile & SEO optimized"],
  },
  {
    icon: Cloud,
    title: "Cloud & Scalability",
    tags: ["AWS", "PostgreSQL", "Serverless APIs", "Docker", "DevOps"],
    description:
      "We architect secure, scalable backend backbones. From custom REST & GraphQL APIs to managed database clusters that handle traffic spikes with zero sweat.",
    highlights: ["Auto-scaling cloud infrastructure", "Secure auth & payments", "99.9% uptime architecture"],
  },
];

function MagneticIcon({ icon: Icon }: { icon: typeof PenTool }) {
  const { x, y, onMouseMove, onMouseLeave } = useMagneticHover(0.35, 14, 200);

  return (
    <motion.div
      style={{ x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="w-14 h-14 rounded-2xl bg-secondary/80 border border-border/80 flex items-center justify-center group-hover:bg-primary/15 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_hsl(15_90%_55%/0.2)] transition-all duration-300 cursor-pointer"
    >
      <Icon className="text-muted-foreground group-hover:text-primary transition-colors duration-300" size={26} />
    </motion.div>
  );
}

const PillarsSection = () => {
  return (
    <section id="services" className="py-24 lg:py-32 relative overflow-hidden bg-background">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 w-full">
        {/* Section header */}
        <div className="mb-16 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-12 bg-primary rounded-full" />
            <p className="text-primary text-xs font-semibold tracking-widest uppercase">
              Core Capabilities
            </p>
          </div>
          <ScrollRevealText
            text="Built for scale, designed for impact."
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6"
            highlightWords={["scale,", "impact."]}
            highlightClass="text-gradient-accent"
          />
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
            We handle the full product lifecycle. By combining world-class UI/UX design,
            elite engineering, and battle-tested cloud backends, we turn complex challenges into effortless digital experiences.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((p, index) => (
            <PillarCard key={p.title} pillar={p} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

function PillarCard({
  pillar,
  index,
}: {
  pillar: typeof pillars[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative glass-card glow-border-wrapper rounded-2xl p-8 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 border border-border/60 bg-card/40 backdrop-blur-xl"
    >
      {/* Subtle glow behind card on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <MagneticIcon icon={pillar.icon} />
          <div className="w-9 h-9 rounded-full border border-border/60 bg-background/50 flex items-center justify-center opacity-70 group-hover:opacity-100 group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-300">
            <ArrowUpRight className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" size={18} />
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-foreground transition-colors">
          {pillar.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-light">
          {pillar.description}
        </p>

        {/* Feature bullet highlights */}
        <div className="space-y-2 mb-8 pt-4 border-t border-border/40">
          {pillar.highlights.map((highlight, hi) => (
            <div key={hi} className="flex items-center gap-2 text-xs text-muted-foreground/90">
              <Check size={14} className="text-primary shrink-0" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex gap-1.5 flex-wrap pt-4 border-t border-border/30">
        {pillar.tags.map((t) => (
          <span
            key={t}
            className="text-[10px] font-medium tracking-wide text-muted-foreground/80 uppercase bg-secondary/50 border border-border/40 rounded-md px-2.5 py-1 group-hover:border-primary/20 transition-colors"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default PillarsSection;
