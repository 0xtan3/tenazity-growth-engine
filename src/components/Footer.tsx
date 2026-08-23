import { Github, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => (
  <motion.footer
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.5 }}
    className="border-t border-border/40 py-10"
  >
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-6 h-6 flex items-center justify-center">
              <img 
                src="/tenazity-logo-cropped.png" 
                alt="Tenazity Logo" 
                className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <span className="text-sm font-semibold text-foreground/80 group-hover:text-foreground tracking-tight transition-colors">
              Tenazity
            </span>
          </div>
          <span className="text-xs text-muted-foreground/40">
            © {new Date().getFullYear()}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-muted-foreground/30 mr-2">
            Products
          </span>
          <a
            href="https://forge.tenazity.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground/50 hover:text-foreground transition-colors"
          >
            Forge
          </a>
          <span className="text-muted-foreground/20">·</span>
          <a
            href="https://chrono.tenazity.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground/50 hover:text-foreground transition-colors"
          >
            Chrono
          </a>
        </div>

        <div className="flex items-center gap-4">
          {[
            { icon: Twitter, href: "#", label: "Tenazity on Twitter" },
            { icon: Linkedin, href: "#", label: "Tenazity on LinkedIn" },
            { icon: Github, href: "#", label: "Tenazity on GitHub" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              title={label}
              className="text-muted-foreground/30 hover:text-foreground/60 transition-colors duration-200"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </div>
  </motion.footer>
);

export default Footer;
