import { motion } from "framer-motion";
import { Hammer, Timer, Wrench, ArrowUpRight, Sparkles } from "lucide-react";
import ScrollRevealText from "@/components/ui/ScrollRevealText";

const labs = [
  {
    icon: Hammer,
    name: "Forge",
    description:
      "Our freelance studio OS — complete project management, automated invoicing, milestone tracking, and client portals in one cohesive platform.",
    url: "https://forge.tenazity.com",
    status: "Live",
  },
  {
    icon: Timer,
    name: "Chrono",
    description:
      "A distraction-free focus timer built for deep work. Ambient soundscapes, session analytics, and minimalist keyboard shortcuts.",
    url: "https://chrono.tenazity.com",
    status: "Live",
  },
];

const LabsSection = () => {
  return (
    <section id="labs" className="py-24 lg:py-32 relative overflow-hidden bg-secondary/10 border-t border-border/40">
      <div className="relative container mx-auto px-4 z-10">
        <div className="mb-16 max-w-xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-[2px] w-12 bg-primary rounded-full" />
            <span className="text-primary text-xs font-semibold tracking-widest uppercase">
              Tenazity Labs
            </span>
          </div>
          <ScrollRevealText
            text="Built by us, for us."
            className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3"
            highlightWords={["Built", "by", "us,"]}
            highlightClass="text-gradient-accent"
          />
          <p className="text-muted-foreground max-w-lg text-sm sm:text-base leading-relaxed font-light">
            We practice what we preach. These are proprietary products and experiments we build internally to solve our own workflows — proof that we ship real-world products.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {labs.map((item, index) => {
            const Wrapper = item.url ? motion.a : motion.div;
            const linkProps = item.url
              ? {
                  href: item.url,
                  target: "_blank" as const,
                  rel: "noopener noreferrer",
                }
              : {};

            return (
              <Wrapper
                key={item.name}
                {...linkProps}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className={`group block bg-card/60 backdrop-blur-md rounded-2xl border border-border/60 p-6 transition-all duration-300 h-full glow-border-wrapper flex flex-col justify-between ${
                  item.url
                    ? "hover:border-primary/40 hover:bg-card/90 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer"
                    : "opacity-75 cursor-default"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center group-hover:scale-105 group-hover:bg-primary/20 transition-all duration-300">
                      <item.icon className="text-primary" size={22} />
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider rounded-full px-3 py-1 ${
                        item.status === "Live"
                          ? "text-emerald-400 bg-emerald-400/10 border border-emerald-400/25 shadow-sm"
                          : "text-muted-foreground/80 bg-secondary/70 border border-border/40"
                      }`}
                    >
                      {item.status === "Live" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      )}
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2 tracking-tight text-foreground">
                    {item.name}
                    {item.url && (
                      <ArrowUpRight
                        className="text-muted-foreground/40 group-hover:text-primary transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        size={18}
                      />
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LabsSection;
