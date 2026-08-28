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
    stiffness: 400,
    damping: 40,
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
            "linear-gradient(90deg, #8B5CF6, #EC4899, #A3E635)",
          boxShadow: "0 0 14px rgba(236, 72, 153, 0.6)",
        }}
      />
    </div>
  );
}
