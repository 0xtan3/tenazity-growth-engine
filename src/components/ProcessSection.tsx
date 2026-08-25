import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Search, PenTool, Code, Rocket, Check } from "lucide-react";
import { useRef } from "react";
import ScrollRevealText from "@/components/ui/ScrollRevealText";
import CountUp from "@/components/ui/CountUp";

const processSteps = [
  {
    step: "01",
    title: "Discovery & Strategy",
    description: "We dive deep into your business goals, target audience, and technical requirements to architect a scalable solution.",
    icon: Search,
  },
  {
    step: "02",
    title: "Design & Prototyping",
    description: "We craft bespoke, conversion-optimized UI/UX designs and interactive prototypes to visualize the final product.",
    icon: PenTool,
  },
  {
    step: "03",
    title: "Agile Development",
    description: "Our engineers build your product using modern, battle-tested frameworks, delivering fast iterations and clean code.",
    icon: Code,
  },
  {
    step: "04",
    title: "Launch & Maintenance",
    description: "We deploy your product to production and handle the infrastructure. We stay by your side to ensure your product runs smoothly.",
    icon: Rocket,
  },
];

const ProcessSection = () => {
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

  // Ignition line width — scroll-driven from 0% to 100%
  const lineWidth = useTransform(smoothProgress, [0.15, 0.9], [0, 100]);

  // Step activation thresholds
  const stepRanges = [
    [0.15, 0.35],  // Step 1
    [0.35, 0.55],  // Step 2
    [0.55, 0.75],  // Step 3
    [0.75, 0.95],  // Step 4
  ];

  return (
    <section ref={sectionRef} className="pinned-section" style={{ height: "350vh" }}>
      <div className="pinned-content flex-col py-20">
        <div className="absolute inset-0 bg-secondary/5 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 w-full">
          {/* Header */}
          <div className="max-w-2xl mb-16 md:mb-24">
            <motion.div
              style={{
                opacity: useTransform(smoothProgress, [0, 0.1], [0, 1]),
              }}
              className="flex items-center gap-2 mb-4"
            >
              <motion.div
                style={{
                  width: useTransform(smoothProgress, [0.02, 0.12], [0, 48]),
                }}
                className="h-[1px] bg-primary"
              />
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">How We Work</span>
            </motion.div>
            <ScrollRevealText
              text="A proven process for predictable excellence."
              className="text-3xl md:text-5xl font-bold tracking-tight leading-tight"
              scrollRange={[0, 0.5]}
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative">
            {/* Scroll-driven ignition line */}
            <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-[2px]">
              {/* Background track */}
              <div className="absolute inset-0 bg-border/30 rounded-full" />
              {/* Animated fill */}
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  width: useTransform(lineWidth, (v) => `${v}%`),
                  background: "linear-gradient(90deg, hsl(15 90% 55%), hsl(40 95% 55%))",
                  boxShadow: "0 0 12px hsl(15 90% 55% / 0.4), 0 0 24px hsl(40 95% 55% / 0.2)",
                }}
              />
            </div>

            {processSteps.map((item, index) => (
              <StepCard
                key={item.step}
                item={item}
                index={index}
                progress={smoothProgress}
                range={stepRanges[index] as [number, number]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

function StepCard({
  item,
  index,
  progress,
  range,
}: {
  item: typeof processSteps[0];
  index: number;
  progress: any;
  range: [number, number];
}) {
  // Card entrance
  const cardOpacity = useTransform(progress, [range[0] - 0.05, range[0] + 0.05], [0, 1]);
  const cardY = useTransform(progress, [range[0] - 0.05, range[0] + 0.08], [30, 0]);

  // Icon activation
  const iconScale = useTransform(
    progress,
    [range[0], range[0] + 0.05, range[0] + 0.1],
    [0.8, 1.2, 1]
  );
  const iconBorderColor = useTransform(
    progress,
    [range[0], range[0] + 0.1],
    ["hsl(15 10% 14% / 0.5)", "hsl(15 90% 55% / 0.5)"]
  );

  // Active state — spotlight glow
  const isActive = useTransform(
    progress,
    [range[0] - 0.05, range[0], range[1], range[1] + 0.05],
    [0, 1, 1, 0.5]
  );

  // Pulse ring
  const pulseScale = useTransform(progress, [range[0], range[0] + 0.08], [1, 2.5]);
  const pulseOpacity = useTransform(progress, [range[0], range[0] + 0.08], [0.5, 0]);

  // Completed state (green check)
  const isCompleted = useTransform(progress, [range[1], range[1] + 0.05], [0, 1]);

  return (
    <motion.div
      style={{
        opacity: cardOpacity,
        y: cardY,
      }}
      className="relative group"
    >
      {/* Active spotlight glow */}
      <motion.div
        style={{ opacity: isActive }}
        className="absolute -inset-4 rounded-2xl spotlight-glow pointer-events-none -z-10"
      />

      <motion.div
        className="w-16 h-16 rounded-full bg-background border border-border/50 flex items-center justify-center relative z-10 mb-8 transition-colors duration-300"
        style={{
          scale: iconScale,
          borderColor: iconBorderColor,
        }}
      >
        <item.icon size={24} className="text-muted-foreground group-hover:text-primary transition-colors" />

        {/* Animated step number */}
        <motion.div
          style={{ opacity: useTransform(isCompleted, (v) => 1 - v) }}
          className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg"
        >
          <CountUp target={item.step} className="" duration={1} />
        </motion.div>

        {/* Completed checkmark */}
        <motion.div
          style={{ opacity: isCompleted, scale: isCompleted }}
          className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] font-bold w-5 h-5 rounded-full shadow-lg flex items-center justify-center"
        >
          <Check size={12} strokeWidth={3} />
        </motion.div>
      </motion.div>

      {/* Pulse ring on activation */}
      <motion.div
        className="absolute top-0 left-0 w-16 h-16 rounded-full border border-primary/40 pointer-events-none"
        style={{
          scale: pulseScale,
          opacity: pulseOpacity,
        }}
      />

      <h3 className="text-xl font-bold mb-3">{item.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {item.description}
      </p>
    </motion.div>
  );
}

export default ProcessSection;
