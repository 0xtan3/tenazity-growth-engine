import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import ScrollRevealText from "@/components/ui/ScrollRevealText";
import NeonGrid from "@/components/ui/NeonGrid";

const projectTypes = [
  "Web App / SaaS MVP",
  "Website & SEO",
  "UI/UX Design & Figma",
  "Monthly Retainer",
];

const ContactSection = () => {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>(projectTypes[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate network submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden bg-background border-t border-border/40">
      <NeonGrid />

      {/* Background glow ambiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-2xl w-full">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-xs font-semibold tracking-widest uppercase">
              Get in Touch
            </span>
          </div>
          <ScrollRevealText
            text="Got an idea? Let's talk."
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 justify-center"
            highlightWords={["idea?", "talk."]}
            highlightClass="text-gradient-accent"
          />
          <p className="text-muted-foreground text-base sm:text-lg font-light leading-relaxed max-w-lg mx-auto">
            Tell us what you're building. We'll get back to you within 24 hours with a clear plan and honest estimate.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <form
                onSubmit={handleSubmit}
                className="space-y-8 glass-card backdrop-blur-md border border-border/70 p-6 sm:p-10 rounded-3xl shadow-2xl glow-border-wrapper"
              >
                {/* Project Type Pills */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    What do you need?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {projectTypes.map((type) => {
                      const isSelected = selectedType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setSelectedType(type)}
                          className={`text-xs font-medium px-3.5 py-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? "bg-primary/20 border-primary text-primary font-semibold shadow-sm"
                              : "glass-card border-border/50 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                  {/* Input: Name */}
                  <div className="relative liquid-underline">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Your name"
                      className="w-full bg-transparent border-b border-border/60 py-3 text-foreground focus:outline-none focus:border-primary/40 transition-colors text-sm"
                      onFocus={() => setFocusedInput("name")}
                      onBlur={() => setFocusedInput(null)}
                    />
                    <label
                      htmlFor="name"
                      className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 mt-1"
                    >
                      Name
                    </label>
                  </div>

                  {/* Input: Email */}
                  <div className="relative liquid-underline">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="you@company.com"
                      className="w-full bg-transparent border-b border-border/60 py-3 text-foreground focus:outline-none focus:border-primary/40 transition-colors text-sm"
                      onFocus={() => setFocusedInput("email")}
                      onBlur={() => setFocusedInput(null)}
                    />
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 mt-1"
                    >
                      Email
                    </label>
                  </div>
                </div>

                {/* Textarea: Message */}
                <div className="relative liquid-underline pt-2">
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    required
                    placeholder="Tell us about your project — what you're building, your timeline, and any must-haves..."
                    className="w-full bg-transparent border-b border-border/60 py-3 text-foreground focus:outline-none focus:border-primary/40 transition-colors resize-none text-sm"
                    onFocus={() => setFocusedInput("message")}
                    onBlur={() => setFocusedInput(null)}
                  />
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 mt-1"
                  >
                    Project Details
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:bg-primary/90 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none glow-pink shine-sweep shadow-xl cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send Message <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center pt-2">
                  <a
                    href="mailto:hello@tenazity.com"
                    className="text-xs text-muted-foreground/70 hover:text-primary transition-colors inline-flex items-center gap-1.5"
                  >
                    <Mail size={13} /> Or email us directly at hello@tenazity.com
                  </a>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="flex flex-col items-center justify-center text-center glass-card border border-primary/30 rounded-3xl p-10 backdrop-blur-md shadow-2xl"
            >
              <div className="w-14 h-14 bg-primary/15 border border-primary/30 rounded-full flex items-center justify-center mb-5 text-primary shadow-lg shadow-primary/20">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Message received!</h3>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-8 font-light">
                Thanks for reaching out. We'll review your project and get back to you within 24 hours.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="text-xs font-semibold text-primary hover:underline underline-offset-4 cursor-pointer"
              >
                Send another message
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ContactSection;
