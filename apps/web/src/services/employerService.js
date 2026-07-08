/**
 * employerService — Employer profile API calls
 *
 * Handles fetching and updating the employer (institution) profile.
 */
import api from "@/lib/axios";

/**
 * Get the current employer's profile.
 * @returns {object} Employer profile data
 */
export const getEmployerProfile = async () => {
  const res = await api.get("/api/employers/profile");
  return res.data.data;
};

/**
 * Create or update the employer profile.
 * @param {{
 *   companyName?: string,
 *   location?: string,
 *   institutionType?: string,
 * }} data
 * @returns {object} Updated profile
 */
export const updateEmployerProfile = async (data) => {
  const res = await api.put("/api/employers/profile", data);
  return res.data.data;
};
