import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  PlusCircle,
  Pencil,
  Trash2,
  MapPin,
  Wallet,
  Users,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import { getMyJobs, deleteJob } from "@/services/jobService";
import toast from "react-hot-toast";
import Button from "@/components/ui/button/Button";
import Badge from "@/components/ui/badge/Badge";

/**
 * EmployerJobListingsPage — employer's own posted jobs.
 *
 * Delete is a soft-close (sets is_active = false), not a hard destroy.
 * The FK from applications → jobs means a hard delete would either
 * cascade-wipe application history or fail on the constraint — both bad.
 * So the button and confirmation copy say "Close this posting," not "Delete."
 *
 * Confirmation is a modal dialog (not a casual toast-undo): closing a real
 * job posting with real applicants is destructive enough to require explicit
 * intent. The modal shows the job title so the employer knows exactly what
 * they are confirming.
 */

function ConfirmCloseDialog({ job, onConfirm, onCancel, isSubmitting }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onCancel(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="close-dialog-title"
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.15 }}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-rose-50">
          <AlertTriangle className="h-5 w-5 text-rose-600" aria-hidden="true" />
        </div>
        <h2
          id="close-dialog-title"
          className="font-sans text-lg font-semibold text-ink"
        >
          Close this posting?
        </h2>
        <p className="mt-2 font-sans text-sm text-slate-500">
          <span className="font-medium text-ink">{job.title}</span> will no
          longer appear in job search results. Candidates who applied will no
          longer see updates to this listing. This action cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="ghost"
            onClick={onCancel}
            disabled={isSubmitting}
            className="font-sans !text-slate-500 hover:!text-ink"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            loading={isSubmitting}
            disabled={isSubmitting}
            className="!bg-rose-600 font-sans font-medium !text-white hover:!bg-rose-700"
          >
            Close posting
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default function EmployerJobListingsPage() {
  const shouldReduceMotion = useReducedMotion();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [closingJob, setClosingJob] = useState(null); // job object pending close confirm
  const [isClosing, setIsClosing] = useState(false);

  const fetchJobs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMyJobs();
      setJobs(data ?? []);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load your job postings.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  const handleConfirmClose = async () => {
    if (!closingJob) return;
    setIsClosing(true);
    try {
      await deleteJob(closingJob.id);
      setJobs((prev) =>
        prev.map((j) =>
          j.id === closingJob.id ? { ...j, is_active: false } : j,
        ),
      );
      toast.success(`"${closingJob.title}" has been closed.`);
      setClosingJob(null);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to close posting.");
    } finally {
      setIsClosing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div
          className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent"
          role="status"
          aria-label="Loading job postings"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-center">
        <h3 className="font-sans text-lg font-medium text-rose-800">
          Something went wrong
        </h3>
        <p className="mt-2 font-sans text-rose-600">{error}</p>
        <Button
          onClick={fetchJobs}
          className="mt-4 font-sans"
          variant="outline"
        >
          Try again
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Confirmation dialog */}
      <AnimatePresence>
        {closingJob && (
          <ConfirmCloseDialog
            job={closingJob}
            onConfirm={handleConfirmClose}
            onCancel={() => { if (!isClosing) setClosingJob(null); }}
            isSubmitting={isClosing}
          />
        )}
      </AnimatePresence>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-medium text-ink">
              My job postings
            </h1>
            <p className="mt-2 font-sans text-slate-500">
              Manage the positions you have posted on TenaWork.
            </p>
          </div>
          <Link to="/dashboard/employer/post-job">
            <Button className="!bg-brand-600 font-sans font-medium !text-white hover:!bg-brand-700">
              <PlusCircle className="mr-1.5 h-4 w-4" aria-hidden="true" />
              Post a new job
            </Button>
          </Link>
        </div>

        {jobs.length === 0 ? (
          <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm">
            <div className="mb-4 rounded-full bg-slate-50 p-4">
              <Briefcase className="h-8 w-8 text-slate-400" aria-hidden="true" />
            </div>
            <h3 className="font-sans text-lg font-semibold text-ink">
              No job postings yet
            </h3>
            <p className="mt-2 max-w-md font-sans text-slate-500">
              You haven't posted any jobs. Create your first listing to start
              finding qualified health professionals.
            </p>
            <Link to="/dashboard/employer/post-job" className="mt-6">
              <Button className="!bg-brand-600 font-sans font-medium !text-white hover:!bg-brand-700">
                Post your first job
              </Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-3">
              <span className="font-sans text-sm text-slate-500">
                {jobs.length} posting{jobs.length !== 1 ? "s" : ""}
                {" · "}
                {jobs.filter((j) => j.is_active).length} open
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse text-left">
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
                      Status
                    </th>
                    <th className="px-4 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Applicants
                    </th>
                    <th className="px-4 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Posted
                    </th>
                    <th className="px-6 py-3 text-right font-sans text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {jobs.map((job, idx) => (
                    <motion.tr
                      key={job.id}
                      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
                      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`transition-colors hover:bg-slate-50 ${!job.is_active ? "opacity-60" : ""}`}
                    >
                      <td className="px-6 py-4">
                        <div className="font-sans font-semibold text-ink">
                          {job.title}
                        </div>
                        <div className="mt-0.5 font-sans text-xs text-slate-500">
                          {job.institution_type}
                        </div>
                      </td>
                      <td className="px-4 py-4 font-sans text-sm text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                          {job.location}
                        </div>
                      </td>
                      <td className="px-4 py-4 font-mono text-sm text-ink">
                        <div className="flex items-center gap-1.5">
                          <Wallet className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                          {Number(job.salary_min).toLocaleString()}–
                          {Number(job.salary_max).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="font-sans">{job.work_type}</Badge>
                      </td>
                      <td className="px-4 py-4">
                        <Badge variant={job.is_active ? "success" : "warning"} className="font-sans">
                          {job.is_active ? "Open" : "Closed"}
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5 font-mono text-sm text-ink">
                          <Users className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                          {job.applicant_count ?? 0}
                        </div>
                      </td>
                      <td className="px-4 py-4 font-mono text-xs text-slate-400">
                        {new Date(job.created_at).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <Link to={`/dashboard/employer/edit-job/${job.id}`}>
                            <button
                              aria-label={`Edit ${job.title}`}
                              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-brand-50 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                            >
                              <Pencil className="h-4 w-4" aria-hidden="true" />
                            </button>
                          </Link>
                          {job.is_active && (
                            <button
                              aria-label={`Close ${job.title}`}
                              onClick={() => setClosingJob(job)}
                              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                            >
                              <Trash2 className="h-4 w-4" aria-hidden="true" />
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
