import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const sections = [
  { id: "hero", label: "Intro", position: 0.05 },
  { id: "services", label: "Services", position: 0.3 },
  { id: "process", label: "Process", position: 0.55 },
  { id: "work", label: "Work", position: 0.75 },
  { id: "contact", label: "Contact", position: 0.95 },
];

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none">
      {/* Top progress bar with Phoenix/Ignition fire gradient */}
      <motion.div
        className="h-[3px] w-full origin-left"
        style={{
          scaleX,
          background:
            "linear-gradient(90deg, hsl(0 85% 50%), hsl(15 90% 55%), hsl(35 95% 55%), hsl(45 100% 60%))",
          boxShadow: "0 0 16px hsl(15 90% 55% / 0.6), 0 0 32px hsl(40 95% 55% / 0.3)",
        }}
      />
    </div>
  );
}
