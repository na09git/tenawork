import HeroSection from "@/components/sections/home/HeroSection";
import TrustedOrganizations from "@/components/sections/home/TrustedOrganizations";
import FeaturesSection from "@/components/sections/home/FeaturesSection";
import HowItWorksSection from "@/components/sections/home/HowItWorksSection";
import WhyChooseTenaWorkSection from "@/components/sections/home/WhyChooseTenaWorkSection";
import StatisticsSection from "@/components/sections/home/StatisticsSection";
import TestimonialsSection from "@/components/sections/home/TestimonialsSection";
import FAQSection from "@/components/sections/home/FAQSection";
import FinalCTASection from "@/components/sections/home/FinalCTASection";
import Footer from "@/components/sections/Footer";

/**
 * Home - Landing page with all sections
 */
export default function Home() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      {/* <TrustedOrganizations /> */}
      <FeaturesSection />
      <HowItWorksSection />
      <WhyChooseTenaWorkSection />
      <StatisticsSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}
