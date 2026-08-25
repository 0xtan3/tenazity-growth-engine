import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Zap, Palette, Terminal, Server, ArrowRight } from "lucide-react";
import ScrollRevealText from "@/components/ui/ScrollRevealText";

const values = [
  {
    icon: Zap,
    title: "Performance & SEO First",
    description:
      "Every custom web app is optimized for speed and technical SEO. Fast load times, smooth interactions, and clean React code that scales effortlessly.",
  },
  {
    icon: Palette,
    title: "Premium UI/UX Design",
    description:
      "We don't just make things look good — we design bespoke interfaces that guide users, build trust, and drive conversions for your freelance or agency business.",
  },
  {
    icon: Server,
    title: "Scalable Architecture",
    description:
      "We build backend systems designed to grow with you. From database design to serverless APIs, our architecture handles high traffic with ease.",
  },
  {
    icon: Terminal,
    title: "Modern Tech Stack",
    description:
      "React, Next.js, TypeScript, Go, Python, Node — our web developers use battle-tested tools and stay current with industry standards.",
  },
];

const techStack = [
  "React",
  "TypeScript",
  "Next.js",
  "Tailwind CSS",
  "Go",
  "Python",
  "FastAPI",
  "Docker",
  "PostgreSQL",
  "Framer Motion",
];

const TrustSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
  });

  // Scroll-speed-linked tech marquee
  const marqueeOffset = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -150]),
    { stiffness: 60, damping: 30 }
  );

  // Value items — each gets a scroll-linked entrance
  const itemRanges = [
    [0.1, 0.3],
    [0.2, 0.4],
    [0.3, 0.5],
    [0.4, 0.6],
  ];

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-secondary/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-[0.02] mix-blend-overlay pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* Left Column - Sticky Header */}
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <div>
                <motion.p
                  style={{
                    opacity: useTransform(smoothProgress, [0.05, 0.15], [0, 1]),
                    x: useTransform(smoothProgress, [0.05, 0.15], [-20, 0]),
                  }}
                  className="text-primary text-xs font-semibold tracking-widest uppercase mb-4"
                >
                  Our Approach
                </motion.p>
                <ScrollRevealText
                  text="Why work with us."
                  className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
                  scrollRange={[0, 0.5]}
                />
                <motion.p
                  style={{
                    opacity: useTransform(smoothProgress, [0.1, 0.25], [0, 1]),
                    y: useTransform(smoothProgress, [0.1, 0.25], [15, 0]),
                  }}
                  className="text-muted-foreground text-base font-light leading-relaxed mb-8"
                >
                  We treat every project as if it were our own startup. No cutting corners, no generic templates. Just premium engineering and thoughtful design.
                </motion.p>
                <motion.a
                  href="#contact"
                  style={{
                    opacity: useTransform(smoothProgress, [0.15, 0.3], [0, 1]),
                  }}
                  className="inline-flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors group"
                >
                  Start a conversation
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </div>
            </div>
          </div>

          {/* Right Column - Scroll-animated List */}
          <div className="lg:w-2/3">
            <div className="flex flex-col">
              {values.map((v, index) => (
                <ValueItem
                  key={v.title}
                  value={v}
                  index={index}
                  progress={smoothProgress}
                  range={itemRanges[index] as [number, number]}
                  hoveredIndex={hoveredIndex}
                  setHoveredIndex={setHoveredIndex}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack Marquee (Bottom) */}
        <motion.div
          style={{
            opacity: useTransform(smoothProgress, [0.5, 0.65], [0, 1]),
            y: useTransform(smoothProgress, [0.5, 0.65], [30, 0]),
          }}
          className="mt-32 border-t border-border/40 pt-16"
        >
          <p className="text-center text-[10px] font-semibold text-muted-foreground/40 uppercase tracking-widest mb-10">
            Powered by modern technologies
          </p>

          <div className="overflow-hidden relative max-w-5xl mx-auto">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-10" />
            <motion.div
              style={{ x: marqueeOffset }}
              className="flex marquee opacity-60 hover:opacity-100 transition-opacity duration-500"
            >
              {[...techStack, ...techStack].map((tech, i) => (
                <div
                  key={`${tech}-${i}`}
                  className="flex-shrink-0 mx-8 flex items-center justify-center"
                >
                  <span className="text-lg font-bold text-muted-foreground/30 whitespace-nowrap tracking-tight">
                    {tech}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

function ValueItem({
  value,
  index,
  progress,
  range,
  hoveredIndex,
  setHoveredIndex,
}: {
  value: typeof values[0];
  index: number;
  progress: any;
  range: [number, number];
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
}) {
  // Scroll-linked entrance from the right with rotation
  const x = useTransform(progress, [range[0], range[1]], [40, 0]);
  const opacity = useTransform(progress, [range[0], range[1]], [0, 1]);
  const rotate = useTransform(progress, [range[0], range[1]], [2, 0]);

  // Gradient underline draw — scroll-linked
  const underlineScale = useTransform(progress, [range[0] + 0.05, range[1]], [0, 1]);

  return (
    <motion.div
      style={{
        x,
        opacity,
        rotate,
      }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      className={`group relative p-8 border-b border-border/40 transition-all duration-500 cursor-default ${
        hoveredIndex !== null && hoveredIndex !== index ? 'opacity-40' : 'opacity-100'
      }`}
    >
      {/* Gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none -z-10" />

      {/* Scroll-linked underline */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-primary/0"
        style={{ scaleX: underlineScale, originX: 0 }}
      />

      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 sm:items-center">
        <motion.div
          className="w-12 h-12 rounded-2xl bg-card border border-border/50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-500"
          whileHover={{ scale: 1.15, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <value.icon className="text-muted-foreground group-hover:text-primary transition-colors duration-500" size={20} />
        </motion.div>
        <div>
          <h3 className="text-xl font-bold mb-2 tracking-tight">{value.title}</h3>
          <p className="text-muted-foreground text-sm font-light leading-relaxed max-w-xl">
            {value.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default TrustSection;
