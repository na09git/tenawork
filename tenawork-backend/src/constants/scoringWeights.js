/**
 * Scoring weights used by the matching engine.
 * All weights should sum to 1.0.
 */
const SCORING_WEIGHTS = {
  skills: 0.40,
  location: 0.20,
  experience: 0.20,
  salary: 0.10,
  jobType: 0.10,
};

/** Top N results to return for employees */
const EMPLOYEE_TOP_N = 3;

/** Top N results to return for employers */
const EMPLOYER_TOP_N = 10;

module.exports = { SCORING_WEIGHTS, EMPLOYEE_TOP_N, EMPLOYER_TOP_N };
