import { Navbar } from "@/components/Navbar";
import { MarqueeSection } from "@/components/MarqueeSection";
import { HeroSection } from "@/components/HeroSection";
import { VoiceFirstSection } from "@/components/VoiceFirstSection";
import { WorkflowCanvasSection } from "@/components/WorkflowCanvasSection";
import { VisualProgrammingSection } from "@/components/VisualProgrammingSection";
import { FormsSection } from "@/components/FormsSection";
import { VendorManagementSection } from "@/components/VendorManagementSection";
import { SolutionsSection } from "@/components/SolutionsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:text-sm">
        Skip to main content
      </a>

      <Navbar />
      
      {/* Spacer for fixed nav */}
      <div className="h-[var(--nav-height)]" />
      
      <main id="main-content">
        <MarqueeSection />
        <HeroSection />
        <VoiceFirstSection />
        <WorkflowCanvasSection />
        <VisualProgrammingSection />
        <FormsSection />
        <VendorManagementSection />
        <SolutionsSection />
        <CTASection />
      </main>

      <Footer />
      
      {/* AI Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
};

export default Index;
