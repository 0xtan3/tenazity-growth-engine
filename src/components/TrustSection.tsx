import { motion } from "framer-motion";
import { Shield, Zap, Palette, Terminal, Server, ArrowRight } from "lucide-react";
import { useState } from "react";

const values = [
  {
    icon: Zap,
    title: "Performance & SEO First",
    description:
      "Every custom web app is optimized for speed and technical SEO. Fast load times, smooth interactions, and clean React code that scales effortlessly.",
  },
  {
    icon: Palette,
    title: "Premium UI/UX Design",
    description:
      "We don't just make things look good — we design bespoke interfaces that guide users, build trust, and drive conversions for your freelance or agency business.",
  },
  {
    icon: Server,
    title: "Scalable Architecture",
    description:
      "We build backend systems designed to grow with you. From database design to serverless APIs, our architecture handles high traffic with ease.",
  },
  {
    icon: Terminal,
    title: "Modern Tech Stack",
    description:
      "React, Next.js, TypeScript, Go, Python, Node — our web developers use battle-tested tools and stay current with industry standards.",
  },
];

const techStack = [
  "React",
  "TypeScript",
  "Next.js",
  "Tailwind CSS",
  "Go",
  "Python",
  "FastAPI",
  "Docker",
  "PostgreSQL",
  "Framer Motion",
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariant = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const TrustSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 lg:py-32 bg-secondary/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-[0.02] mix-blend-overlay pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column - Sticky Header */}
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
              >
                <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-4">
                  Our Approach
                </p>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                  Why work<br/> with us.
                </h2>
                <p className="text-muted-foreground text-base font-light leading-relaxed mb-8">
                  We treat every project as if it were our own startup. No cutting corners, no generic templates. Just premium engineering and thoughtful design.
                </p>
                <a 
                  href="#contact" 
                  className="inline-flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors group"
                >
                  Start a conversation
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </div>
          </div>

          {/* Right Column - Staggered List */}
          <div className="lg:w-2/3">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col"
            >
              {values.map((v, index) => (
                <motion.div
                  key={v.title}
                  variants={itemVariant}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`group relative p-8 border-b border-border/40 transition-colors duration-500 cursor-default ${
                    hoveredIndex !== null && hoveredIndex !== index ? 'opacity-40' : 'opacity-100'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none -z-10" />
                  
                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 sm:items-center">
                    <div className="w-12 h-12 rounded-2xl bg-card border border-border/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/30 group-hover:text-primary transition-all duration-500 ease-[0.25,0.46,0.45,0.94]">
                      <v.icon className="text-muted-foreground group-hover:text-primary transition-colors duration-500" size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 tracking-tight">{v.title}</h3>
                      <p className="text-muted-foreground text-sm font-light leading-relaxed max-w-xl">
                        {v.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Tech Stack Marquee (Bottom) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-32 border-t border-border/40 pt-16"
        >
          <p className="text-center text-[10px] font-semibold text-muted-foreground/40 uppercase tracking-widest mb-10">
            Powered by modern technologies
          </p>

          <div className="overflow-hidden relative max-w-5xl mx-auto">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-10" />
            <div className="flex marquee opacity-60 hover:opacity-100 transition-opacity duration-500">
              {[...techStack, ...techStack].map((tech, i) => (
                <div
                  key={`${tech}-${i}`}
                  className="flex-shrink-0 mx-8 flex items-center justify-center"
                >
                  <span className="text-lg font-bold text-muted-foreground/30 whitespace-nowrap tracking-tight">
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
};

export default TrustSection;
