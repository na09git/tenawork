/**
 * authService — Centralized authentication API calls
 *
 * All auth-related HTTP requests go through this module.
 * Uses the shared Axios instance from @/lib/axios which
 * automatically attaches the Bearer token and handles 401s.
 */
import api from "@/lib/axios";

/**
 * Register a new user.
 * @param {{ email: string, password: string, role: "EMPLOYEE"|"EMPLOYER" }} data
 * @returns {{ accessToken, refreshToken, user }}
 */
export const registerUser = async (data) => {
  const res = await api.post("/api/auth/register", data);
  return res.data.data;
};

/**
 * Log in an existing user.
 * @param {{ email: string, password: string }} credentials
 * @returns {{ accessToken, refreshToken, user }}
 */
export const loginUser = async (credentials) => {
  const res = await api.post("/api/auth/login", credentials);
  return res.data.data;
};

/**
 * Refresh the access token.
 * @param {string} refreshToken
 * @returns {{ accessToken }}
 */
export const refreshAccessToken = async (refreshToken) => {
  const res = await api.post("/api/auth/refresh", { refreshToken });
  return res.data.data;
};
