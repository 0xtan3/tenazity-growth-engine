import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ParallaxLayerProps {
  children: ReactNode;
  /** Speed multiplier — negative = moves opposite to scroll. Default: 0.5 */
  speed?: number;
  /** CSS class for the wrapper */
  className?: string;
  /** Whether to apply horizontal offset too */
  horizontal?: boolean;
  /** Horizontal speed (only if horizontal=true) */
  horizontalSpeed?: number;
}

export default function ParallaxLayer({
  children,
  speed = 0.5,
  className = "",
  horizontal = false,
  horizontalSpeed = 0,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);
  const y = useSpring(rawY, { stiffness: 80, damping: 30 });

  const rawX = useTransform(
    scrollYProgress,
    [0, 1],
    [horizontalSpeed * 50, horizontalSpeed * -50]
  );
  const x = horizontal
    ? useSpring(rawX, { stiffness: 80, damping: 30 })
    : undefined;

  return (
    <motion.div
      ref={ref}
      style={{ y, ...(horizontal && x ? { x } : {}) }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
