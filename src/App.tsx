import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Above-fold — eagerly loaded (critical path, user sees these immediately)
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import MarqueeSection from "./components/MarqueeSection";
import ScrollProgress from "./components/ui/ScrollProgress";

// Below-fold — lazy loaded (not needed until user starts scrolling)
const PillarsSection = lazy(() => import("./components/PillarsSection"));
const ProcessSection = lazy(() => import("./components/ProcessSection"));
const TrustSection = lazy(() => import("./components/TrustSection"));
const PortfolioSection = lazy(() => import("./components/PortfolioSection"));
const TestimonialsSection = lazy(() => import("./components/TestimonialsSection"));
const LabsSection = lazy(() => import("./components/LabsSection"));
const FAQSection = lazy(() => import("./components/FAQSection"));
const ContactSection = lazy(() => import("./components/ContactSection"));
const Footer = lazy(() => import("./components/Footer"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Prevent unnecessary refetches — this is a static marketing site
      staleTime: Infinity,
      gcTime: Infinity,
    },
  },
});

// Lightweight fallback — invisible skeleton that preserves layout space
function SectionFallback() {
  return <div className="min-h-[400px]" aria-hidden="true" />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ScrollProgress />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
                <Header />
                <main>
                  {/* Above fold — eagerly rendered */}
                  <HeroSection />
                  <MarqueeSection />

                  {/* Below fold — lazy loaded as the user approaches */}
                  <Suspense fallback={<SectionFallback />}>
                    <PillarsSection />
                  </Suspense>
                  <Suspense fallback={<SectionFallback />}>
                    <ProcessSection />
                  </Suspense>
                  <Suspense fallback={<SectionFallback />}>
                    <TrustSection />
                  </Suspense>
                  <Suspense fallback={<SectionFallback />}>
                    <PortfolioSection />
                  </Suspense>
                  <Suspense fallback={<SectionFallback />}>
                    <TestimonialsSection />
                  </Suspense>
                  <Suspense fallback={<SectionFallback />}>
                    <LabsSection />
                  </Suspense>
                  <Suspense fallback={<SectionFallback />}>
                    <FAQSection />
                  </Suspense>
                  <Suspense fallback={<SectionFallback />}>
                    <ContactSection />
                  </Suspense>
                </main>
                <Suspense fallback={null}>
                  <Footer />
                </Suspense>
              </div>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route
            path="*"
            element={
              <Suspense fallback={null}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
