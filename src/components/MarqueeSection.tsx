import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Workflow, Laptop, Smartphone, LineChart, Code2, Shield, Database, Cpu } from "lucide-react";

const capabilities = [
  { name: "Fintech Platforms", icon: LineChart },
  { name: "SaaS MVPs", icon: Laptop },
  { name: "E-Commerce", icon: Smartphone },
  { name: "Enterprise Security", icon: Shield },
  { name: "Custom API & Backends", icon: Database },
  { name: "AI Integrations", icon: Cpu },
  { name: "Web3 Interfaces", icon: Code2 },
  { name: "B2B Dashboards", icon: Workflow },
];

const MarqueeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Scale entrance: 0.92 → 1.0 as section enters
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.92, 1]);
  const blurAmount = useTransform(scrollYProgress, [0, 0.2], [6, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.3, 1]);

  // Scroll-speed-linked marquee offset — adds extra translation based on scroll velocity
  const scrollSpeedOffset = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -200]),
    { stiffness: 60, damping: 30 }
  );

  return (
    <motion.section
      ref={sectionRef}
      style={{
        scale,
        opacity,
        filter: useTransform(blurAmount, (v) => `blur(${v}px)`),
      }}
      className="py-12 border-y border-border/40 overflow-hidden bg-background relative flex items-center"
    >
      {/* Gradient masks for smooth fading at edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-background to-transparent z-10" />

      {/* Infinite scrolling container with scroll-speed linking */}
      <motion.div
        style={{ x: scrollSpeedOffset }}
        className="flex whitespace-nowrap will-change-transform animate-marquee hover:[animation-play-state:paused]"
      >
        {/* We map the array three times to create an infinite scroll illusion */}
        {[...capabilities, ...capabilities, ...capabilities].map((item, index) => (
          <MarqueeItem key={index} item={item} index={index} totalItems={capabilities.length} />
        ))}
      </motion.div>
    </motion.section>
  );
};

function MarqueeItem({ 
  item, 
  index, 
  totalItems 
}: { 
  item: typeof capabilities[0]; 
  index: number;
  totalItems: number;
}) {
  return (
    <div className="flex items-center gap-2 px-8 group cursor-default">
      <item.icon
        size={18}
        className="text-muted-foreground/40 group-hover:text-primary transition-colors duration-300"
      />
      <span className="text-lg font-medium text-foreground/50 group-hover:text-foreground transition-colors duration-300">
        {item.name}
      </span>
    </div>
  );
}

export default MarqueeSection;
