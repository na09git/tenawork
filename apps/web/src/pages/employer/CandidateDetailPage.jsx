import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { MapPin, UserSquare2, Mail, Briefcase, GraduationCap, ArrowLeft, Send } from "lucide-react";
import Button from "@/components/ui/button/Button";
import Badge from "@/components/ui/badge/Badge";
import Textarea from "@/components/ui/textarea/Textarea";

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
        free_text: "I am a dedicated healthcare professional looking for opportunities in a collaborative hospital environment."
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
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
      </div>
    );
  }

  if (!candidate) return null;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to matches
      </button>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
              <UserSquare2 className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Professional Profile</h1>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span>{candidate.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-slate-400" />
                  <span>Prefers {candidate.institution_type}</span>
                </div>
              </div>
            </div>
          </div>
          <Button 
            size="lg"
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700"
            onClick={() => setIsContacting(!isContacting)}
          >
            <Mail className="mr-2 h-4 w-4" /> 
            {isContacting ? "Cancel Contact" : "Contact Candidate"}
          </Button>
        </div>
      </div>

      {isContacting && (
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6 shadow-sm">
          {messageSent ? (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Send className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">Message Sent!</h3>
              <p className="mt-2 text-slate-600">The candidate has been notified of your interest.</p>
              <Button onClick={() => setIsContacting(false)} className="mt-4" variant="outline">Close</Button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <h3 className="font-bold text-slate-900">Send a Message</h3>
              <Textarea 
                placeholder="Introduce your institution and the position you are hiring for..."
                rows={4}
                required
              />
              <div className="flex justify-end">
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </Button>
              </div>
            </form>
          )}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-bold text-slate-900">Preferences</h3>
            <dl className="mt-4 space-y-4 text-sm text-slate-600">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <dt className="font-medium text-slate-900">Work Type</dt>
                <dd>{candidate.work_type}</dd>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <dt className="font-medium text-slate-900">Expected Salary</dt>
                <dd>{candidate.salary_min} - {candidate.salary_max} ETB</dd>
              </div>
              <div className="flex justify-between pb-2">
                <dt className="font-medium text-slate-900">Preferred Culture</dt>
                <dd>{candidate.culture}</dd>
              </div>
            </dl>
          </div>
          
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-bold text-slate-900">Additional Notes</h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {candidate.free_text || "No additional notes provided."}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-bold text-slate-900">Specialties / Priorities</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {candidate.health_priorities?.map(tag => (
                <Badge key={tag} variant="success">{tag}</Badge>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-bold text-slate-900">Languages</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {candidate.languages?.map(lang => (
                <Badge key={lang} variant="default" className="bg-slate-100">{lang}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
