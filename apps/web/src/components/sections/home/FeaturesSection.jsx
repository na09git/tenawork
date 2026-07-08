import { Sparkles, Search, Zap, Lock, Heart, UserCheck } from "lucide-react";
import SectionHeader from "@/components/sections/SectionHeader";
import FeatureCard from "@/components/sections/FeatureCard";

/**
 * FeaturesSection - Showcase key platform features
 */
const features = [
  {
    icon: Sparkles,
    title: "AI Job Matching",
    description:
      "Advanced AI analyzes your profile to find the most compatible positions.",
  },
  {
    icon: Search,
    title: "Smart Candidate Search",
    description:
      "Find ideal candidates for your healthcare positions instantly.",
  },
  {
    icon: Zap,
    title: "Fast Recommendations",
    description: "Get top matches within seconds, not days.",
  },
  {
    icon: Lock,
    title: "Secure Platform",
    description: "Enterprise-grade security protects your sensitive data.",
  },
  {
    icon: Heart,
    title: "Healthcare Focused",
    description:
      "Built specifically for healthcare professionals and institutions.",
  },
  {
    icon: UserCheck,
    title: "Personalized Matching",
    description: "Preferences and values ensure perfect fit matches.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-neutral-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Features"
          title="Why TenaWork Leads the Industry"
          description="Discover the features that make us the preferred platform for healthcare recruitment"
        />

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
