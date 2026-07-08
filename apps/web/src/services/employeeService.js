/**
 * employeeService — Employee profile API calls
 *
 * Handles fetching and updating the employee (health professional)
 * profile including preferences used for AI matching.
 */
import api from "@/lib/axios";

/**
 * Get the current employee's profile.
 * @returns {object} Employee profile data
 */
export const getEmployeeProfile = async () => {
  const res = await api.get("/api/employees/profile");
  return res.data.data;
};

/**
 * Create or update the employee profile / preferences.
 * Uses upsert on the backend (INSERT ... ON CONFLICT DO UPDATE).
 *
 * @param {{
 *   location?: string,
 *   workType?: string,
 *   salaryMin?: number,
 *   salaryMax?: number,
 *   institutionType?: string,
 *   languages?: string[],
 *   culture?: string,
 *   healthPriorities?: string[],
 *   freeText?: string,
 * }} data
 * @returns {object} Updated profile
 */
export const updateEmployeeProfile = async (data) => {
  const res = await api.put("/api/employees/profile", data);
  return res.data.data;
};
