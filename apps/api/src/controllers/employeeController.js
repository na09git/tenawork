// ACTION: CREATE
// FILE: src/controllers/employeeController.js
const { query } = require('../config/db');

const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await query(
      `SELECT * FROM employee_profiles WHERE user_id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Profile not found' });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const {
      location,
      workType,
      salaryMin,
      salaryMax,
      institutionType,
      languages,
      culture,
      healthPriorities,
      freeText,
    } = req.body;

    const result = await query(
      `INSERT INTO employee_profiles 
         (user_id, location, work_type, salary_min, salary_max, institution_type, languages, culture, health_priorities, free_text)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       ON CONFLICT (user_id) DO UPDATE SET
         location = EXCLUDED.location,
         work_type = EXCLUDED.work_type,
         salary_min = EXCLUDED.salary_min,
         salary_max = EXCLUDED.salary_max,
         institution_type = EXCLUDED.institution_type,
         languages = EXCLUDED.languages,
         culture = EXCLUDED.culture,
         health_priorities = EXCLUDED.health_priorities,
         free_text = EXCLUDED.free_text,
         updated_at = NOW()
       RETURNING *`,
      [userId, location, workType, salaryMin, salaryMax, institutionType, languages, culture, healthPriorities, freeText]
    );

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
