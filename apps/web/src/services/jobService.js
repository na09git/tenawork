/**
 * jobService — Job posting API calls
 *
 * CRUD operations for job listings. GET routes are public,
 * POST/PUT/DELETE require EMPLOYER role authentication.
 */
import api from "@/lib/axios";

/**
 * List all active jobs with optional filters.
 * @param {{
 *   location?: string,
 *   workType?: string,
 *   institutionType?: string,
 *   keyword?: string,
 *   salaryMin?: number,
 *   salaryMax?: number,
 * }} filters
 * @returns {object[]} Array of job objects
 */
export const getJobs = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.keyword) params.set("keyword", filters.keyword);
  if (filters.location) params.set("location", filters.location);
  if (filters.workType) params.set("workType", filters.workType);
  if (filters.institutionType) params.set("institutionType", filters.institutionType);
  if (filters.salaryMin) params.set("salaryMin", String(filters.salaryMin));
  if (filters.salaryMax) params.set("salaryMax", String(filters.salaryMax));

  const res = await api.get(`/api/jobs?${params.toString()}`);
  return res.data.data;
};

/**
 * Get all jobs posted by the authenticated employer,
 * including applicant counts.
 * @returns {Array<{ id, title, location, work_type, salary_min, salary_max,
 *   institution_type, is_active, applicant_count, created_at }>}
 */
export const getMyJobs = async () => {
  const res = await api.get("/api/employers/me/jobs");
  return res.data.data;
};

/**
 * Get a single job by ID.
 * @param {string} id - Job UUID
 * @returns {object} Job details
 */
export const getJobById = async (id) => {
  const res = await api.get(`/api/jobs/${id}`);
  return res.data.data;
};

/**
 * Create a new job posting (EMPLOYER only).
 * @param {{\
 *   title: string,
 *   location: string,
 *   workType: string,
 *   salaryMin: number,
 *   salaryMax: number,
 *   institutionType: string,
 *   languages?: string[],
 *   culture?: string,
 *   healthPriorities?: string[],
 *   description?: string,
 * }} data
 * @returns {object} Created job
 */
export const createJob = async (data) => {
  const res = await api.post("/api/jobs", data);
  return res.data.data;
};

/**
 * Update an existing job (EMPLOYER only, must own the job).
 * @param {string} id - Job UUID
 * @param {object} data - Partial update fields
 * @returns {object} Updated job
 */
export const updateJob = async (id, data) => {
  const res = await api.put(`/api/jobs/${id}`, data);
  return res.data.data;
};

/**
 * Soft-delete a job (sets is_active = false). EMPLOYER only, must own the job.
 * Existing applications are preserved — this closes the posting, not destroys it.
 * @param {string} id - Job UUID
 * @returns {{ success: boolean }}
 */
export const deleteJob = async (id) => {
  const res = await api.delete(`/api/jobs/${id}`);
  return res.data;
};
