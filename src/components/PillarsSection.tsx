import { motion } from "framer-motion";
import { Code2, TrendingUp, ShieldCheck } from "lucide-react";

const pillars = [
  {
    icon: Code2,
    title: "Build & Experience",
    tags: ["Web Dev", "Web Apps", "UI/UX"],
    description:
      "High-performance web applications built for scale. Pixel-perfect interfaces backed by robust architecture.",
    focus: "Performance & Scalability",
  },
  {
    icon: TrendingUp,
    title: "Growth & Intelligence",
    tags: ["AI Tools", "Digital Marketing", "Ads"],
    description:
      "AI-powered marketing engines that maximize ROI. Data-driven campaigns that convert at scale.",
    focus: "ROI & Automation",
  },
  {
    icon: ShieldCheck,
    title: "Defense & Security",
    tags: ["EASM", "Pentesting", "Audits"],
    description:
      "Proactive security that finds threats before attackers do. Continuous monitoring and hardened defenses.",
    focus: "Resilience & Risk Mitigation",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const PillarsSection = () => (
  <section id="services" className="py-24 lg:py-32">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">What We Do</p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Three Pillars of Growth</h2>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
      >
        {pillars.map((p) => (
          <motion.div
            key={p.title}
            variants={cardVariant}
            className="group relative bg-card rounded-lg border border-border p-8 hover:border-primary/40 transition-all duration-500 hover:glow-box"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
              <p.icon className="text-primary" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
            <div className="flex gap-2 flex-wrap mb-4">
              {p.tags.map((t) => (
                <span key={t} className="text-xs font-mono text-primary/80 bg-primary/5 border border-primary/10 rounded px-2 py-0.5">
                  {t}
                </span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.description}</p>
            <p className="text-xs font-mono text-primary/60 uppercase tracking-wider">
              Focus → {p.focus}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default PillarsSection;
