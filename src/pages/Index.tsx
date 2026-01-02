import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { ImpactCounter } from "@/components/home/ImpactCounter";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WasteTypesSection } from "@/components/home/WasteTypesSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ImpactCounter />
        <HowItWorks />
        <WasteTypesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
