import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Hammer, Timer, Wrench, ArrowUpRight } from "lucide-react";
import ScrollRevealText from "@/components/ui/ScrollRevealText";

const labs = [
  {
    icon: Hammer,
    name: "Forge",
    description:
      "Our freelance studio OS — project management, time tracking, and invoicing in one clean interface.",
    url: "https://forge.tenazity.com",
    status: "Live",
  },
  {
    icon: Timer,
    name: "Chrono",
    description:
      "A focus timer built for deep work. Clean UI, ambient sounds, and session analytics.",
    url: "https://chrono.tenazity.com",
    status: "Live",
  },
  {
    icon: Wrench,
    name: "More in progress",
    description:
      "We're always building. New tools and experiments are in the pipeline.",
    url: null,
    status: "Coming Soon",
  },
];

const LabsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
  });

  return (
    <section id="labs" ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-secondary/10 pointer-events-none" />

      <div className="relative container mx-auto px-4 z-10">
        <div className="mb-16 max-w-xl">
          <motion.p
            style={{
              opacity: useTransform(smoothProgress, [0.05, 0.15], [0, 1]),
              x: useTransform(smoothProgress, [0.05, 0.15], [-20, 0]),
            }}
            className="text-primary text-xs font-semibold tracking-widest uppercase mb-3"
          >
            Tenazity Labs
          </motion.p>
          <ScrollRevealText
            text="Built by us, for us."
            className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
            scrollRange={[0, 0.4]}
          />
          <motion.p
            style={{
              opacity: useTransform(smoothProgress, [0.1, 0.25], [0, 1]),
              y: useTransform(smoothProgress, [0.1, 0.25], [15, 0]),
            }}
            className="text-muted-foreground max-w-lg text-sm leading-relaxed"
          >
            We practice what we preach. These are internal tools we've built to
            solve our own problems — proof that we ship real products.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {labs.map((item, index) => (
            <LabCard key={item.name} item={item} index={index} progress={smoothProgress} />
          ))}
        </div>
      </div>
    </section>
  );
};

function LabCard({
  item,
  index,
  progress,
}: {
  item: typeof labs[0];
  index: number;
  progress: any;
}) {
  const cardStart = 0.1 + index * 0.08;
  const cardEnd = cardStart + 0.15;

  const y = useTransform(progress, [cardStart, cardEnd], [40, 0]);
  const opacity = useTransform(progress, [cardStart, cardEnd], [0, 1]);
  const scale = useTransform(progress, [cardStart, cardEnd], [0.92, 1]);

  const Wrapper = item.url ? motion.a : motion.div;
  const linkProps = item.url
    ? {
        href: item.url,
        target: "_blank" as const,
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <Wrapper
      {...linkProps}
      style={{ y, opacity, scale }}
      className={`group block bg-card/60 backdrop-blur-md rounded-2xl border border-border/50 p-6 transition-all duration-500 h-full glow-border-wrapper ${
        item.url
          ? "hover:border-primary/30 hover:bg-card/80 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer"
          : "opacity-60 cursor-default"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <item.icon className="text-primary" size={20} />
        </div>
        <span
          className={`inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider rounded-full px-2.5 py-1 ${
            item.status === "Live"
              ? "text-emerald-400/90 bg-emerald-400/10 border border-emerald-400/20"
              : "text-muted-foreground/60 bg-secondary/50 border border-border/40"
          }`}
        >
          {item.status === "Live" && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          )}
          {item.status}
        </span>
      </div>

      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 tracking-tight">
        {item.name}
        {item.url && (
          <ArrowUpRight
            className="text-muted-foreground/40 group-hover:text-primary transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            size={16}
          />
        )}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed font-light">
        {item.description}
      </p>
    </Wrapper>
  );
}

export default LabsSection;
