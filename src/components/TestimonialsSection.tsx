import { motion } from "framer-motion";
import { Star, Quote, CheckCircle2, Building2, MapPin, ExternalLink } from "lucide-react";
import ScrollRevealText from "@/components/ui/ScrollRevealText";

const testimonials = [
  {
    name: "Senthil Kumar",
    role: "Managing Director",
    company: "Madras Kitchen",
    location: "Auckland, New Zealand",
    website: "https://www.madraskitchen.co.nz/",
    avatar: "SK",
    rating: 5,
    project: "Custom Web Architecture & Digital Menu System",
    quote:
      "Tenazity revamped our digital presence completely. Our online ordering and table booking flow is now lightning-fast, and our local Google search visibility in Auckland skyrocketed within 3 weeks of launch. Transparent communication and spotless execution throughout.",
    tags: ["Restaurant Platform", "Local SEO", "High-Speed UX"],
  },
  {
    name: "Harish Sharma",
    role: "Co-Founder & Operations",
    company: "Copper Chimney",
    location: "Christchurch, New Zealand",
    website: "https://www.copperchimney.co.nz/",
    avatar: "HS",
    rating: 5,
    project: "Brand Portal & Mobile Reservation Engine",
    quote:
      "Working across timezones with Tenazity felt completely effortless. They understood our hospitality brand instantly and shipped a luxury, mobile-optimized website that handles hundreds of daily diner reservations without a hitch. Truly dependable engineers.",
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
      "Most freelancers get lost in scope creep. Akilesh and the Tenazity team scoped our MVP accurately, ran tight 2-day sprint updates, and shipped production-ready TypeScript code in under 3 weeks. They think like technical founders, not just coders.",
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
      "The attention to detail in their UI/UX and micro-interactions is world-class. They translated complex patient data workflows into an intuitive Figma design system, and then built it pixel-for-pixel with zero performance drops.",
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
    project: "B2B SaaS Landing Engine",
    quote:
      "Our conversion rate jumped by 38% after switching to the new landing page Tenazity built. The 60fps animations and instant sub-second load times made an immediate difference in client perception and sales demos.",
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
      "Tenazity is our go-to engineering studio. They deploy robust code, configure automated CI/CD pipelines, and provide thoughtful technical guidance whenever we need to scale backend infrastructure.",
    tags: ["Full-Stack Architecture", "DevOps", "Ongoing Retainer"],
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-secondary/15 relative overflow-hidden border-t border-border/40">
      {/* Background glow atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 w-full max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-primary text-xs font-semibold tracking-widest uppercase">
              Client Proof & Reviews
            </span>
          </div>
          <ScrollRevealText
            text="Trusted by ambitious founders and business owners."
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 justify-center"
            highlightWords={["Trusted", "by", "ambitious", "founders"]}
            highlightClass="text-gradient-accent"
          />
          <p className="text-muted-foreground text-base sm:text-lg font-light max-w-xl mx-auto leading-relaxed">
            Real feedback from companies in New Zealand and India who partnered with us to design, engineer, and scale their digital products.
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
              className="rounded-2xl p-6 sm:p-7 bg-card/60 border border-border/60 backdrop-blur-md hover:border-primary/40 hover:bg-card/90 transition-all duration-300 flex flex-col justify-between glow-border-wrapper shadow-lg hover:-translate-y-1"
            >
              <div>
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded">
                    <CheckCircle2 size={10} /> Verified Client
                  </span>
                </div>

                {/* Project Tag */}
                <div className="text-[11px] font-mono text-primary font-medium mb-3">
                  Scope: {t.project}
                </div>

                {/* Quote Body */}
                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-light mb-6 italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary border border-border/70 flex items-center justify-center font-bold text-xs text-foreground shrink-0 shadow-sm">
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
