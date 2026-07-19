const { query } = require('../config/db');

const createApplication = async (req, res, next) => {
  try {
    if (req.user.role !== 'EMPLOYEE' && req.user.role !== 'PROFESSIONAL') {
      return res.status(403).json({ success: false, error: 'Only professionals can apply to jobs' });
    }

    const professionalId = req.user.id;
    const { jobId, coverLetter } = req.body;

    if (!jobId) {
      return res.status(400).json({ success: false, error: 'Job ID is required' });
    }

    // Verify job exists and is active
    const jobCheck = await query(`SELECT * FROM jobs WHERE id = $1 AND is_active = true`, [jobId]);
    if (jobCheck.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Job not found or no longer active' });
    }

    try {
      const result = await query(
        `INSERT INTO applications (job_id, professional_id, cover_letter, status)
         VALUES ($1, $2, $3, 'PENDING')
         RETURNING *`,
        [jobId, professionalId, coverLetter || null]
      );

      res.status(201).json({
        success: true,
        data: result.rows[0],
      });
    } catch (err) {
      if (err.code === '23505') { // unique_violation
        return res.status(409).json({ success: false, error: 'You have already applied to this job' });
      }
      throw err;
    }
  } catch (error) {
    next(error);
  }
};

const getApplications = async (req, res, next) => {
  try {
    if (req.user.role !== 'EMPLOYEE' && req.user.role !== 'PROFESSIONAL') {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }

    const professionalId = req.user.id;

    const result = await query(
      `SELECT a.*, j.title as job_title, j.location as job_location, 
              (SELECT company_name FROM employer_profiles WHERE user_id = j.employer_id) as institution_name
       FROM applications a
       JOIN jobs j ON a.job_id = j.id
       WHERE a.professional_id = $1
       ORDER BY a.applied_at DESC`,
      [professionalId]
    );

    // Map snake_case to camelCase for the frontend if needed, or just send rows.
    // The frontend mock expects: id, jobTitle, institution, location, dateApplied, status.
    const formattedData = result.rows.map(row => ({
      id: row.id,
      jobId: row.job_id,
      jobTitle: row.job_title,
      institution: row.institution_name || 'Unknown Institution',
      location: row.job_location,
      dateApplied: row.applied_at,
      status: row.status,
    }));

    res.json({
      success: true,
      data: formattedData,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createApplication,
  getApplications,
};
