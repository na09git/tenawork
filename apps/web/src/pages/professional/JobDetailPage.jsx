import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Building2,
  Wallet,
  Clock,
  ArrowLeft,
  CheckCircle2,
  Bookmark,
} from "lucide-react";
import { getJobById } from "@/services/jobService";
import { applyToJob, getMyApplications } from "@/services/applicationService";
import toast from "react-hot-toast";
import Button from "@/components/ui/button/Button";
import Badge from "@/components/ui/badge/Badge";

/**
 * JobDetailPage — palette locked to match the rest of the site.
 *
 * Notes:
 * - Loading spinner and all interactive accents: sky-500 → brand-600.
 * - Borders: slate-200 → slate-100, matching cards everywhere else
 *   (your custom slate scale doesn't define 200, so it was silently
 *   falling back to Tailwind's default gray-blue slate before).
 * - The "Saved" bookmark state uses accent-500 (gold) when filled,
 *   not brand teal — this is a deliberate one-off use of the gold
 *   accent as a "you marked this" signal, the same role gold plays
 *   for the match score in the hero. Everything else on this page
 *   stays brand/ink/slate.
 * - Error state (rose-*) is left untouched on purpose — same reasoning
 *   as the auth pages: errors should stay a distinct semantic red, not
 *   brand-colored, so they never read as "this is fine."
 * - h3s here (Work Culture, Specialties, Languages) stay font-sans —
 *   same dashboard-density reasoning as ProfessionalDashboardPage.
 */
export default function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Local state for features without backend endpoints yet
  const [isSaved, setIsSaved] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const [jobData, appsData] = await Promise.all([
          getJobById(id),
          getMyApplications().catch(() => []) // swallow error for apps list if it fails
        ]);
        setJob(jobData);
        setHasApplied(appsData.some((app) => app.jobId === id));
      } catch (err) {
        setError("Failed to load job details.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async () => {
    try {
      setIsApplying(true);
      await applyToJob(id);
      setHasApplied(true);
      toast.success("Application sent successfully!");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to apply.");
    } finally {
      setIsApplying(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div
          className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent"
          role="status"
          aria-label="Loading job details"
        />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-center">
        <h3 className="font-sans text-lg font-medium text-rose-800">
          Job not found
        </h3>
        <p className="mt-2 font-sans text-rose-600">
          {error || "This job may have been removed."}
        </p>
        <Button onClick={() => navigate(-1)} className="mt-4" variant="outline">
          Go back
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Back navigation */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 font-sans text-sm font-medium text-slate-500 transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to results
      </button>

      {/* Header Card */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-2xl font-medium text-ink sm:text-3xl">
                {job.title}
              </h1>
              {hasApplied && (
                <Badge variant="success" className="px-3 py-1">
                  Applied
                </Badge>
              )}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 font-sans text-sm text-slate-500 sm:gap-6">
              <div className="flex items-center gap-2">
                <Building2
                  className="h-5 w-5 text-slate-400"
                  aria-hidden="true"
                />
                <span className="font-medium">{job.institution_type}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-slate-400" aria-hidden="true" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-slate-400" aria-hidden="true" />
                <span>{job.work_type}</span>
              </div>
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-slate-400" aria-hidden="true" />
                <span className="font-mono">
                  {job.salary_min?.toLocaleString()} -{" "}
                  {job.salary_max?.toLocaleString()} ETB
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex shrink-0 flex-row gap-3 sm:flex-col">
            <Button
              size="lg"
              variant={hasApplied ? "success" : "primary"}
              className={
                hasApplied
                  ? "flex-1 font-sans font-medium sm:flex-none !text-white"
                  : "flex-1 !bg-brand-600 font-sans font-medium hover:!bg-brand-700 sm:flex-none !text-white"
              }
              onClick={handleApply}
              disabled={hasApplied || isApplying}
              loading={isApplying}
            >
              {hasApplied ? (
                <>
                  <CheckCircle2 className="mr-2 h-5 w-5" aria-hidden="true" />
                  Application sent
                </>
              ) : (
                "Apply now"
              )}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 border-brand-600 font-sans font-medium text-brand-700 hover:bg-brand-50 sm:flex-none"
              onClick={() => setIsSaved(!isSaved)}
            >
              <Bookmark
                className={`mr-2 h-5 w-5 ${isSaved ? "fill-accent-500 text-accent-500" : ""}`}
                aria-hidden="true"
              />
              {isSaved ? "Saved" : "Save job"}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column - Description */}
        <div className="space-y-6 md:col-span-2">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-xl font-medium text-ink">
              About the role
            </h2>
            <div className="prose prose-slate mt-4 max-w-none font-sans text-slate-500">
              {job.description ? (
                <p className="whitespace-pre-wrap leading-relaxed">
                  {job.description}
                </p>
              ) : (
                <p className="italic text-slate-400">
                  No detailed description provided by the employer.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Requirements & Tags */}
        <div className="space-y-6">
          {/* Culture & Environment */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h3 className="font-sans font-semibold text-ink">Work culture</h3>
            <div className="mt-4">
              <Badge variant="primary" className="px-3 py-1 text-sm">
                {job.culture || "Not specified"}
              </Badge>
            </div>
          </div>

          {/* Health Priorities */}
          {job.health_priorities && job.health_priorities.length > 0 && (
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h3 className="font-sans font-semibold text-ink">
                Specialties needed
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {job.health_priorities.map((priority) => (
                  <Badge key={priority} variant="default">
                    {priority}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {job.languages && job.languages.length > 0 && (
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h3 className="font-sans font-semibold text-ink">
                Required languages
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {job.languages.map((lang) => (
                  <Badge key={lang} variant="default">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
