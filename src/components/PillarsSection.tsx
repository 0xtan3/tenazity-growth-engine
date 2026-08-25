import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { PenTool, Code2, Cloud, ArrowUpRight } from "lucide-react";
import { useMagneticHover } from "@/hooks/useMagneticHover";
import ScrollRevealText from "@/components/ui/ScrollRevealText";

const pillars = [
  {
    icon: PenTool,
    title: "UI/UX & Prototyping",
    tags: ["Figma", "User Research", "Wireframing"],
    description:
      "We design beautiful, bespoke interfaces that guide users and build trust, visualizing the final product before a single line of code is written.",
  },
  {
    icon: Code2,
    title: "Full-Stack Development",
    tags: ["React", "Next.js", "TypeScript", "Node.js"],
    description:
      "We build fast, responsive web applications from scratch. Clean architecture, perfect performance, and seamless front-end experiences.",
  },
  {
    icon: Cloud,
    title: "Cloud & Architecture",
    tags: ["AWS", "Serverless", "Databases", "APIs"],
    description:
      "We design and deploy scalable backend systems. From custom REST APIs to secure databases, we ensure your product handles high traffic effortlessly.",
  },
];

function MagneticIcon({ icon: Icon }: { icon: typeof PenTool }) {
  const { x, y, onMouseMove, onMouseLeave } = useMagneticHover(0.4, 12, 200);

  return (
    <motion.div
      style={{ x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="w-12 h-12 rounded-xl bg-secondary border border-border/50 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300 cursor-pointer"
    >
      <Icon className="text-muted-foreground group-hover:text-primary transition-colors duration-300" size={24} />
    </motion.div>
  );
}

const PillarsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Header animations — Phase 1 (0→0.2)
  const headerLineWidth = useTransform(smoothProgress, [0.05, 0.2], [0, 200]);

  // Card animations — Phase 2 (0.2→0.85)
  // Each card gets its own scroll range
  const card1Progress = useTransform(smoothProgress, [0.15, 0.4], [0, 1]);
  const card2Progress = useTransform(smoothProgress, [0.35, 0.6], [0, 1]);
  const card3Progress = useTransform(smoothProgress, [0.55, 0.8], [0, 1]);
  const cardProgresses = [card1Progress, card2Progress, card3Progress];

  // Final settle — Phase 3 (0.85→1.0)
  const settleOpacity = useTransform(smoothProgress, [0.8, 0.95], [0.6, 1]);

  return (
    <section ref={sectionRef} id="services" className="pinned-section" style={{ height: "300vh" }}>
      <div className="pinned-content flex-col py-20">
        <div className="container mx-auto px-4 relative z-10 w-full">
          {/* Section header */}
          <div className="mb-16 max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                style={{ width: headerLineWidth }}
                className="h-[1px] bg-primary"
              />
              <p className="text-primary text-xs font-semibold tracking-widest uppercase">
                What We Do
              </p>
            </div>
            <ScrollRevealText
              text="Built for scale, designed for impact."
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
              scrollRange={[0, 0.5]}
            />
            <motion.p
              style={{
                opacity: useTransform(smoothProgress, [0.1, 0.25], [0, 1]),
                y: useTransform(smoothProgress, [0.1, 0.25], [20, 0]),
              }}
              className="text-xl text-muted-foreground max-w-2xl mt-4"
            >
              We handle the entire product lifecycle. By combining bespoke UI/UX design,
              elite engineering, and robust cloud architectures, we turn complex problems into elegant solutions.
            </motion.p>
          </div>

          {/* Cards grid */}
          <motion.div
            style={{ opacity: settleOpacity }}
            className="grid md:grid-cols-3 gap-6 lg:gap-8"
          >
            {pillars.map((p, index) => (
              <PillarCard
                key={p.title}
                pillar={p}
                progress={cardProgresses[index]}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

function PillarCard({
  pillar,
  progress,
  index,
}: {
  pillar: typeof pillars[0];
  progress: any;
  index: number;
}) {
  const y = useTransform(progress, [0, 1], [80, 0]);
  const opacity = useTransform(progress, [0, 0.6], [0, 1]);
  const scale = useTransform(progress, [0, 1], [0.85, 1]);
  const rotateX = useTransform(progress, [0, 1], [15, 0]);

  // Icon ignition pop
  const iconScale = useTransform(progress, [0.5, 0.7, 0.85], [0.6, 1.2, 1]);
  const iconRotate = useTransform(progress, [0.5, 0.85], [-10, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
        scale,
        rotateX,
        transformPerspective: 800,
      }}
      className="group relative glass-card glow-border-wrapper rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5"
    >
      {/* Subtle glow behind card on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <motion.div style={{ scale: iconScale, rotate: iconRotate }}>
            <MagneticIcon icon={pillar.icon} />
          </motion.div>
          <div className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100">
            <ArrowUpRight className="text-primary" size={16} />
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4 tracking-tight">{pillar.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-8 font-light">
          {pillar.description}
        </p>

        <div className="flex gap-2 flex-wrap mt-auto">
          {pillar.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] font-medium tracking-wide text-foreground/60 uppercase bg-background/50 border border-border/40 rounded-full px-3 py-1"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default PillarsSection;
