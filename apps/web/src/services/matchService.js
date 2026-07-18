/**
 * matchService — AI matching API calls
 *
 * These endpoints trigger the AI matching engine on the backend.
 * Employee matching returns top 3 job matches;
 * Employer matching returns top 10 candidate matches.
 *
 * Match score display logic:
 *   - score is a float 0–1 from the AI engine
 *   - displayed as a percentage (e.g. 0.87 → 87%)
 *   - color coding: >= 0.8 green, >= 0.6 yellow, < 0.6 red
 */
import api from "@/lib/axios";

/**
 * Get top 3 job matches for the current employee.
 * The backend reads the employee profile automatically.
 * @returns {Array<{ id, title, location, salary_min, salary_max, score, ... }>}
 */
export const getEmployeeMatches = async () => {
  const res = await api.post("/api/match/employee");
  return res.data.data;
};

/**
 * Get top 10 candidate matches for an employer.
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
 * }} desiredProfile - The desired candidate profile criteria
 * @returns {Array<{ user_id, email, location, score, ... }>}
 */
export const getEmployerMatches = async (desiredProfile) => {
  const res = await api.post("/api/match/employer", { desiredProfile });
  console.log(" Matches from api", res.data.data);
  return res.data.data;
};
