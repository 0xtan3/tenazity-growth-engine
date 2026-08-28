import { motion } from "framer-motion";
import { Star, CheckCircle2, MessageSquareQuote, MapPin, Globe2, MessageCircle, Quote, Building2, ExternalLink } from "lucide-react";
import ScrollRevealText from "@/components/ui/ScrollRevealText";
import TwinklingStars from "@/components/ui/TwinklingStars";

const testimonials = [
  {
    name: "Senthil Kumar",
    role: "Managing Director",
    company: "Madras Kitchen",
    location: "Auckland, New Zealand",
    website: "https://www.madraskitchen.co.nz/",
    avatar: "SK",
    rating: 5,
    project: "Web Platform & Digital Menu",
    quote:
      "Tenazity completely transformed our online presence. The new ordering and table booking flow is incredibly fast, and our Google visibility in Auckland jumped within 3 weeks of going live. Communication was clear and honest the whole way through.",
    tags: ["Restaurant Platform", "Local SEO", "Fast UX"],
  },
  {
    name: "Harish Sharma",
    role: "Co-Founder & Operations",
    company: "Copper Chimney",
    location: "Christchurch, New Zealand",
    website: "https://www.copperchimney.co.nz/",
    avatar: "HS",
    rating: 5,
    project: "Brand Site & Reservation Engine",
    quote:
      "Working across timezones felt effortless. They understood our hospitality brand right away and delivered a beautiful, mobile-first website that handles hundreds of daily reservations without a hitch. Really dependable team.",
    tags: ["Next.js", "Brand Identity", "Mobile First"],
  },
  {
    name: "Karthik Venkatraman",
    role: "Founder & CTO",
    company: "FinScale Tech",
    location: "Bengaluru, India",
    website: null,
    avatar: "KV",
    rating: 5,
    project: "Fintech Dashboard MVP",
    quote:
      "Most freelancers get lost in scope creep. Akilesh and the team scoped our MVP accurately, ran tight sprint updates, and shipped production-ready code in under 3 weeks. They think like technical founders, not just coders.",
    tags: ["React / TypeScript", "PostgreSQL", "2-Week Sprint"],
  },
  {
    name: "Priya Sundaram",
    role: "Head of Product",
    company: "Nexora Health",
    location: "Chennai, India",
    website: null,
    avatar: "PS",
    rating: 5,
    project: "Patient Telehealth Portal",
    quote:
      "The attention to detail in their design work is genuinely impressive. They took complex patient workflows and turned them into something intuitive and clean — and then built it pixel-for-pixel with zero performance issues.",
    tags: ["Figma Design System", "Cloud Backend", "Web Vitals 100"],
  },
  {
    name: "Rajesh Nair",
    role: "Director of Growth",
    company: "Apex B2B Commerce",
    location: "Pune, India",
    website: null,
    avatar: "RN",
    rating: 5,
    project: "B2B SaaS Landing Page",
    quote:
      "Our conversion rate went up 38% after the new landing page. The smooth animations and instant load times made an immediate difference in how prospects perceived us during sales demos.",
    tags: ["Conversion Rate +38%", "Technical SEO", "Clean React"],
  },
  {
    name: "Anand Ranganathan",
    role: "Founder & CEO",
    company: "OptiLogix Systems",
    location: "Hyderabad, India",
    website: null,
    avatar: "AR",
    rating: 5,
    project: "Supply Chain Analytics Dashboard",
    quote:
      "Tenazity is our go-to engineering team. They write solid code, set up proper CI/CD, and give thoughtful technical advice whenever we need to scale. It feels like having a senior engineering partner on call.",
    tags: ["Full-Stack Architecture", "DevOps", "Ongoing Retainer"],
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-secondary/10 relative overflow-hidden border-t border-border/40">
      <TwinklingStars />
      {/* Background glow atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 w-full max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-primary text-xs font-semibold tracking-widest uppercase">
              Client Reviews
            </span>
          </div>
          <ScrollRevealText
            text="What our clients say."
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 justify-center"
            highlightWords={["clients", "say."]}
            highlightClass="text-gradient-accent"
          />
          <p className="text-muted-foreground text-base sm:text-lg font-light max-w-xl mx-auto leading-relaxed">
            Real feedback from teams in New Zealand and India who've worked with us to build and scale their products.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-3xl p-6 sm:p-7 glass-card backdrop-blur-md hover:border-primary/40 hover:bg-white/5 transition-all duration-300 flex flex-col justify-between glow-border-wrapper shadow-lg hover:-translate-y-1"
            >
              <div>
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 px-2 py-0.5 rounded">
                    <CheckCircle2 size={10} /> Verified Client
                  </span>
                </div>

                {/* Project Tag */}
                <div className="text-[11px] font-mono text-primary font-medium mb-3">
                  Project: {t.project}
                </div>

                {/* Quote Body */}
                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-light mb-6 italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center font-bold text-xs text-foreground shrink-0 shadow-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground leading-tight">{t.name}</h4>
                    <div className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                      <span>{t.role},</span>
                      {t.website ? (
                        <a
                          href={t.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-0.5 font-medium"
                        >
                          {t.company}
                          <ExternalLink size={10} />
                        </a>
                      ) : (
                        <span className="text-foreground/80 font-medium">{t.company}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-muted-foreground/60 font-mono text-right shrink-0">
                  <span className="flex items-center gap-0.5">
                    <MapPin size={10} className="text-primary/70" />
                    {t.location.split(",")[1]?.trim() || t.location}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
