import { motion } from "framer-motion";
import SectionHeader from "@/components/sections/SectionHeader";
import TestimonialCard from "@/components/sections/TestimonialCard";

/**
 * TestimonialsSection - Display user testimonials
 */
const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    role: "Nurse Practitioner",
    organization: "Metro General Hospital",
    review:
      "TenaWork found me the perfect position in just 2 weeks. The AI matching was incredibly accurate to my preferences.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Hospital Administrator",
    organization: "City Medical Center",
    review:
      "We reduced our hiring time by 60% using TenaWork. The candidates recommended by the AI are exactly what we need.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Physician",
    organization: "Central Clinic",
    review:
      "The process was seamless, and the matches were highly relevant. I found a role that aligns perfectly with my values.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Testimonials"
          title="What Our Users Say"
          description="Real stories from healthcare professionals and employers"
        />

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <TestimonialCard key={idx} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
