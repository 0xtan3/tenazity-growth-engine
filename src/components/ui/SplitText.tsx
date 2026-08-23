import { motion, Variants } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  highlightWord?: string;
  highlightClass?: string;
}

export function SplitText({ text, className = "", delay = 0, highlightWord = "", highlightClass = "" }: SplitTextProps) {
  // Split by words first to keep them together, then characters
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "inline-flex", flexWrap: "wrap", justifyContent: "center" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {words.map((word, index) => {
        const isHighlight = highlightWord && word.includes(highlightWord);
        const strippedWord = isHighlight ? word.replace(highlightWord, "") : word; // Just in case there's punctuation
        
        // Very basic highlight logic for the exact word match.
        // We will apply the highlight class to the span wrapping the characters of this word.
        const shouldHighlight = highlightWord && word.replace(/[^a-zA-Z0-9]/g, '') === highlightWord.replace(/[^a-zA-Z0-9]/g, '');

        return (
          <span
            key={index}
            style={{ display: "inline-flex", whiteSpace: "pre" }}
            className={`mr-2 ${shouldHighlight ? highlightClass : ""}`}
          >
            {Array.from(word).map((char, charIndex) => (
              <motion.span
                variants={child}
                key={`${index}-${charIndex}`}
                style={{ display: "inline-block" }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        );
      })}
    </motion.div>
  );
}
