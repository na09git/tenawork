// ACTION: CREATE
// FILE: src/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { query } = require('../config/db');

const generateTokens = (user) => {
  const payload = { id: user.id, email: user.email, role: user.role };
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  });
  return { accessToken, refreshToken };
};

const register = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const userResult = await query(
      `INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id, email, role, created_at, updated_at`,
      [email, hashedPassword, role]
    );

    const user = userResult.rows[0];

    if (role === 'EMPLOYEE') {
      await query(`INSERT INTO employee_profiles (user_id) VALUES ($1)`, [user.id]);
    } else if (role === 'EMPLOYER') {
      await query(`INSERT INTO employer_profiles (user_id) VALUES ($1)`, [user.id]);
    }

    const tokens = generateTokens(user);

    res.status(201).json({
      success: true,
      data: {
        ...tokens,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await query(`SELECT * FROM users WHERE email = $1`, [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const tokens = generateTokens(user);
    
    delete user.password;

    res.json({
      success: true,
      data: {
        ...tokens,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ success: false, error: 'Refresh token required' });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    
    const payload = { id: decoded.id, email: decoded.email, role: decoded.role };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    });

    res.json({
      success: true,
      data: {
        accessToken,
      },
    });
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Invalid refresh token' });
  }
};

module.exports = {
  register,
  login,
  refresh,
};
