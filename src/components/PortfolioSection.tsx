import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import portfolioFintech from "@/assets/portfolio-fintech.jpg";
import portfolioEcommerce from "@/assets/portfolio-ecommerce.jpg";
import portfolioSecurity from "@/assets/portfolio-security.jpg";
import portfolioSaas from "@/assets/portfolio-saas.jpg";

const projects = [
  {
    image: portfolioFintech,
    category: "Build & Experience",
    title: "FinEdge Analytics Platform",
    description: "A real-time financial analytics dashboard processing 2M+ daily transactions with sub-100ms query times.",
    metrics: [
      { label: "Uptime", value: "99.99%" },
      { label: "Load Time", value: "0.8s" },
      { label: "Daily Users", value: "45K+" },
    ],
    tech: ["Next.js", "Go", "ClickHouse"],
  },
  {
    image: portfolioEcommerce,
    category: "Growth & Intelligence",
    title: "LuxMarket E-Commerce",
    description: "AI-powered luxury marketplace with personalized recommendations and dynamic pricing engine.",
    metrics: [
      { label: "Revenue Lift", value: "+210%" },
      { label: "Conv. Rate", value: "4.8%" },
      { label: "AOV Increase", value: "+37%" },
    ],
    tech: ["React", "Python", "FastAPI"],
  },
  {
    image: portfolioSecurity,
    category: "Defense & Security",
    title: "CyberVault EASM Suite",
    description: "Enterprise attack surface management platform monitoring 10K+ assets across 30 organizations.",
    metrics: [
      { label: "Threats Found", value: "12K+" },
      { label: "MTTR", value: "< 4hrs" },
      { label: "Coverage", value: "98%" },
    ],
    tech: ["Go", "Python", "Docker"],
  },
  {
    image: portfolioSaas,
    category: "Growth & Intelligence",
    title: "ScaleOS Marketing Hub",
    description: "Unified marketing automation platform with AI-driven campaign optimization and real-time attribution.",
    metrics: [
      { label: "ROAS", value: "5.2x" },
      { label: "Campaigns", value: "800+" },
      { label: "Cost Saved", value: "60%" },
    ],
    tech: ["Next.js", "FastAPI", "ClickHouse"],
  },
];

const PortfolioSection = () => (
  <section id="portfolio" className="py-24 lg:py-32">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Portfolio</p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Case Studies</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group bg-card rounded-lg border border-border overflow-hidden hover:border-primary/30 transition-all duration-500 hover:glow-box"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
              <span className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-widest text-primary bg-card/80 backdrop-blur-sm border border-primary/20 rounded px-2.5 py-1">
                {project.category}
              </span>
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="text-primary" size={14} />
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{project.description}</p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {project.metrics.map((m) => (
                  <div key={m.label} className="bg-secondary/50 rounded-md p-3 text-center">
                    <p className="text-base font-bold text-primary">{m.value}</p>
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mt-0.5">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Tech */}
              <div className="flex gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="text-[10px] font-mono text-muted-foreground bg-secondary border border-border rounded px-2 py-0.5">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PortfolioSection;
