import { motion } from "framer-motion";
import { Cpu, Gauge, BarChart3, Zap, Lock, Globe } from "lucide-react";

const labItems = [
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
  {
    icon: BarChart3,
    name: "InsightFlow",
    description: "Real-time analytics dashboard with AI anomaly detection.",
    impact: "60% Faster Decisions",
    span: "md:col-span-2",
  },
  {
    icon: Zap,
    name: "EdgeWorker",
    description: "Serverless compute at the edge for sub-50ms responses.",
    impact: "47ms Avg Response",
    span: "",
  },
  {
    icon: Globe,
    name: "LocaleAI",
    description: "AI-driven localization and content adaptation engine.",
    impact: "30+ Languages",
    span: "md:col-span-2",
  },
];

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

      <div className="grid md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {labItems.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
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
      </div>
    </div>
  </section>
);

export default LabsSection;
