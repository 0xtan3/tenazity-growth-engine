import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const techStack = ["Go", "Python", "Next.js", "FastAPI", "ClickHouse", "React", "Tailwind", "Docker"];

const TrustSection = () => (
  <section className="py-24 lg:py-32">
    <div className="container mx-auto px-4">
      {/* Security Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-card border border-primary/20 rounded-lg p-8 md:p-12 text-center mb-20 glow-box"
      >
        <ShieldCheck className="mx-auto text-primary mb-4" size={40} />
        <h3 className="text-2xl md:text-3xl font-bold mb-3">Security-First Engineering</h3>
        <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Every line of code we write is audited for vulnerabilities. We don't just build; we protect.
        </p>
      </motion.div>

      {/* Tech Stack Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-center text-xs font-mono text-muted-foreground uppercase tracking-widest mb-8">
          Our Tech Stack
        </p>
        <div className="overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
          <div className="flex marquee">
            {[...techStack, ...techStack].map((tech, i) => (
              <div
                key={`${tech}-${i}`}
                className="flex-shrink-0 mx-8 flex items-center justify-center"
              >
                <span className="text-lg font-mono text-muted-foreground/60 whitespace-nowrap">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default TrustSection;
