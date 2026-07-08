import PageHero from "@/components/sections/PageHero";
import Footer from "@/components/sections/Footer";

/**
 * Terms - Terms and conditions page
 */
export default function Terms() {
  return (
    <div>
      <PageHero
        title="Terms & Conditions"
        description="Please read these terms carefully"
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-neutral max-w-none space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                1. Agreement to Terms
              </h2>
              <p className="mt-4 text-neutral-600">
                By accessing and using TenaWork, you accept and agree to be
                bound by the terms and provision of this agreement. If you do
                not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                2. User Responsibilities
              </h2>
              <p className="mt-4 text-neutral-600">Users agree to:</p>
              <ul className="mt-4 list-inside list-disc space-y-2 text-neutral-600">
                <li>Provide accurate and complete information</li>
                <li>Maintain the confidentiality of account credentials</li>
                <li>Not engage in unlawful or fraudulent activities</li>
                <li>Not harassment, discrimination, or abuse other users</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                3. Healthcare Professional Responsibilities
              </h2>
              <p className="mt-4 text-neutral-600">
                Healthcare professionals agree to:
              </p>
              <ul className="mt-4 list-inside list-disc space-y-2 text-neutral-600">
                <li>
                  Provide truthful information about qualifications and
                  experience
                </li>
                <li>
                  Maintain current professional licenses and certifications
                </li>
                <li>Respond professionally to employer inquiries</li>
                <li>Not misrepresent credentials or experience</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                4. Employer Responsibilities
              </h2>
              <p className="mt-4 text-neutral-600">Employers agree to:</p>
              <ul className="mt-4 list-inside list-disc space-y-2 text-neutral-600">
                <li>Post accurate and complete job descriptions</li>
                <li>Treat candidates with respect and professionalism</li>
                <li>Provide legitimate healthcare positions</li>
                <li>Comply with employment laws and regulations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                5. AI Recommendation Disclaimer
              </h2>
              <p className="mt-4 text-neutral-600">
                TenaWork's AI matching system provides recommendations based on
                available information. These recommendations are not guarantees
                of job suitability or candidate qualification. Both
                professionals and employers are responsible for conducting
                thorough evaluation and due diligence before making employment
                decisions.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                6. Limitation of Liability
              </h2>
              <p className="mt-4 text-neutral-600">
                TenaWork is provided on an "as-is" basis. We do not guarantee
                the accuracy, reliability, or suitability of matches. We are not
                liable for any direct, indirect, incidental, or consequential
                damages arising from your use of our platform.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                7. Intellectual Property
              </h2>
              <p className="mt-4 text-neutral-600">
                All content, features, and functionality of TenaWork are owned
                by TenaWork, its licensors, or other providers of such material
                and are protected by copyright and other intellectual property
                laws.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                8. Termination
              </h2>
              <p className="mt-4 text-neutral-600">
                We may terminate or suspend access to our service immediately,
                without prior notice or liability, for any reason whatsoever,
                including if you breach the Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                9. Governing Law
              </h2>
              <p className="mt-4 text-neutral-600">
                These Terms and Conditions are governed by and construed in
                accordance with the laws of Uganda, and you irrevocably submit
                to the exclusive jurisdiction of the courts in Kampala.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                10. Contact
              </h2>
              <p className="mt-4 text-neutral-600">
                If you have any questions about these Terms, please contact us
                at:
              </p>
              <div className="mt-4 rounded-lg bg-neutral-50 p-4 text-neutral-600">
                <p>Email: legal@tenawork.com</p>
                <p>Phone: +256 706 123 456</p>
                <p>Address: Kampala, Uganda</p>
              </div>
            </div>

            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
              <p className="text-sm text-neutral-600">
                Last Updated: January 2024. These Terms & Conditions may be
                updated periodically. Your continued use constitutes acceptance
                of changes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
