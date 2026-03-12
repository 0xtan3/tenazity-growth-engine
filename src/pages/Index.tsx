import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PillarsSection from "@/components/PillarsSection";
import LabsSection from "@/components/LabsSection";
import TrustSection from "@/components/TrustSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <HeroSection />
    <PillarsSection />
    <LabsSection />
    <TrustSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
