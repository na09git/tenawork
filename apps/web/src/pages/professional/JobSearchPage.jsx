import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Search,
  MapPin,
  Building2,
  Wallet,
  ArrowRight,
  Briefcase,
  SlidersHorizontal,
} from "lucide-react";
import { getJobs } from "@/services/jobService";
import { applyToJob, getMyApplications } from "@/services/applicationService";
import toast from "react-hot-toast";
import Button from "@/components/ui/button/Button";
import Badge from "@/components/ui/badge/Badge";

/**
 * JobSearchPage — manual job browse for professionals.
 *
 * No AI score here: this is raw search/browse, not the AI-matched list.
 * Keyword input is debounced 400 ms to avoid per-keystroke requests.
 * Apply logic is identical to MatchResultsPage: optimistic disabled state,
 * duplicate-application guard via 409 response, same toast copy.
 */

const WORK_TYPES = ["", "Full-time", "Part-time", "Contract", "Temporary"];
const INSTITUTION_TYPES = [
  "",
  "Hospital",
  "Clinic",
  "Health Center",
  "NGO",
  "University",
];

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function JobSearchPage() {
  const shouldReduceMotion = useReducedMotion();

  // Filter state
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [workType, setWorkType] = useState("");
  const [institutionType, setInstitutionType] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const debouncedKeyword = useDebounce(keyword, 400);

  // Data state
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [applyingJobs, setApplyingJobs] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch jobs whenever any filter changes
  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getJobs({
        keyword: debouncedKeyword || undefined,
        location: location || undefined,
        workType: workType || undefined,
        institutionType: institutionType || undefined,
        salaryMin: salaryMin ? Number(salaryMin) : undefined,
        salaryMax: salaryMax ? Number(salaryMax) : undefined,
      });
      setJobs(data ?? []);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load jobs.");
    } finally {
      setIsLoading(false);
    }
  }, [debouncedKeyword, location, workType, institutionType, salaryMin, salaryMax]);

  // Pre-load applied jobs so Apply buttons start in correct state
  useEffect(() => {
    getMyApplications()
      .then((apps) => setAppliedJobs(new Set((apps ?? []).map((a) => a.jobId))))
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleApply = async (jobId) => {
    try {
      setApplyingJobs((prev) => new Set(prev).add(jobId));
      await applyToJob(jobId);
      setAppliedJobs((prev) => new Set(prev).add(jobId));
      toast.success("Application sent successfully!");
    } catch (err) {
      const msg = err.response?.data?.error || "Failed to apply.";
      if (err.response?.status === 409) {
        toast.error("You have already applied to this job.");
        setAppliedJobs((prev) => new Set(prev).add(jobId));
      } else {
        toast.error(msg);
      }
    } finally {
      setApplyingJobs((prev) => {
        const next = new Set(prev);
        next.delete(jobId);
        return next;
      });
    }
  };

  const hasFilters = location || workType || institutionType || salaryMin || salaryMax;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-medium text-ink">
          Browse jobs
        </h1>
        <p className="mt-2 font-sans text-slate-500">
          Search all open positions and apply directly.
        </p>
      </div>

      {/* Search + filter bar */}
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              id="job-search-keyword"
              type="search"
              placeholder="Search by job title…"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-4 font-sans text-sm text-ink placeholder-slate-400 focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
            />
          </div>
          <button
            onClick={() => setShowFilters((v) => !v)}
            aria-label="Toggle filters"
            aria-expanded={showFilters}
            className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 font-sans text-sm font-medium transition-colors ${
              showFilters || hasFilters
                ? "border-brand-600 bg-brand-50 text-brand-700"
                : "border-slate-200 text-slate-600 hover:border-brand-200 hover:bg-slate-50"
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            Filters
            {hasFilters && (
              <span className="ml-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 font-mono text-[10px] text-white">
                {[location, workType, institutionType, salaryMin, salaryMax].filter(Boolean).length}
              </span>
            )}
          </button>
        </div>

        {/* Expanded filters */}
        {showFilters && (
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, height: 0 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, height: "auto" }}
            className="mt-4 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            <div>
              <label htmlFor="filter-location" className="mb-1 block font-sans text-xs font-medium text-slate-500">
                Location
              </label>
              <input
                id="filter-location"
                type="text"
                placeholder="e.g. Addis Ababa"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 font-sans text-sm text-ink focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
              />
            </div>
            <div>
              <label htmlFor="filter-worktype" className="mb-1 block font-sans text-xs font-medium text-slate-500">
                Work Type
              </label>
              <select
                id="filter-worktype"
                value={workType}
                onChange={(e) => setWorkType(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 font-sans text-sm text-ink focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
              >
                {WORK_TYPES.map((t) => (
                  <option key={t} value={t}>{t || "Any work type"}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="filter-institution" className="mb-1 block font-sans text-xs font-medium text-slate-500">
                Institution Type
              </label>
              <select
                id="filter-institution"
                value={institutionType}
                onChange={(e) => setInstitutionType(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 font-sans text-sm text-ink focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
              >
                {INSTITUTION_TYPES.map((t) => (
                  <option key={t} value={t}>{t || "Any institution"}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block font-sans text-xs font-medium text-slate-500">
                Salary range (ETB)
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="filter-salary-min"
                  type="number"
                  placeholder="Min"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 font-sans text-sm text-ink focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
                />
                <span className="font-sans text-slate-400">–</span>
                <input
                  id="filter-salary-max"
                  type="number"
                  placeholder="Max"
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 font-sans text-sm text-ink focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
                />
              </div>
            </div>
            {hasFilters && (
              <div className="sm:col-span-2 lg:col-span-4">
                <button
                  onClick={() => {
                    setLocation("");
                    setWorkType("");
                    setInstitutionType("");
                    setSalaryMin("");
                    setSalaryMax("");
                  }}
                  className="font-sans text-sm text-slate-500 underline-offset-2 hover:text-ink hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <div
            className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent"
            role="status"
            aria-label="Loading jobs"
          />
        </div>
      ) : error ? (
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
      ) : jobs.length === 0 ? (
        <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm">
          <div className="mb-4 rounded-full bg-slate-50 p-4">
            <Briefcase className="h-8 w-8 text-slate-400" aria-hidden="true" />
          </div>
          <h3 className="font-sans text-lg font-semibold text-ink">
            No jobs match your search
          </h3>
          <p className="mt-2 max-w-sm font-sans text-slate-500">
            Try adjusting your filters or clearing the keyword search to broaden
            the results.
          </p>
          {hasFilters && (
            <button
              onClick={() => {
                setKeyword("");
                setLocation("");
                setWorkType("");
                setInstitutionType("");
                setSalaryMin("");
                setSalaryMax("");
              }}
              className="mt-5 font-sans text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-3">
            <span className="font-sans text-sm text-slate-500">
              {jobs.length} job{jobs.length !== 1 ? "s" : ""} found
            </span>
          </div>
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
                    transition={{ delay: idx * 0.04 }}
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
                        <MapPin className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                        {job.location}
                      </div>
                    </td>
                    <td className="px-4 py-4 font-mono text-sm text-ink">
                      <div className="flex items-center gap-1.5">
                        <Wallet className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                        {Number(job.salary_min).toLocaleString()}–
                        {Number(job.salary_max).toLocaleString()} ETB
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge className="font-sans">{job.work_type}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/dashboard/jobs/${job.id}`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-brand-600 font-sans font-medium !text-brand-700 hover:bg-brand-50"
                          >
                            Details
                            <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
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
  );
}
