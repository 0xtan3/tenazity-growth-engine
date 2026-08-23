import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const ContactSection = () => {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request for now
    // We will integrate direct email (e.g. EmailJS/Resend) later
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 relative border-t border-border/40">
      <div className="absolute inset-0 bg-secondary/10 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Let's build something.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed">
            Have a project in mind? Send us a message and we'll get back to you within 24 hours.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-8 bg-card/30 backdrop-blur-md border border-border/50 p-8 rounded-2xl">
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Floating Label Input: Name */}
                  <div className="relative group">
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      required
                      className="peer w-full bg-transparent border-b border-border/60 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                      onFocus={() => setFocusedInput('name')}
                      onBlur={(e) => setFocusedInput(e.target.value ? 'name' : null)}
                    />
                    <label 
                      htmlFor="name" 
                      className={`absolute left-0 transition-all duration-300 pointer-events-none text-muted-foreground ${
                        focusedInput === 'name' || document.getElementById('name')?.matches(':valid') 
                          ? "-top-4 text-xs text-primary" 
                          : "top-3 text-base"
                      }`}
                    >
                      Your Name
                    </label>
                  </div>

                  {/* Floating Label Input: Email */}
                  <div className="relative group">
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      required
                      className="peer w-full bg-transparent border-b border-border/60 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                      onFocus={() => setFocusedInput('email')}
                      onBlur={(e) => setFocusedInput(e.target.value ? 'email' : null)}
                    />
                    <label 
                      htmlFor="email" 
                      className={`absolute left-0 transition-all duration-300 pointer-events-none text-muted-foreground ${
                        focusedInput === 'email' || document.getElementById('email')?.matches(':valid') 
                          ? "-top-4 text-xs text-primary" 
                          : "top-3 text-base"
                      }`}
                    >
                      Email Address
                    </label>
                  </div>
                </div>

                {/* Floating Label Textarea */}
                <div className="relative group pt-2">
                  <textarea 
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="peer w-full bg-transparent border-b border-border/60 py-3 text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                    onFocus={() => setFocusedInput('message')}
                    onBlur={(e) => setFocusedInput(e.target.value ? 'message' : null)}
                  />
                  <label 
                    htmlFor="message" 
                    className={`absolute left-0 transition-all duration-300 pointer-events-none text-muted-foreground ${
                      focusedInput === 'message' || document.getElementById('message')?.matches(':valid') 
                        ? "-top-4 text-xs text-primary" 
                        : "top-3 text-base"
                    }`}
                  >
                    Project Details
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-medium text-sm transition-all duration-300 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
                
                <div className="text-center mt-6">
                  <a href="mailto:hello@tenazity.com" className="text-xs text-muted-foreground/50 hover:text-foreground transition-colors">
                    Or email us directly at hello@tenazity.com
                  </a>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="h-64 flex flex-col items-center justify-center text-center bg-primary/5 border border-primary/10 rounded-2xl p-10"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="text-primary" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Message Sent</h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-6">
                Thanks for reaching out. We'll get back to you within 24 hours.
              </p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="text-xs font-medium text-primary hover:underline underline-offset-4"
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
