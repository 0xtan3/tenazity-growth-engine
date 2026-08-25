import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Palette, Terminal, Server, ArrowRight, ShieldCheck } from "lucide-react";
import ScrollRevealText from "@/components/ui/ScrollRevealText";

const values = [
  {
    icon: Zap,
    title: "Performance & SEO First",
    description:
      "Every custom web app is optimized for speed and technical SEO. Sub-second load times, smooth 60fps interactions, and clean React code that scales effortlessly.",
  },
  {
    icon: Palette,
    title: "Premium UI/UX Design",
    description:
      "We don't just make things look good — we design bespoke interfaces that guide users, establish deep trust, and drive high-converting actions for your business.",
  },
  {
    icon: Server,
    title: "Scalable Cloud Architecture",
    description:
      "We build backend systems engineered to grow with you. From resilient PostgreSQL schemas to serverless APIs, our architecture handles high traffic with ease.",
  },
  {
    icon: Terminal,
    title: "Modern Battle-Tested Stack",
    description:
      "React, Next.js, TypeScript, Go, Python, Node, Tailwind CSS — our developers use battle-tested tools and stay current with industry-leading standards.",
  },
];

const techStack = [
  "React",
  "TypeScript",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "Docker",
  "Framer Motion",
  "AWS",
  "GraphQL",
];

const TrustSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 lg:py-32 bg-secondary/10 relative overflow-hidden border-t border-border/40">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left Column - Sticky Header */}
          <div className="lg:w-1/3">
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-[2px] w-12 bg-primary rounded-full" />
                <span className="text-primary text-xs font-semibold tracking-widest uppercase">
                  Our Philosophy
                </span>
              </div>
              <ScrollRevealText
                text="Why ambitious founders work with us."
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6"
                highlightWords={["work", "with", "us."]}
                highlightClass="text-gradient-accent"
              />
              <p className="text-muted-foreground text-base font-light leading-relaxed mb-8">
                We treat every project as if it were our own startup. No cutting corners, no generic templates. Just obsessive craft, high-speed execution, and clean code.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group cursor-pointer"
              >
                Schedule an intro call
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column - Value Items */}
          <div className="lg:w-2/3">
            <div className="flex flex-col divide-y divide-border/40">
              {values.map((v, index) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`group relative p-6 sm:p-8 transition-all duration-300 rounded-xl cursor-default ${
                    hoveredIndex !== null && hoveredIndex !== index ? "opacity-50" : "opacity-100"
                  } ${hoveredIndex === index ? "bg-card/40 shadow-lg" : ""}`}
                >
                  <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 sm:items-center">
                    <div className="w-12 h-12 rounded-2xl bg-card border border-border/60 flex items-center justify-center shrink-0 group-hover:bg-primary/15 group-hover:border-primary/40 group-hover:shadow-[0_0_16px_hsl(15_90%_55%/0.2)] transition-all duration-300">
                      <v.icon className="text-muted-foreground group-hover:text-primary transition-colors duration-300" size={22} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1.5 tracking-tight group-hover:text-primary transition-colors">
                        {v.title}
                      </h3>
                      <p className="text-muted-foreground text-sm font-light leading-relaxed max-w-xl">
                        {v.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack Marquee */}
        <div className="mt-24 border-t border-border/40 pt-14">
          <p className="text-center text-xs font-semibold text-muted-foreground/60 uppercase tracking-widest mb-8">
            Engineered with modern, industry-standard technologies
          </p>

          <div className="overflow-hidden relative max-w-5xl mx-auto">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />
            <div className="flex marquee opacity-70 hover:opacity-100 transition-opacity duration-300">
              {[...techStack, ...techStack].map((tech, i) => (
                <div
                  key={`${tech}-${i}`}
                  className="shrink-0 mx-6 sm:mx-8 flex items-center justify-center"
                >
                  <span className="text-base sm:text-lg font-bold text-muted-foreground/50 hover:text-primary whitespace-nowrap tracking-tight transition-colors cursor-default">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
