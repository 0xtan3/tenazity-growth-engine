import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, ExternalLink, Globe2, MapPin } from "lucide-react";
import ScrollRevealText from "@/components/ui/ScrollRevealText";
import SparseParticles from "@/components/ui/SparseParticles";

const featuredProducts = [
  {
    category: "Productivity & Deep Work",
    title: "Chrono",
    tagline: "Distraction-Free Focus & Flow Timer",
    description:
      "An ambient focus timer we built for our own deep work sessions. Generative soundscapes, Pomodoro cycles, session tracking, and minimalist keyboard shortcuts.",
    url: "https://chrono.tenazity.com",
    tech: ["React", "TypeScript", "Tailwind CSS", "Web Audio API"],
    highlight: "Live Product",
    gradient: "from-primary/5 via-primary/[0.02] to-transparent",
    domain: "chrono.tenazity.com",
  },
  {
    category: "Studio Operations",
    title: "Forge",
    tagline: "Our Studio Management Platform",
    description:
      "The tool we use to run Tenazity. Client onboarding, milestones, time tracking, invoicing, and project profitability — all in one place.",
    url: "https://forge.tenazity.com",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    highlight: "Live Product",
    gradient: "from-primary/5 via-primary/[0.02] to-transparent",
    domain: "forge.tenazity.com",
  },
];

const globalClients = [
  {
    name: "Madras Kitchen",
    type: "Restaurant & Online Ordering Platform",
    location: "Auckland, New Zealand",
    url: "https://www.madraskitchen.co.nz/",
    domain: "madraskitchen.co.nz",
    deliverables: "Custom web architecture, local SEO engine, and table booking flow",
  },
  {
    name: "Copper Chimney",
    type: "Hospitality Brand & Mobile Experience",
    location: "Christchurch, New Zealand",
    url: "https://www.copperchimney.co.nz/",
    domain: "copperchimney.co.nz",
    deliverables: "Brand portal, high-speed reservation engine, and menu systems",
  },
];

const PortfolioSection = () => {
  return (
    <section id="work" className="py-24 lg:py-32 bg-background relative overflow-hidden border-t border-border/40">
      <SparseParticles />
      {/* Warm glow ambiance */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-[2px] w-12 bg-primary rounded-full" />
              <span className="text-primary text-xs font-semibold tracking-widest uppercase">
                Our Work
              </span>
            </div>
            <ScrollRevealText
              text="Things we've built."
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
              highlightWords={["built."]}
              highlightClass="text-gradient-accent"
            />
          </div>
          <p className="text-muted-foreground text-base font-light leading-relaxed max-w-md md:text-right">
            Live products and client work — built from scratch with clean code and real users.
          </p>
        </div>

        {/* Flagship Product Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 mb-16">
          {featuredProducts.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group block rounded-3xl glass-card backdrop-blur-sm hover:border-primary/40 hover:bg-white/5 transition-all duration-500 overflow-hidden glow-border-wrapper hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 flex flex-col justify-between"
            >
              {/* Top Visual Box */}
              <div className={`relative aspect-[16/10] w-full bg-gradient-to-br ${project.gradient} border-b border-border/40 p-6 sm:p-8 flex flex-col justify-between overflow-hidden`}>
                <div className="flex items-center justify-between z-10">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary glass-card backdrop-blur-md rounded-full px-3 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    {project.highlight}
                  </span>
                  <div className="w-10 h-10 rounded-full glass-card backdrop-blur-md flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 shadow-md">
                    <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Simulated UI Window Preview */}
                <div className="relative z-10 my-auto transform group-hover:scale-105 transition-transform duration-500">
                  <div className="w-full max-w-sm mx-auto glass-card backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden">
                    <div className="h-7 border-b border-border/50 flex items-center px-3 gap-1.5 bg-secondary/80">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/50" />
                      <span className="text-[10px] font-mono text-muted-foreground/70 ml-2">
                        https://{project.domain}/
                      </span>
                    </div>
                    <div className="p-4 sm:p-5 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
                          {project.title}
                        </span>
                        <span className="text-[10px] font-mono bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded">
                          v1.0 Live
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {project.tagline}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Details Box */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1.5">
                    {project.category}
                  </p>
                  <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light mb-6">
                    {project.description}
                  </p>
                </div>

                <div className="flex gap-2 flex-wrap pt-4 border-t border-border/30">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono text-muted-foreground/80 glass-card rounded px-2.5 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Global Client Partnerships Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl p-6 sm:p-8 glass-card backdrop-blur-md"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-border/40">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5 mb-1">
                <Globe2 size={14} /> International Client Work
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-foreground">
                Web platforms shipped for New Zealand brands
              </h4>
            </div>
            <span className="text-xs font-mono text-muted-foreground bg-secondary/40 px-3 py-1.5 rounded-full border border-border/40 shrink-0 self-start md:self-auto">
              Auckland & Christchurch, NZ
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {globalClients.map((client) => (
              <a
                key={client.name}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-xl bg-secondary/10 border border-border/50 hover:border-primary/40 hover:bg-secondary/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h5 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                        {client.name}
                      </h5>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 px-2 py-0.5 rounded">
                        Live Site
                      </span>
                    </div>
                    <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <p className="text-xs text-primary/90 font-medium mb-2">{client.type}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed font-light mb-3">
                    {client.deliverables}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border/30 text-[11px] text-muted-foreground font-mono">
                  <span className="flex items-center gap-1">
                    <MapPin size={11} className="text-primary" /> {client.location}
                  </span>
                  <span className="text-primary underline underline-offset-2 font-medium group-hover:opacity-100">
                    Visit {client.domain}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
