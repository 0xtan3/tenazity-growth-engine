import { motion } from "framer-motion";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightClass?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  scrollRange?: [number, number];
  useViewport?: boolean;
}

export default function ScrollRevealText({
  text,
  className = "",
  highlightWords = [],
  highlightClass = "text-gradient-accent",
  as: Tag = "p",
}: ScrollRevealTextProps) {
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 16,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className={className}>
      <Tag className="sr-only">{text}</Tag>
      <motion.span
        aria-hidden="true"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className={`inline-flex flex-wrap ${className}`}
      >
        {words.map((word, i) => {
          const cleanWord = word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
          const isHighlight = highlightWords.some(
            (hw) => cleanWord === hw.toLowerCase()
          );

          return (
            <motion.span
              key={`${word}-${i}`}
              variants={wordVariants}
              className={`inline-block mr-[0.28em] ${
                isHighlight ? highlightClass : ""
              }`}
            >
              {word}
            </motion.span>
          );
        })}
      </motion.span>
    </div>
  );
}
