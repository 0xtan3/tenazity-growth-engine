import { Github, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => (
  <motion.footer
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.6 }}
    className="border-t border-border py-12"
  >
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-sm text-muted-foreground"
      >
        © {new Date().getFullYear()} <span className="text-foreground font-semibold">Tenazity</span>. All rights reserved.
      </motion.div>
      <div className="flex items-center gap-6">
        {[
          { icon: Twitter, href: "#" },
          { icon: Linkedin, href: "#" },
          { icon: Github, href: "#" },
        ].map(({ icon: Icon, href }, i) => (
          <motion.a
            key={i}
            href={href}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Icon size={18} />
          </motion.a>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-xs font-mono text-muted-foreground/50"
      >
        Built by Tenazity
      </motion.p>
    </div>
  </motion.footer>
);

export default Footer;
