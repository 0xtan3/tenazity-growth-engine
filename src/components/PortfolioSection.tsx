import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    category: "Productivity",
    title: "Chrono",
    description:
      "A distraction-free focus timer designed to help you stay in flow. Clean interface, ambient soundscapes, and session tracking.",
    url: "https://chrono.tenazity.com",
    tech: ["React", "TypeScript", "Framer Motion"],
    highlight: "Live Product",
    color: "from-violet-500/20 to-purple-500/5",
  },
  {
    category: "Studio OS",
    title: "Forge",
    description:
      "A freelance studio operating system — manage projects, track time, handle invoicing, and streamline creative workflows.",
    url: "https://forge.tenazity.com",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    highlight: "Live Product",
    color: "from-indigo-500/20 to-blue-500/5",
  }
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const PortfolioSection = () => (
  <section id="work" className="py-24 lg:py-32">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
      >
        <div className="max-w-2xl">
          <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-4">
            Our Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Selected projects.
          </h2>
        </div>
        <p className="text-muted-foreground text-lg font-light leading-relaxed max-w-md md:text-right">
          We don't just build for clients — we build for ourselves too. 
          Live products designed and shipped by Tenazity.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-2 gap-8 lg:gap-12"
      >
        {projects.map((project, index) => (
          <motion.a
            key={project.title}
            variants={cardVariant}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group block w-full ${index % 2 !== 0 ? "md:mt-16" : ""}`} // Asymmetric stagger
          >
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-card border border-border/50">
              {/* Animated abstract background simulating a product shot */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-50 group-hover:opacity-100 transition-opacity duration-700`} />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-[0.03] mix-blend-overlay" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 transition-transform duration-700 group-hover:scale-105">
                <span className="text-5xl font-bold text-foreground/90 tracking-tight drop-shadow-sm mb-4">
                  {project.title}
                </span>
                
                {/* Simulated UI Window */}
                <div className="w-full max-w-sm h-32 bg-background/80 backdrop-blur-md border border-border/50 rounded-lg shadow-2xl overflow-hidden translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[0.25,0.46,0.45,0.94] delay-100 flex flex-col">
                  <div className="h-6 border-b border-border/50 flex items-center px-3 gap-1.5 bg-secondary/50">
                    <div className="w-2 h-2 rounded-full bg-border" />
                    <div className="w-2 h-2 rounded-full bg-border" />
                    <div className="w-2 h-2 rounded-full bg-border" />
                  </div>
                  <div className="flex-1 p-4 flex flex-col gap-3">
                    <div className="h-2 w-1/3 bg-border/50 rounded-full" />
                    <div className="h-2 w-3/4 bg-border/30 rounded-full" />
                    <div className="h-2 w-1/2 bg-border/30 rounded-full" />
                  </div>
                </div>
              </div>

              {/* View button overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-[0.25,0.46,0.45,0.94] shadow-xl">
                <ArrowUpRight size={24} />
              </div>

              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-primary/80 bg-background/80 backdrop-blur-md border border-border/50 rounded-full px-3 py-1">
                  <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                  {project.highlight}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-2">
                  {project.category}
                </p>
                <h3 className="text-xl font-bold">{project.title}</h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3 max-w-sm font-light">
              {project.description}
            </p>
            
            <div className="flex gap-2 flex-wrap mt-4">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-[10px] text-muted-foreground/60 font-mono bg-secondary/30 rounded px-2 py-1"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  </section>
);

export default PortfolioSection;
