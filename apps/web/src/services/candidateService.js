/**
 * candidateService — Candidate-related API calls for employers
 *
 * Used by employers to view candidates they have contacted
 * through the AI-matching workflow.
 */
import api from "@/lib/axios";

/**
 * Get the list of candidates the current employer has contacted.
 * @returns {Array<{
 *   id: string,
 *   email: string,
 *   preferredType: string,
 *   jobTitle: string,
 *   location: string,
 *   status: string,
 *   contactDate: string,
 * }>}
 */
export const getContactedCandidates = async () => {
  const res = await api.get("/api/employers/contacted-candidates");
  return res.data.data;
};
