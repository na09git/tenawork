import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import {
  MapPin,
  UserSquare2,
  Mail,
  Briefcase,
  GraduationCap,
  ArrowLeft,
  Send,
} from "lucide-react";
import Button from "@/components/ui/button/Button";
import Badge from "@/components/ui/badge/Badge";
import Textarea from "@/components/ui/textarea/Textarea";

/**
 * CandidateDetailPage — palette/type locked to match the rest of the
 * employer-side pages. Same indigo drift as EmployerDashboardPage,
 * JobPostWizardPage, and ContactedCandidatesPage — now brand teal.
 *
 * One deliberate call: the "Message Sent" success icon previously used
 * a generic Tailwind green-100/green-600. Since brand-600 (#0B6E4F) is
 * already a teal-green, it reads as an appropriate "success" color on
 * its own — unlike the error/rose case elsewhere, there's no need for a
 * separate semantic hue here, so it's brand-50/brand-600 now, tying a
 * positive outcome back to the brand rather than introducing a fourth
 * green into the palette.
 *
 * font-display on the page h1 only; sidebar section titles (h3) stay
 * font-sans/semibold, same dashboard convention as elsewhere. Salary
 * figure set in font-mono.
 */
export default function CandidateDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const showContact = searchParams.get("contact") === "true";

  const [candidate, setCandidate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isContacting, setIsContacting] = useState(showContact);
  const [messageSent, setMessageSent] = useState(false);

  // V1 Mock: Since backend doesn't have a public GET /candidates/:id route yet
  useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => {
      setCandidate({
        id,
        email: "professional@example.com",
        location: "Addis Ababa",
        work_type: "Full-time",
        salary_min: 15000,
        salary_max: 25000,
        institution_type: "Hospital",
        culture: "Collaborative",
        languages: ["Amharic", "English"],
        health_priorities: ["Primary Care", "Surgery"],
        free_text:
          "I am a dedicated healthcare professional looking for opportunities in a collaborative hospital environment.",
      });
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [id]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setMessageSent(true);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div
          className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent"
          role="status"
          aria-label="Loading candidate profile"
        />
      </div>
    );
  }

  if (!candidate) return null;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 font-sans text-sm font-medium text-slate-500 transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to matches
      </button>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-700">
              <UserSquare2 className="h-8 w-8" aria-hidden="true" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-medium text-ink sm:text-3xl">
                Professional profile
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-4 font-sans text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <MapPin
                    className="h-4 w-4 text-slate-400"
                    aria-hidden="true"
                  />
                  <span>{candidate.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase
                    className="h-4 w-4 text-slate-400"
                    aria-hidden="true"
                  />
                  <span>Prefers {candidate.institution_type}</span>
                </div>
              </div>
            </div>
          </div>
          <Button
            size="lg"
            className="w-full !bg-brand-600 font-sans font-medium !text-white hover:!bg-brand-700 sm:w-auto"
            onClick={() => setIsContacting(!isContacting)}
          >
            <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
            {isContacting ? "Cancel contact" : "Contact candidate"}
          </Button>
        </div>
      </div>

      {isContacting && (
        <div className="rounded-2xl border border-brand-100 bg-brand-50 p-6 shadow-sm">
          {messageSent ? (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <Send className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="font-sans text-lg font-medium text-ink">
                Message sent!
              </h3>
              <p className="mt-2 font-sans text-slate-500">
                The candidate has been notified of your interest.
              </p>
              <Button
                onClick={() => setIsContacting(false)}
                className="mt-4 font-sans"
                variant="outline"
              >
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <h3 className="font-sans font-semibold text-ink">
                Send a message
              </h3>
              <Textarea
                placeholder="Introduce your institution and the position you are hiring for..."
                rows={4}
                required
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="!bg-brand-600 font-sans font-medium !text-white hover:!bg-brand-700"
                >
                  <Send className="mr-2 h-4 w-4" aria-hidden="true" /> Send
                  message
                </Button>
              </div>
            </form>
          )}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h3 className="font-sans font-semibold text-ink">Preferences</h3>
            <dl className="mt-4 space-y-4 font-sans text-sm text-slate-500">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <dt className="font-medium text-ink">Work Type</dt>
                <dd>{candidate.work_type}</dd>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <dt className="font-medium text-ink">Expected Salary</dt>
                <dd className="font-mono">
                  {candidate.salary_min} - {candidate.salary_max} ETB
                </dd>
              </div>
              <div className="flex justify-between pb-2">
                <dt className="font-medium text-ink">Preferred Culture</dt>
                <dd>{candidate.culture}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h3 className="font-sans font-semibold text-ink">
              Additional notes
            </h3>
            <p className="mt-4 font-sans text-sm leading-relaxed text-slate-500">
              {candidate.free_text || "No additional notes provided."}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h3 className="font-sans font-semibold text-ink">
              Specialties / priorities
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {candidate.health_priorities?.map((tag) => (
                <Badge key={tag} variant="success">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h3 className="font-sans font-semibold text-ink">Languages</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {candidate.languages?.map((lang) => (
                <Badge key={lang} variant="default" className="bg-slate-50">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
