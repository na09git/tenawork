// ACTION: CREATE
// FILE: src/controllers/matchController.js
const { query } = require('../config/db');
const { matchEmployee, matchEmployer } = require('../services/aiClient');

const getEmployeeMatches = async (req, res, next) => {
  try {
    if (req.user.role !== 'EMPLOYEE') {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }

    const userId = req.user.id;

    // Get employee profile
    const profileResult = await query(
      `SELECT * FROM employee_profiles WHERE user_id = $1`,
      [userId]
    );

    if (profileResult.rows.length === 0 || !profileResult.rows[0].location) {
      return res.status(400).json({ success: false, error: 'Complete your profile first' });
    }

    const profile = profileResult.rows[0];

    // Get all active jobs
    const jobsResult = await query(`SELECT * FROM jobs WHERE is_active = true`);
    const jobs = jobsResult.rows;

    if (jobs.length === 0) {
      return res.json({ success: true, data: [] });
    }

    // Call AI Engine
    const aiResponse = await matchEmployee(profile, jobs);
    
    // Fallback if AI fails or returns empty
    const matches = aiResponse.matches || [];

    // The AI engine might return just IDs and scores, or it might be full objects.
    // The prompt says "return top 3 matches with full job details merged in".
    // We will assume the AI returns an array of objects like { jobId: '...', score: 0.95 }
    // or just the job objects if it's already merged.
    // We'll map them just in case they only have jobId.

    const topMatches = matches.slice(0, 3).map(match => {
      const fullJob = jobs.find(j => j.id === (match.jobId || match.id));
      return {
        ...fullJob,
        ...match,
      };
    });

    res.json({
      success: true,
      data: topMatches,
    });
  } catch (error) {
    next(error);
  }
};

const getEmployerMatches = async (req, res, next) => {
  try {
    if (req.user.role !== 'EMPLOYER') {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }

    const { desiredProfile } = req.body;

    // Select all employee profiles joined with users (to get email, role etc if needed)
    // Actually, only profiles are usually sent, but we'll include user details.
    const candidatesResult = await query(
      `SELECT p.*, u.email FROM employee_profiles p
       JOIN users u ON p.user_id = u.id`
    );
    const candidates = candidatesResult.rows;

    if (candidates.length === 0) {
      return res.json({ success: true, data: [] });
    }

    // Call AI Engine
    const aiResponse = await matchEmployer(desiredProfile, candidates);
    
    const matches = aiResponse.matches || [];

    // The prompt says "return top 10 matches with candidate details merged in"
    const topMatches = matches.slice(0, 10).map(match => {
      const fullCandidate = candidates.find(c => c.id === (match.candidateId || match.id));
      return {
        ...fullCandidate,
        ...match,
      };
    });

    res.json({
      success: true,
      data: topMatches,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEmployeeMatches,
  getEmployerMatches,
};
