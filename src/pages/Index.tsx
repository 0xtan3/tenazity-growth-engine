import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PillarsSection from "@/components/PillarsSection";
import PortfolioSection from "@/components/PortfolioSection";
import LabsSection from "@/components/LabsSection";
import TrustSection from "@/components/TrustSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PillarsSection />
        <PortfolioSection />
        <LabsSection />
        <TrustSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
