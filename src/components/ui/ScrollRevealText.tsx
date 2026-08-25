import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
  /** Scroll progress range [start, end] within the parent — defaults to [0, 1] */
  scrollRange?: [number, number];
  /** Highlight specific words with an accent class */
  highlightWords?: string[];
  highlightClass?: string;
  /** Tag to render — defaults to "p" */
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  /** Whether to use the viewport as scroll container (true) or a parent ref */
  useViewport?: boolean;
}

export default function ScrollRevealText({
  text,
  className = "",
  scrollRange = [0, 1],
  highlightWords = [],
  highlightClass = "text-gradient-accent",
  as: Tag = "p",
  useViewport = true,
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "start 0.3"],
  });

  return (
    <div ref={containerRef} className={className}>
      <Tag className="sr-only">{text}</Tag>
      <span aria-hidden="true" className={className} style={{ display: "flex", flexWrap: "wrap" }}>
        {words.map((word, i) => {
          const wordStart = scrollRange[0] + (i / words.length) * (scrollRange[1] - scrollRange[0]);
          const wordEnd = scrollRange[0] + ((i + 1) / words.length) * (scrollRange[1] - scrollRange[0]);
          const isHighlight = highlightWords.some(
            (hw) => word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() === hw.toLowerCase()
          );

          return (
            <Word
              key={`${word}-${i}`}
              word={word}
              progress={scrollYProgress}
              range={[wordStart, wordEnd]}
              isHighlight={isHighlight}
              highlightClass={highlightClass}
            />
          );
        })}
      </span>
    </div>
  );
}

function Word({
  word,
  progress,
  range,
  isHighlight,
  highlightClass,
}: {
  word: string;
  progress: any;
  range: [number, number];
  isHighlight: boolean;
  highlightClass: string;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const blur = useTransform(progress, range, [4, 0]);
  const y = useTransform(progress, range, [6, 0]);

  return (
    <motion.span
      style={{
        opacity,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
        y,
      }}
      className={`inline-block mr-[0.3em] transition-colors duration-300 ${
        isHighlight ? highlightClass : ""
      }`}
    >
      {word}
    </motion.span>
  );
}
