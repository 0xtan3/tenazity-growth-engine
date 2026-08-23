import { motion } from "framer-motion";
import { Hammer, Timer, Wrench, ArrowUpRight } from "lucide-react";

const labs = [
  {
    icon: Hammer,
    name: "Forge",
    description:
      "Our freelance studio OS — project management, time tracking, and invoicing in one clean interface.",
    url: "https://forge.tenazity.com",
    status: "Live",
  },
  {
    icon: Timer,
    name: "Chrono",
    description:
      "A focus timer built for deep work. Clean UI, ambient sounds, and session analytics.",
    url: "https://chrono.tenazity.com",
    status: "Live",
  },
  {
    icon: Wrench,
    name: "More in progress",
    description:
      "We're always building. New tools and experiments are in the pipeline.",
    url: null,
    status: "Coming Soon",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const LabsSection = () => (
  <section id="labs" className="py-24 lg:py-32 relative">
    {/* Subtle background */}
    <div className="absolute inset-0 bg-secondary/20" />

    <div className="relative container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <p className="text-primary text-sm font-medium tracking-wide uppercase mb-3">
          Tenazity Labs
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Built by us, for us.
        </h2>
        <p className="text-muted-foreground mt-3 max-w-lg text-sm leading-relaxed">
          We practice what we preach. These are internal tools we've built to
          solve our own problems — proof that we ship real products.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid sm:grid-cols-3 gap-4"
      >
        {labs.map((item) => {
          const Wrapper = item.url ? "a" : "div";
          const linkProps = item.url
            ? {
                href: item.url,
                target: "_blank" as const,
                rel: "noopener noreferrer",
              }
            : {};

          return (
            <motion.div key={item.name} variants={cardVariant}>
              <Wrapper
                {...linkProps}
                className={`group block bg-card/50 rounded-xl border border-border/50 p-6 transition-all duration-300 h-full ${
                  item.url
                    ? "hover:border-primary/20 hover:bg-card cursor-pointer"
                    : "opacity-60"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center">
                    <item.icon className="text-primary/80" size={18} />
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider rounded-full px-2.5 py-1 ${
                      item.status === "Live"
                        ? "text-emerald-400/80 bg-emerald-400/5 border border-emerald-400/10"
                        : "text-muted-foreground/50 bg-secondary/50 border border-border/30"
                    }`}
                  >
                    {item.status === "Live" && (
                      <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                    {item.status}
                  </span>
                </div>

                <h3 className="text-base font-semibold mb-1.5 flex items-center gap-2">
                  {item.name}
                  {item.url && (
                    <ArrowUpRight
                      className="text-muted-foreground/30 group-hover:text-primary/50 transition-colors"
                      size={14}
                    />
                  )}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </Wrapper>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </section>
);

export default LabsSection;
