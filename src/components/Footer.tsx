import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} <span className="text-foreground font-semibold">Tenazity</span>. All rights reserved.
      </div>
      <div className="flex items-center gap-6">
        {[
          { icon: Twitter, href: "#" },
          { icon: Linkedin, href: "#" },
          { icon: Github, href: "#" },
        ].map(({ icon: Icon, href }, i) => (
          <a key={i} href={href} className="text-muted-foreground hover:text-primary transition-colors">
            <Icon size={18} />
          </a>
        ))}
      </div>
      <p className="text-xs font-mono text-muted-foreground/50">Built by Tenazity</p>
    </div>
  </footer>
);

export default Footer;
