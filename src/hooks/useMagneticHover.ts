import { useRef, useState, useCallback } from "react";
import { useSpring, useTransform, MotionValue } from "framer-motion";

interface MagneticValues {
  x: MotionValue<number>;
  y: MotionValue<number>;
  onMouseMove: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave: () => void;
}

/**
 * A hook that creates a magnetic pull effect toward the cursor.
 * Returns spring-animated x/y values and mouse event handlers.
 * 
 * @param strength - How strongly the element is attracted (0.2 = subtle, 0.5 = aggressive)
 * @param damping - Spring damping (higher = less bounce)
 * @param stiffness - Spring stiffness (higher = snappier)
 */
export function useMagneticHover(
  strength: number = 0.3,
  damping: number = 15,
  stiffness: number = 150
): MagneticValues {
  const ref = useRef<{ centerX: number; centerY: number }>({ centerX: 0, centerY: 0 });

  const springConfig = { damping, stiffness, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      x.set(deltaX);
      y.set(deltaY);
    },
    [strength, x, y]
  );

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { x, y, onMouseMove, onMouseLeave };
}
