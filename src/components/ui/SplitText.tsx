import { motion, Variants } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  highlightWord?: string;
  highlightClass?: string;
}

export function SplitText({ text, className = "", delay = 0, highlightWord = "", highlightClass = "" }: SplitTextProps) {
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.035, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 150,
      },
    },
    hidden: {
      opacity: 0,
      y: 30,
      rotateX: 25,
      filter: "blur(4px)",
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 150,
      },
    },
  };

  return (
    <motion.div
      style={{
        overflow: "hidden",
        display: "inline-flex",
        flexWrap: "wrap",
        justifyContent: "center",
        perspective: "600px",
      }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {words.map((word, index) => {
        const shouldHighlight = highlightWord && word.replace(/[^a-zA-Z0-9]/g, '') === highlightWord.replace(/[^a-zA-Z0-9]/g, '');

        return (
          <span
            key={index}
            style={{ display: "inline-flex", whiteSpace: "pre", overflow: "hidden" }}
            className={`mr-2 ${shouldHighlight ? highlightClass : ""}`}
          >
            {Array.from(word).map((char, charIndex) => (
              <motion.span
                variants={child}
                key={`${index}-${charIndex}`}
                style={{
                  display: "inline-block",
                  transformOrigin: "bottom center",
                  willChange: "transform, opacity, filter",
                }}
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
