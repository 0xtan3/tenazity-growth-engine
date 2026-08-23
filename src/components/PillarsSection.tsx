import { motion } from "framer-motion";
import { PenTool, Code2, Cloud, ArrowUpRight } from "lucide-react";

const pillars = [
  {
    icon: PenTool,
    title: "UI/UX & Prototyping",
    tags: ["Figma", "User Research", "Wireframing"],
    description:
      "We design beautiful, bespoke interfaces that guide users and build trust, visualizing the final product before a single line of code is written.",
    offset: "mt-0",
  },
  {
    icon: Code2,
    title: "Full-Stack Development",
    tags: ["React", "Next.js", "TypeScript", "Node.js"],
    description:
      "We build fast, responsive web applications from scratch. Clean architecture, perfect performance, and seamless front-end experiences.",
    offset: "md:mt-16",
  },
  {
    icon: Cloud,
    title: "Cloud & Architecture",
    tags: ["AWS", "Serverless", "Databases", "APIs"],
    description:
      "We design and deploy scalable backend systems. From custom REST APIs to secure databases, we ensure your product handles high traffic effortlessly.",
    offset: "md:mt-8",
  },
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

const PillarsSection = () => (
  <section id="services" className="py-32 relative overflow-hidden">
    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="mb-20 max-w-2xl"
      >
        <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-4">
          What We Do
        </p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Built for scale, <br/> designed for impact.
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mt-4">
          We handle the entire product lifecycle. By combining bespoke UI/UX design, 
          elite engineering, and robust cloud architectures, we turn complex problems into elegant solutions.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-3 gap-6 lg:gap-8"
      >
        {pillars.map((p) => (
          <motion.div
            key={p.title}
            variants={cardVariant}
            className={`group relative glass-card rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5 ${p.offset}`}
          >
            {/* Subtle glow behind card on hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-xl bg-secondary border border-border/50 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300">
                  <p.icon className="text-muted-foreground group-hover:text-primary transition-colors duration-300" size={24} />
                </div>
                <div className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100">
                  <ArrowUpRight className="text-primary" size={16} />
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4 tracking-tight">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8 font-light">
                {p.description}
              </p>

              <div className="flex gap-2 flex-wrap mt-auto">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-medium tracking-wide text-foreground/60 uppercase bg-background/50 border border-border/40 rounded-full px-3 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default PillarsSection;
