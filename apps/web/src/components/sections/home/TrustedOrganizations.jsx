import { motion } from "framer-motion";
import SectionHeader from "@/components/sections/SectionHeader";
import Logo from "@/components/sections/Logo";

/**
 * TrustedOrganizations - Display logos of healthcare organizations
 */
const organizations = [
  "Hospital",
  "Clinic",
  "NGO",
  "HealthCenter",
  "University",
];

export default function TrustedOrganizations() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Trusted By"
          title="Leading Healthcare Organizations"
          description="Join thousands of healthcare professionals and institutions using TenaWork"
        />

        <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-5">
          {organizations.map((org, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex items-center justify-center rounded-lg bg-neutral-50 p-6 hover:bg-neutral-100"
            >
              <Logo name={org} className="h-16 w-auto text-neutral-600" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
