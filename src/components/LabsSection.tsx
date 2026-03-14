import { motion } from "framer-motion";
import { Cpu, Gauge, Lock, Clock } from "lucide-react";

const featuredLabs = [
  {
    icon: Cpu,
    name: "NeuralAds Engine",
    description: "AI-powered ad creative generator and A/B optimizer.",
    impact: "3.2x Higher CTR",
    span: "md:col-span-2",
  },
  {
    icon: Gauge,
    name: "VelocityCI",
    description: "Zero-config CI/CD pipeline for fullstack apps.",
    impact: "Reduced Latency by 40%",
    span: "",
  },
  {
    icon: Lock,
    name: "VaultScan",
    description: "Automated EASM & vulnerability detection platform.",
    impact: "98% Threat Coverage",
    span: "",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const LabsSection = () => (
  <section id="labs" className="py-24 lg:py-32 bg-secondary/30">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Tenazity Labs</p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Internal Tools & Experiments</h2>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto"
      >
        {featuredLabs.map((item) => (
          <motion.div
            key={item.name}
            variants={cardVariant}
            className={`relative bg-card rounded-lg border border-border p-6 hover:border-primary/30 transition-all duration-300 group ${item.span}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                <item.icon className="text-primary" size={20} />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-primary/60 bg-primary/5 border border-primary/10 rounded px-2 py-0.5">
                Tool
              </span>
            </div>
            <h3 className="text-base font-semibold mb-1">{item.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
              <span className="text-xs font-mono text-primary">{item.impact}</span>
            </div>
          </motion.div>
        ))}

        {/* Coming Soon Card */}
        <motion.div
          variants={cardVariant}
          className="relative bg-card/50 border border-border/50 border-dashed rounded-lg p-6 flex flex-col items-center justify-center min-h-[180px]"
        >
          <Clock className="text-muted-foreground/40 mb-3" size={24} />
          <p className="text-muted-foreground font-mono text-xs">More experiments</p>
          <p className="text-muted-foreground/60 text-[10px] mt-1">Coming soon</p>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default LabsSection;
