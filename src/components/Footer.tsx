import { Github, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => (
  <footer className="relative bg-background overflow-hidden">
    {/* Ember trail animated divider */}
    <div className="ember-trail w-full" />

    <div className="border-t border-border/40 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-6"
          >
            <a href="#" className="flex items-center gap-2.5 group cursor-pointer">
              <div className="w-6 h-6 flex items-center justify-center">
                <img 
                  src="/tenazity-logo-cropped.png" 
                  alt="Tenazity Logo" 
                  className="w-full h-full object-contain opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                />
              </div>
              <span className="text-sm font-semibold text-foreground/80 group-hover:text-foreground tracking-tight transition-colors">
                Tenazity
              </span>
            </a>
            <span className="text-xs text-muted-foreground/40 font-mono">
              © {new Date().getFullYear()} All rights reserved.
            </span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground/40 font-mono mr-2">
              Labs
            </span>
            <a
              href="https://forge.tenazity.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground/60 hover:text-primary transition-colors duration-200"
            >
              Forge
            </a>
            <span className="text-muted-foreground/20">·</span>
            <a
              href="https://chrono.tenazity.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground/60 hover:text-primary transition-colors duration-200"
            >
              Chrono
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            {[
              { icon: Twitter, href: "https://twitter.com/tenazity", label: "Tenazity on Twitter" },
              { icon: Linkedin, href: "https://linkedin.com/company/tenazity", label: "Tenazity on LinkedIn" },
              { icon: Github, href: "https://github.com/tenazity", label: "Tenazity on GitHub" },
            ].map(({ icon: Icon, href, label }, idx) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 rounded-full border border-border/40 flex items-center justify-center text-muted-foreground/50 hover:text-primary hover:border-primary/40 bg-secondary/20 transition-colors duration-200"
              >
                <Icon size={14} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
