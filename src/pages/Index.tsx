import { Navbar } from "@/components/Navbar";
import { MarqueeSection } from "@/components/MarqueeSection";
import { HeroSection } from "@/components/HeroSection";
import { VisualProgrammingSection } from "@/components/VisualProgrammingSection";
import { FormsSection } from "@/components/FormsSection";
import { SolutionsSection } from "@/components/SolutionsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Spacer for fixed nav */}
      <div className="h-[60px]" />
      
      <MarqueeSection />
      <HeroSection />
      <VisualProgrammingSection />
      <FormsSection />
      <SolutionsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
