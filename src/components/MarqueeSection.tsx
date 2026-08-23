import { motion } from "framer-motion";
import { Workflow, Laptop, Smartphone, LineChart, Code2, Shield, Database, Cpu } from "lucide-react";

const capabilities = [
  { name: "Fintech Platforms", icon: LineChart },
  { name: "SaaS MVPs", icon: Laptop },
  { name: "E-Commerce", icon: Smartphone },
  { name: "Enterprise Security", icon: Shield },
  { name: "Custom API & Backends", icon: Database },
  { name: "AI Integrations", icon: Cpu },
  { name: "Web3 Interfaces", icon: Code2 },
  { name: "B2B Dashboards", icon: Workflow },
];

const MarqueeSection = () => {
  return (
    <section className="py-12 border-y border-border/40 overflow-hidden bg-background relative flex items-center">
      {/* Gradient masks for smooth fading at edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-background to-transparent z-10" />

      {/* Infinite scrolling container */}
      <div className="flex whitespace-nowrap will-change-transform animate-marquee hover:[animation-play-state:paused]">
        {/* We map the array twice to create an infinite scroll illusion */}
        {[...capabilities, ...capabilities, ...capabilities].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-8 group cursor-default"
          >
            <item.icon size={18} className="text-muted-foreground/40 group-hover:text-primary transition-colors duration-300" />
            <span className="text-lg font-medium text-foreground/50 group-hover:text-foreground transition-colors duration-300">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MarqueeSection;
