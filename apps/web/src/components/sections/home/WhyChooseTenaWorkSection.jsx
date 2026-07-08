import { motion } from "framer-motion";
import {
  Brain,
  Stethoscope,
  Clock,
  Users,
  TrendingUp,
  Shield,
} from "lucide-react";
import SectionHeader from "@/components/sections/SectionHeader";
import FeatureCard from "@/components/sections/FeatureCard";

/**
 * WhyChooseTenaWorkSection - Benefits and value propositions
 */
const benefits = [
  {
    icon: Brain,
    title: "AI Powered",
    description: "Machine learning algorithms find perfect matches instantly.",
  },
  {
    icon: Stethoscope,
    title: "Healthcare Specialized",
    description: "Built by healthcare experts for healthcare professionals.",
  },
  {
    icon: Clock,
    title: "Fast Hiring",
    description: "Reduce time-to-hire from weeks to days.",
  },
  {
    icon: Users,
    title: "Trusted Organizations",
    description: "Connect with leading healthcare institutions.",
  },
  {
    icon: TrendingUp,
    title: "Better Career Growth",
    description: "Find roles aligned with your professional goals.",
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Your data is protected with enterprise-grade security.",
  },
];

export default function WhyChooseTenaWorkSection() {
  return (
    <section className="bg-neutral-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Why Choose TenaWork"
          title="The Benefits of AI-Powered Matching"
          description="Experience the difference of intelligent recruitment"
        />

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, idx) => (
            <FeatureCard
              key={idx}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
