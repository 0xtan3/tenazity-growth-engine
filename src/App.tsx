import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import MarqueeSection from "./components/MarqueeSection";
import PillarsSection from "./components/PillarsSection";
import ProcessSection from "./components/ProcessSection";
import TrustSection from "./components/TrustSection";
import PortfolioSection from "./components/PortfolioSection";
import TestimonialsSection from "./components/TestimonialsSection";
import LabsSection from "./components/LabsSection";
import FAQSection from "./components/FAQSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ui/ScrollProgress";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ScrollProgress />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
              <Header />
              <main>
                <HeroSection />
                <MarqueeSection />
                <PillarsSection />
                <ProcessSection />
                <TrustSection />
                <PortfolioSection />
                <TestimonialsSection />
                <LabsSection />
                <FAQSection />
                <ContactSection />
              </main>
              <Footer />
            </div>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
