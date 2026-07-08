import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Building2, Wallet, Clock, ArrowLeft, CheckCircle2, Bookmark } from "lucide-react";
import { getJobById } from "@/services/jobService";
import Button from "@/components/ui/button/Button";
import Badge from "@/components/ui/badge/Badge";

export default function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Local state for features without backend endpoints yet
  const [isSaved, setIsSaved] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJobById(id);
        setJob(data);
      } catch (err) {
        setError("Failed to load job details.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-center">
        <h3 className="text-lg font-medium text-rose-800">Job Not Found</h3>
        <p className="mt-2 text-rose-600">{error || "This job may have been removed."}</p>
        <Button onClick={() => navigate(-1)} className="mt-4" variant="outline">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Back navigation */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to results
      </button>

      {/* Header Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{job.title}</h1>
              {hasApplied && (
                <Badge variant="success" className="px-3 py-1">Applied</Badge>
              )}
            </div>
            
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600 sm:gap-6">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-slate-400" />
                <span className="font-medium">{job.institution_type}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-slate-400" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-slate-400" />
                <span>{job.work_type}</span>
              </div>
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-slate-400" />
                <span>
                  {job.salary_min?.toLocaleString()} - {job.salary_max?.toLocaleString()} ETB
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex shrink-0 flex-row gap-3 sm:flex-col">
            <Button 
              size="lg" 
              variant={hasApplied ? "success" : "primary"}
              className="flex-1 sm:flex-none"
              onClick={() => setHasApplied(true)}
              disabled={hasApplied}
            >
              {hasApplied ? (
                <>
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Application Sent
                </>
              ) : (
                "Apply Now"
              )}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="flex-1 sm:flex-none"
              onClick={() => setIsSaved(!isSaved)}
            >
              <Bookmark className={`mr-2 h-5 w-5 ${isSaved ? "fill-sky-500 text-sky-500" : ""}`} />
              {isSaved ? "Saved" : "Save Job"}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column - Description */}
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-slate-900">About the Role</h2>
            <div className="prose prose-slate mt-4 max-w-none text-slate-600">
              {job.description ? (
                <p className="whitespace-pre-wrap leading-relaxed">{job.description}</p>
              ) : (
                <p className="italic text-slate-400">No detailed description provided by the employer.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Requirements & Tags */}
        <div className="space-y-6">
          {/* Culture & Environment */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-bold text-slate-900">Work Culture</h3>
            <div className="mt-4">
              <Badge variant="primary" className="text-sm px-3 py-1">
                {job.culture || "Not specified"}
              </Badge>
            </div>
          </div>

          {/* Health Priorities */}
          {job.health_priorities && job.health_priorities.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-slate-900">Specialties Needed</h3>
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
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-slate-900">Required Languages</h3>
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
