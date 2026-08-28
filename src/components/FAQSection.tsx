import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import ScrollRevealText from "@/components/ui/ScrollRevealText";
import FloatingBlobs from "@/components/ui/FloatingBlobs";

const faqs = [
  {
    question: "Do you only work on large enterprise projects?",
    answer: "Nope. We work with startups, solo founders, and established brands alike. If the project fits our stack and we believe in the vision, we're in — whether it's a quick MVP or a full-scale platform build.",
  },
  {
    question: "How fast can you deliver an MVP?",
    answer: "Most MVPs ship in 2 to 4 weeks. We work in tight 2-day sprint cycles with live staging previews, so you see real progress every step of the way — no vanishing acts.",
  },
  {
    question: "How does pricing work?",
    answer: "We keep it simple. For well-defined projects (MVPs, websites), you get a clear fixed price upfront. For ongoing work, we offer monthly retainers. No hidden fees, no surprise invoices.",
  },
  {
    question: "Do you handle hosting and maintenance after launch?",
    answer: "Absolutely. Launching is just the start. We offer support retainers covering cloud infrastructure, database scaling, security patches, and feature development as your product grows.",
  },
  {
    question: "Can you work across different timezones?",
    answer: "Yes — we already do. We're based in India but work with founders across NZ, the US, UK, and Europe. We've got a communication routine that keeps things smooth regardless of where you are.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 lg:py-32 bg-background relative overflow-hidden border-t border-border/40">
      <FloatingBlobs />
      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-primary text-xs font-semibold tracking-widest uppercase">
              FAQ
            </span>
          </div>
          <ScrollRevealText
            text="Questions? We've got answers."
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 justify-center"
            highlightWords={["got", "answers."]}
            highlightClass="text-gradient-accent"
          />
          <p className="text-muted-foreground text-base sm:text-lg font-light max-w-md mx-auto">
            The stuff people usually ask us about process, pricing, and timelines.
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
                className={`border rounded-3xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "border-primary/40 glass-card shadow-xl shadow-primary/5 glow-border-wrapper"
                    : "border-border/60 bg-transparent hover:border-border/90 hover:bg-white/5"
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
                      isOpen ? "bg-primary text-primary-foreground" : "bg-secondary/60 text-muted-foreground"
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
