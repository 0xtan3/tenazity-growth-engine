import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 lg:py-32 bg-background border-t border-border/40">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Common Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about working with us.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${
                  isOpen ? "border-primary/50 bg-primary/5" : "border-border/50 bg-card/30 hover:border-border"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                >
                  <span className="font-semibold text-lg">{faq.question}</span>
                  <div className={`p-1 rounded-full shrink-0 transition-colors ${isOpen ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
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
