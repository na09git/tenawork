// ACTION: CREATE
// FILE: src/controllers/employerController.js
const { query } = require('../config/db');

const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await query(
      `SELECT * FROM employer_profiles WHERE user_id = $1`,
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
    const { companyName, location, institutionType } = req.body;

    const result = await query(
      `INSERT INTO employer_profiles 
         (user_id, company_name, location, institution_type)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (user_id) DO UPDATE SET
         company_name = EXCLUDED.company_name,
         location = EXCLUDED.location,
         institution_type = EXCLUDED.institution_type,
         updated_at = NOW()
       RETURNING *`,
      [userId, companyName, location, institutionType]
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
