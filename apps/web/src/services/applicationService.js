import api from "@/lib/axios";

/**
 * Apply to a job.
 * @param {string} jobId
 * @returns {object} The created application
 */
export const applyToJob = async (jobId) => {
  const res = await api.post("/api/applications", { jobId });
  return res.data.data;
};

/**
 * Get all applications for the current professional.
 * @returns {Array<object>} List of applications
 */
export const getMyApplications = async () => {
  const res = await api.get("/api/applications");
  return res.data.data;
};
