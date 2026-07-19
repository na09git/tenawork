// ACTION: CREATE
// FILE: src/controllers/jobController.js
const { query } = require('../config/db');

const getJobs = async (req, res, next) => {
  try {
    const { location, workType, institutionType, keyword, salaryMin, salaryMax } = req.query;

    let sql = `SELECT * FROM jobs WHERE is_active = true`;
    const params = [];

    if (keyword) {
      params.push(`%${keyword}%`);
      sql += ` AND title ILIKE $${params.length}`;
    }
    if (location) {
      params.push(location);
      sql += ` AND location ILIKE $${params.length}`;
    }
    if (workType) {
      params.push(workType);
      sql += ` AND work_type = $${params.length}`;
    }
    if (institutionType) {
      params.push(institutionType);
      sql += ` AND institution_type = $${params.length}`;
    }
    if (salaryMin) {
      params.push(Number(salaryMin));
      sql += ` AND salary_max >= $${params.length}`;
    }
    if (salaryMax) {
      params.push(Number(salaryMax));
      sql += ` AND salary_min <= $${params.length}`;
    }

    sql += ` ORDER BY created_at DESC`;

    const result = await query(sql, params);

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /employers/me/jobs
 * Returns all jobs posted by the authenticated employer,
 * including applicant counts, ordered newest first.
 */
const getMyJobs = async (req, res, next) => {
  try {
    if (req.user.role !== 'EMPLOYER') {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }

    const employerId = req.user.id;

    const result = await query(
      `SELECT j.*,
              COUNT(a.id)::int AS applicant_count
       FROM jobs j
       LEFT JOIN applications a ON a.job_id = j.id
       WHERE j.employer_id = $1
       GROUP BY j.id
       ORDER BY j.created_at DESC`,
      [employerId]
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

const getJobById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await query(
      `SELECT * FROM jobs WHERE id = $1 AND is_active = true`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Job not found' });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

const createJob = async (req, res, next) => {
  try {
    if (req.user.role !== 'EMPLOYER') {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }

    const employerId = req.user.id;
    const {
      title,
      location,
      workType,
      salaryMin,
      salaryMax,
      institutionType,
      languages,
      culture,
      healthPriorities,
      description,
    } = req.body;

    const result = await query(
      `INSERT INTO jobs 
         (employer_id, title, location, work_type, salary_min, salary_max, institution_type, languages, culture, health_priorities, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [employerId, title, location, workType, salaryMin, salaryMax, institutionType, languages, culture, healthPriorities, description]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

const updateJob = async (req, res, next) => {
  try {
    if (req.user.role !== 'EMPLOYER') {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }

    const { id } = req.params;
    const employerId = req.user.id;

    // Verify ownership
    const jobCheck = await query(`SELECT * FROM jobs WHERE id = $1`, [id]);
    if (jobCheck.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Job not found' });
    }
    if (jobCheck.rows[0].employer_id !== employerId) {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }

    const updates = Object.keys(req.body);
    if (updates.length === 0) {
      return res.status(400).json({ success: false, error: 'No fields provided to update' });
    }

    // Mapping camelCase payload to snake_case DB columns
    const fieldMap = {
      title: 'title',
      location: 'location',
      workType: 'work_type',
      salaryMin: 'salary_min',
      salaryMax: 'salary_max',
      institutionType: 'institution_type',
      languages: 'languages',
      culture: 'culture',
      healthPriorities: 'health_priorities',
      description: 'description'
    };

    let sql = `UPDATE jobs SET `;
    const params = [];
    let setClauses = [];

    for (const field of updates) {
      if (fieldMap[field]) {
        params.push(req.body[field]);
        setClauses.push(`${fieldMap[field]} = $${params.length}`);
      }
    }

    if (setClauses.length === 0) {
      return res.status(400).json({ success: false, error: 'Invalid fields provided to update' });
    }

    sql += setClauses.join(', ');
    sql += `, updated_at = NOW() WHERE id = $${params.length + 1} RETURNING *`;
    params.push(id);

    const result = await query(sql, params);

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    if (req.user.role !== 'EMPLOYER') {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }

    const { id } = req.params;
    const employerId = req.user.id;

    // Verify ownership
    const jobCheck = await query(`SELECT * FROM jobs WHERE id = $1`, [id]);
    if (jobCheck.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Job not found' });
    }
    if (jobCheck.rows[0].employer_id !== employerId) {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }

    await query(`UPDATE jobs SET is_active = false, updated_at = NOW() WHERE id = $1`, [id]);

    res.json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getJobs,
  getMyJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
};
