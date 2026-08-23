import { motion } from "framer-motion";
import { Search, PenTool, Code, Rocket } from "lucide-react";

const processSteps = [
  {
    step: "01",
    title: "Discovery & Strategy",
    description: "We dive deep into your business goals, target audience, and technical requirements to architect a scalable solution.",
    icon: Search,
  },
  {
    step: "02",
    title: "Design & Prototyping",
    description: "We craft bespoke, conversion-optimized UI/UX designs and interactive prototypes to visualize the final product.",
    icon: PenTool,
  },
  {
    step: "03",
    title: "Agile Development",
    description: "Our engineers build your product using modern, battle-tested frameworks, delivering fast iterations and clean code.",
    icon: Code,
  },
  {
    step: "04",
    title: "Launch & Maintenance",
    description: "We deploy your product to production and handle the infrastructure. We stay by your side to ensure your product runs smoothly.",
    icon: Rocket,
  },
];

const ProcessSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-background border-t border-border/40 relative">
      <div className="absolute inset-0 bg-secondary/5 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-16 md:mb-24"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-12 h-[1px] bg-primary" />
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">How We Work</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            A proven process for predictable excellence.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-border/60" />

          {processSteps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative group"
            >
              <div className="w-16 h-16 rounded-full bg-background border border-border/50 flex items-center justify-center relative z-10 mb-8 group-hover:border-primary/50 group-hover:bg-primary/5 transition-colors duration-300">
                <item.icon size={24} className="text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
                  {item.step}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
