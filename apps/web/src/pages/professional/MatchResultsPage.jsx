import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  MapPin,
  Building2,
  Wallet,
  Sparkles,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { getEmployeeMatches } from "@/services/matchService";
import { applyToJob, getMyApplications } from "@/services/applicationService";
import toast from "react-hot-toast";
import Button from "@/components/ui/button/Button";
import Badge from "@/components/ui/badge/Badge";

/**
 * MatchResultsPage — palette locked to the rest of the site, rebuilt as
 * a table instead of a card grid, with a delete/dismiss action per row.
 *
 * ScoreBadge tiers: rather than generic Tailwind green/amber/rose, the
 * top tier (≥80%) uses brand teal — consistent with brand-as-success
 * used on CandidateDetailPage — and the middle tier (60–79%) uses the
 * gold accent, the same color used for the match score ring in the
 * hero. That's deliberate: gold already means "this is a match result"
 * on this site, so reusing it here for a real match score ties the
 * marketing page and the product together instead of introducing a
 * fourth unrelated hue. Low tier (<60%) stays rose — a genuinely
 * different signal (weak match) needs a genuinely different color,
 * same reasoning as error states elsewhere.
 *
 * Delete: no backend endpoint exists yet for dismissing a match (see
 * TODO below) — implemented as an optimistic local removal with an
 * undo-via-toast pattern so the UI works now and can be wired to a
 * real DELETE/dismiss endpoint later without changing the interaction.
 */
const ScoreBadge = ({ score }) => {
  const percentage = Math.round((score || 0) * 100);
  let colorClass = "bg-rose-50 text-rose-700";

  if (percentage >= 80) {
    colorClass = "bg-brand-50 text-brand-700";
  } else if (percentage >= 60) {
    colorClass = "bg-accent-500/10 text-accent-600";
  }

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 font-mono text-sm font-semibold ${colorClass}`}
    >
      <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
      {percentage}%
    </div>
  );
};

export default function MatchResultsPage() {
  const shouldReduceMotion = useReducedMotion();
  const [matches, setMatches] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [applyingJobs, setApplyingJobs] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [matchesData, appsData] = await Promise.all([
          getEmployeeMatches(),
          getMyApplications().catch(() => [])
        ]);
        setMatches(matchesData);
        setAppliedJobs(new Set(appsData.map(a => a.jobId)));
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load AI matches.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApply = async (jobId) => {
    try {
      setApplyingJobs((prev) => new Set(prev).add(jobId));
      await applyToJob(jobId);
      setAppliedJobs((prev) => new Set(prev).add(jobId));
      toast.success("Application sent successfully!");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to apply.");
    } finally {
      setApplyingJobs((prev) => {
        const next = new Set(prev);
        next.delete(jobId);
        return next;
      });
    }
  };

  const handleDelete = async (job) => {
    const previous = matches;
    setMatches((current) => current.filter((m) => m.id !== job.id));

    // TODO: no dismiss/delete endpoint exists yet in matchService — this
    // is optimistic-local-only for now. Once a real endpoint exists
    // (e.g. dismissMatch(job.id)), call it here and roll back `matches`
    // to `previous` in a catch block if it fails.
    toast((t) => (
      <div className="flex items-center gap-3">
        <span className="font-sans text-sm text-ink">Match removed</span>
        <button
          onClick={() => {
            setMatches(previous);
            toast.dismiss(t.id);
          }}
          className="font-sans text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          Undo
        </button>
      </div>
    ));
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-6">
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : { scale: [1, 1.2, 1], rotate: [0, 180, 360] }
          }
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-brand-500 to-brand-700 shadow-xl"
        >
          <Sparkles className="h-10 w-10 text-white" aria-hidden="true" />
        </motion.div>
        <div className="text-center">
          <h2 className="font-sans text-xl font-semibold text-ink">
            AI is finding your perfect matches
          </h2>
          <p className="mt-2 font-sans text-slate-500">
            Analyzing your preferences against active jobs...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-center">
        <h3 className="font-sans text-lg font-medium text-rose-800">
          Oops, something went wrong
        </h3>
        <p className="mt-2 font-sans text-rose-600">{error}</p>
        <Button
          onClick={() => window.location.reload()}
          className="mt-4 font-sans"
          variant="outline"
        >
          Try again
        </Button>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm">
        <div className="mb-4 rounded-full bg-slate-50 p-4">
          <Sparkles className="h-8 w-8 text-slate-400" aria-hidden="true" />
        </div>
        <h3 className="font-sans text-lg font-semibold text-ink">
          No perfect matches yet
        </h3>
        <p className="mt-2 max-w-md font-sans text-slate-500">
          We couldn't find any jobs that strongly align with your current
          preferences. Try broadening your criteria.
        </p>
        <Link to="/dashboard/professional/preferences" className="mt-6">
          <Button className="!bg-brand-600 font-sans font-medium !text-white hover:!bg-brand-700">
            Update preferences
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-medium text-ink">
          Your top matches
        </h1>
        <p className="mt-2 font-sans text-slate-500">
          Based on your profile, here are the best opportunities available right
          now.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-6 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Job
                </th>
                <th className="px-4 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Location
                </th>
                <th className="px-4 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Salary
                </th>
                <th className="px-4 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Type
                </th>
                <th className="px-4 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Match
                </th>
                <th className="px-6 py-3 text-right font-sans text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {matches.map((job, idx) => (
                <motion.tr
                  key={job.id}
                  initial={
                    shouldReduceMotion ? undefined : { opacity: 0, y: 10 }
                  }
                  animate={
                    shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                  }
                  transition={{ delay: idx * 0.05 }}
                  className="group transition-colors hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <div className="font-sans font-semibold text-ink">
                      {job.title}
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 font-sans text-sm text-slate-500">
                      <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                      {job.institution_type}
                    </div>
                    {job.health_priorities?.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {job.health_priorities.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="default"
                            className="bg-slate-50 text-xs font-normal text-slate-500"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4 font-sans text-sm text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <MapPin
                        className="h-3.5 w-3.5 text-slate-400"
                        aria-hidden="true"
                      />
                      {job.location}
                    </div>
                  </td>
                  <td className="px-4 py-4 font-mono text-sm text-ink">
                    <div className="flex items-center gap-1.5">
                      <Wallet
                        className="h-3.5 w-3.5 text-slate-400"
                        aria-hidden="true"
                      />
                      {job.salary_min?.toLocaleString()}–
                      {job.salary_max?.toLocaleString()} ETB
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Badge className="font-sans">{job.work_type}</Badge>
                  </td>
                  <td className="px-4 py-4">
                    <ScoreBadge score={job.score} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/dashboard/jobs/${job.id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-brand-600 font-sans font-medium !text-brand-700 hover:bg-brand-50"
                        >
                          Details{" "}
                          <ArrowRight
                            className="ml-1 h-3.5 w-3.5"
                            aria-hidden="true"
                          />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        className={
                          appliedJobs.has(job.id)
                            ? "!bg-brand-600 font-sans font-medium !text-white opacity-50 cursor-not-allowed"
                            : "!bg-brand-600 font-sans font-medium !text-white hover:!bg-brand-700"
                        }
                        onClick={() => handleApply(job.id)}
                        disabled={appliedJobs.has(job.id) || applyingJobs.has(job.id)}
                        loading={applyingJobs.has(job.id)}
                      >
                        {appliedJobs.has(job.id) ? "Applied" : "Apply"}
                      </Button>
                      <button
                        onClick={() => handleDelete(job)}
                        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
                        aria-label={`Remove ${job.title} from matches`}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
