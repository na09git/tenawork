import SectionHeader from "@/components/sections/SectionHeader";
import FAQAccordion from "@/components/sections/FAQAccordion";

/**
 * FAQSection - Frequently asked questions
 */
const faqItems = [
  {
    question: "How does AI matching work?",
    answer:
      "Our AI analyzes your profile, preferences, and experience to find healthcare positions that match your skills and career goals. We use machine learning to understand both candidate and job requirements.",
  },
  {
    question: "Is registration free?",
    answer:
      "Yes, TenaWork is completely free for healthcare professionals to use. Employers enjoy a free trial period, with optional premium features available.",
  },
  {
    question: "Who can use TenaWork?",
    answer:
      "Healthcare professionals including doctors, nurses, therapists, and other medical staff can join as professionals. Healthcare institutions, hospitals, clinics, and NGOs can register as employers.",
  },
  {
    question: "How accurate are the recommendations?",
    answer:
      "Our AI has a 92% match accuracy rate based on user satisfaction surveys. The more detailed information you provide, the better our recommendations become.",
  },
  {
    question: "Can employers contact candidates?",
    answer:
      "Yes, once you receive a match, you can contact the candidate directly through the platform. We provide secure messaging and contact options.",
  },
];

export default function FAQSection() {
  return (
    <section className="bg-neutral-50 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="FAQ"
          title="Frequently Asked Questions"
          description="Find answers to common questions about TenaWork"
        />

        <div className="mt-12">
          <FAQAccordion items={faqItems} />
        </div>
      </div>
    </section>
  );
}
