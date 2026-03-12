import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Rocket, Code2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const goals = [
  { id: "growth", label: "Growth", icon: Rocket, desc: "Scale my business with AI-driven marketing" },
  { id: "building", label: "Building", icon: Code2, desc: "Build a high-performance web application" },
  { id: "security", label: "Security", icon: ShieldCheck, desc: "Secure and protect my digital assets" },
];

const ContactSection = () => {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <section id="contact" className="py-24 lg:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Rocket className="text-primary" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
            <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Contact</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Let's Talk</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card border border-border rounded-lg p-8"
        >
          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2].map((s) => (
              <div key={s} className={`h-1 flex-1 rounded-full transition-colors ${s <= step ? "bg-primary" : "bg-border"}`} />
            ))}
          </div>

          {step === 1 && (
            <div>
              <p className="text-sm text-muted-foreground mb-4">What is your primary goal?</p>
              <div className="space-y-3">
                {goals.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => { setGoal(g.id); setStep(2); }}
                    className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-all text-left ${
                      goal === g.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <g.icon className="text-primary" size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{g.label}</p>
                      <p className="text-xs text-muted-foreground">{g.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Name" required className="bg-secondary border-border" />
                <Input placeholder="Email" type="email" required className="bg-secondary border-border" />
              </div>
              <Input placeholder="Company" className="bg-secondary border-border" />
              <Textarea placeholder="Tell us about your project..." rows={4} className="bg-secondary border-border resize-none" />
              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="border-border">
                  Back
                </Button>
                <Button type="submit" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 glow-box font-semibold">
                  Send Message <ArrowRight className="ml-2" size={16} />
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
