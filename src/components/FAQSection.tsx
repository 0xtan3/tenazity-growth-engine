import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import ScrollRevealText from "@/components/ui/ScrollRevealText";

const faqs = [
  {
    question: "Do you only take on large enterprise projects?",
    answer: "Not at all. We scale our team to fit the scope. Whether it's a fast MVP for a new startup or a complex digital migration for an established business, if it fits our tech stack and we believe in the vision, we'll build it.",
  },
  {
    question: "Are you limited to clients in a specific city?",
    answer: "No. While we have a strong presence in India, we operate entirely remotely and work with clients globally. We have streamlined processes to maintain seamless communication across all time zones.",
  },
  {
    question: "What is your pricing model?",
    answer: "Every project is unique. For clear-cut deliverables (like an MVP), we offer fixed-price contracts. For ongoing maintenance or complex R&D, we offer dedicated monthly retainers. We'll find the structure that works best for your business.",
  },
  {
    question: "Do you handle maintenance and hosting after launch?",
    answer: "Yes. Building the product is only half the battle. We offer ongoing maintenance retainers to handle server hosting, bug fixes, updates, and scaling your infrastructure as your user base grows.",
  },
];

const FAQSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
  });

  // Each FAQ card gets a staggered scroll range
  const faqRanges = [
    [0.05, 0.2],
    [0.1, 0.25],
    [0.15, 0.3],
    [0.2, 0.35],
  ];

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-background border-t border-border/40">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Heading with ScrollRevealText */}
        <div className="text-center mb-16">
          <ScrollRevealText
            text="Common Questions"
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
            scrollRange={[0, 0.5]}
          />
          <motion.p
            style={{
              opacity: useTransform(smoothProgress, [0.08, 0.2], [0, 1]),
              y: useTransform(smoothProgress, [0.08, 0.2], [15, 0]),
            }}
            className="text-muted-foreground text-lg"
          >
            Everything you need to know about working with us.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const range = faqRanges[index] as [number, number];
            const isOdd = index % 2 !== 0;

            return (
              <FAQCard
                key={index}
                faq={faq}
                isOpen={isOpen}
                index={index}
                isOdd={isOdd}
                progress={smoothProgress}
                range={range}
                onToggle={() => setOpenIndex(isOpen ? null : index)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

function FAQCard({
  faq,
  isOpen,
  index,
  isOdd,
  progress,
  range,
  onToggle,
}: {
  faq: typeof faqs[0];
  isOpen: boolean;
  index: number;
  isOdd: boolean;
  progress: any;
  range: [number, number];
  onToggle: () => void;
}) {
  // Staggered entrance — alternate from left/right with blur
  const x = useTransform(progress, [range[0], range[1]], [isOdd ? 40 : -40, 0]);
  const opacity = useTransform(progress, [range[0], range[1]], [0, 1]);
  const blur = useTransform(progress, [range[0], range[1]], [8, 0]);

  // Answer text word-by-word stagger animation
  const answerWords = faq.answer.split(" ");

  return (
    <motion.div
      style={{
        x,
        opacity,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
      }}
      className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${
        isOpen
          ? "border-primary/50 bg-primary/5 glow-border-wrapper glow-border-active"
          : "border-border/50 bg-card/30 hover:border-border"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
      >
        <span className="font-semibold text-lg">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`p-1 rounded-full shrink-0 transition-colors ${
            isOpen ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
          }`}
        >
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="px-6 pb-6 leading-relaxed">
              {/* Word-by-word typewriter stagger on open */}
              {answerWords.map((word, wi) => (
                <motion.span
                  key={wi}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.15,
                    delay: wi * 0.015,
                    ease: "easeOut",
                  }}
                  className="inline-block mr-[0.3em] text-muted-foreground"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default FAQSection;
