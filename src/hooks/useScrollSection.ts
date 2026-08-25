import { RefObject } from "react";
import { useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

interface ScrollSectionOptions {
  /** Start offset — when the section enters (default: "start start") */
  startOffset?: string;
  /** End offset — when the section leaves (default: "end end") */
  endOffset?: string;
  /** Spring stiffness for smoothing (default: 100) */
  stiffness?: number;
  /** Spring damping for smoothing (default: 30) */
  damping?: number;
}

interface ScrollSectionResult {
  /** Raw scroll progress 0→1 through the section */
  progress: MotionValue<number>;
  /** Smoothed (spring-animated) progress */
  smoothProgress: MotionValue<number>;
  /** Helper to create a transform mapped to the section's scroll progress */
  mapRange: <T>(inputRange: number[], outputRange: T[]) => MotionValue<T>;
}

/**
 * Hook for creating Apple-style pinned scroll sections.
 * Tracks scroll progress through a container and provides
 * spring-smoothed progress + a helper to map progress to any value.
 *
 * Usage:
 * ```tsx
 * const containerRef = useRef(null);
 * const { smoothProgress, mapRange } = useScrollSection(containerRef);
 * const opacity = mapRange([0, 0.5, 1], [0, 1, 0]);
 * ```
 */
export function useScrollSection(
  target: RefObject<HTMLElement>,
  options: ScrollSectionOptions = {}
): ScrollSectionResult {
  const {
    startOffset = "start start",
    endOffset = "end end",
    stiffness = 100,
    damping = 30,
  } = options;

  const { scrollYProgress } = useScroll({
    target,
    offset: [startOffset, endOffset] as any,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness,
    damping,
    restDelta: 0.001,
  });

  function mapRange<T>(inputRange: number[], outputRange: T[]): MotionValue<T> {
    return useTransform(smoothProgress, inputRange, outputRange) as MotionValue<T>;
  }

  return {
    progress: scrollYProgress,
    smoothProgress,
    mapRange,
  };
}
