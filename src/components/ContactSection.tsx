import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import ScrollRevealText from "@/components/ui/ScrollRevealText";

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Gravitational pull effect: Heading scales from 1.25 -> 1.0, blur reduces 6px -> 0px
  const headingScale = useTransform(smoothProgress, [0, 0.35], [1.25, 1]);
  const headingBlur = useTransform(smoothProgress, [0, 0.3], [6, 0]);
  const headingOpacity = useTransform(smoothProgress, [0, 0.25], [0.2, 1]);

  // Form 3D landing pad effect
  const formY = useTransform(smoothProgress, [0.15, 0.55], [100, 0]);
  const formOpacity = useTransform(smoothProgress, [0.15, 0.45], [0, 1]);
  const formRotateX = useTransform(smoothProgress, [0.15, 0.55], [12, 0]);
  const formScale = useTransform(smoothProgress, [0.15, 0.55], [0.92, 1]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <section ref={sectionRef} id="contact" className="pinned-section" style={{ height: "220vh" }}>
      <div className="pinned-content flex-col py-16 bg-background relative border-t border-border/40 overflow-hidden">
        {/* Background glow ambiance */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/10 via-transparent to-primary/5 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-[0.02] mix-blend-overlay pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 max-w-xl w-full">
          {/* Gravitational Pull Heading */}
          <motion.div
            style={{
              scale: headingScale,
              opacity: headingOpacity,
              filter: useTransform(headingBlur, (v) => `blur(${v}px)`),
            }}
            className="text-center mb-10"
          >
            <motion.p
              style={{
                opacity: useTransform(smoothProgress, [0, 0.2], [0, 1]),
                y: useTransform(smoothProgress, [0, 0.2], [-10, 0]),
              }}
              className="text-primary text-xs font-semibold tracking-widest uppercase mb-3"
            >
              Get In Touch
            </motion.p>
            <ScrollRevealText
              text="Let's build something."
              className="text-3xl md:text-5xl font-bold tracking-tight mb-4 justify-center"
              scrollRange={[0, 0.4]}
            />
            <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed max-w-md mx-auto">
              Have a project in mind? Send us a message and we'll get back to you within 24 hours.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                style={{
                  y: formY,
                  opacity: formOpacity,
                  rotateX: formRotateX,
                  scale: formScale,
                  transformPerspective: 1000,
                }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              >
                <form
                  onSubmit={handleSubmit}
                  className="space-y-8 bg-card/40 backdrop-blur-xl border border-border/60 p-8 md:p-10 rounded-2xl shadow-2xl glow-border-wrapper"
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Liquid Underline Input: Name */}
                    <div className="relative group liquid-underline">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="peer w-full bg-transparent border-b border-border/60 py-3 text-foreground focus:outline-none focus:border-primary/40 transition-colors"
                        onFocus={() => setFocusedInput("name")}
                        onBlur={(e) => setFocusedInput(e.target.value ? "name" : null)}
                      />
                      <label
                        htmlFor="name"
                        className={`absolute left-0 transition-all duration-300 pointer-events-none text-muted-foreground ${
                          focusedInput === "name" || document.getElementById("name")?.matches(":valid")
                            ? "-top-4 text-xs text-primary font-medium"
                            : "top-3 text-base"
                        }`}
                      >
                        Your Name
                      </label>
                    </div>

                    {/* Liquid Underline Input: Email */}
                    <div className="relative group liquid-underline">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="peer w-full bg-transparent border-b border-border/60 py-3 text-foreground focus:outline-none focus:border-primary/40 transition-colors"
                        onFocus={() => setFocusedInput("email")}
                        onBlur={(e) => setFocusedInput(e.target.value ? "email" : null)}
                      />
                      <label
                        htmlFor="email"
                        className={`absolute left-0 transition-all duration-300 pointer-events-none text-muted-foreground ${
                          focusedInput === "email" || document.getElementById("email")?.matches(":valid")
                            ? "-top-4 text-xs text-primary font-medium"
                            : "top-3 text-base"
                        }`}
                      >
                        Email Address
                      </label>
                    </div>
                  </div>

                  {/* Liquid Underline Textarea */}
                  <div className="relative group pt-2 liquid-underline">
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      required
                      className="peer w-full bg-transparent border-b border-border/60 py-3 text-foreground focus:outline-none focus:border-primary/40 transition-colors resize-none"
                      onFocus={() => setFocusedInput("message")}
                      onBlur={(e) => setFocusedInput(e.target.value ? "message" : null)}
                    />
                    <label
                      htmlFor="message"
                      className={`absolute left-0 transition-all duration-300 pointer-events-none text-muted-foreground ${
                        focusedInput === "message" || document.getElementById("message")?.matches(":valid")
                          ? "-top-4 text-xs text-primary font-medium"
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
                      className="group w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-medium text-sm transition-all duration-300 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none glow-subtle shine-sweep shadow-lg cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-center mt-4">
                    <a
                      href="mailto:hello@tenazity.com"
                      className="text-xs text-muted-foreground/60 hover:text-primary transition-colors"
                    >
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
                className="h-64 flex flex-col items-center justify-center text-center bg-primary/5 border border-primary/20 rounded-2xl p-10 backdrop-blur-md"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 text-primary">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent</h3>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-6">
                  Thanks for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="text-xs font-medium text-primary hover:underline underline-offset-4 cursor-pointer"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
