import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import ScrollRevealText from "@/components/ui/ScrollRevealText";

const faqs = [
  {
    question: "Do you only take on large enterprise projects?",
    answer: "Not at all. We scale our team to fit the scope. Whether it's a fast SaaS MVP for a startup or an end-to-end digital infrastructure migration for an established brand, if it fits our modern tech stack and we believe in the vision, we'll build it.",
  },
  {
    question: "How fast can you deliver a complete MVP?",
    answer: "Most MVP builds take between 2 to 4 weeks from initial kickoff to production deployment. We work in rapid, transparent 2-day sprint cycles with live staging previews so you see real progress continuously.",
  },
  {
    question: "What is your pricing model?",
    answer: "Every project is transparently structured. For well-defined deliverables (like SaaS MVPs and custom websites), we offer clear fixed-price contracts. For ongoing feature development or complex R&D, we offer dedicated monthly retainers. No surprise fees.",
  },
  {
    question: "Do you handle maintenance and cloud hosting after launch?",
    answer: "Yes. Shipping is just the beginning. We provide ongoing support retainers to manage AWS/Vercel cloud infrastructure, database scaling, automated backups, security patches, and iterative feature development as your user base grows.",
  },
  {
    question: "Are you limited to clients in a specific timezone?",
    answer: "No. While based in India, we operate entirely globally and work with founders across the US, UK, Europe, and Asia. We have structured communication routines that ensure smooth collaboration regardless of timezone.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 lg:py-32 bg-background border-t border-border/40 relative">
      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-primary text-xs font-semibold tracking-widest uppercase">
              Frequently Asked Questions
            </span>
          </div>
          <ScrollRevealText
            text="Everything you need to know."
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 justify-center"
            highlightWords={["need", "to", "know."]}
            highlightClass="text-gradient-accent"
          />
          <p className="text-muted-foreground text-base sm:text-lg font-light max-w-md mx-auto">
            Clear answers to common questions about our process, pricing, and timelines.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "border-primary/40 bg-card/90 shadow-xl shadow-primary/5 glow-border-wrapper"
                    : "border-border/60 bg-card/30 hover:border-border/90 hover:bg-card/60"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-bold text-base sm:text-lg text-foreground tracking-tight">
                    {faq.question}
                  </span>
                  <div
                    className={`p-1.5 rounded-full shrink-0 transition-colors duration-300 ${
                      isOpen ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 pb-6 text-sm sm:text-base text-muted-foreground font-light leading-relaxed border-t border-border/30 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
