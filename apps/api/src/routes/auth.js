// ACTION: CREATE
// FILE: src/routes/auth.js
const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { register, login, refresh } = require('../controllers/authController');

const router = express.Router();

router.post(
  '/register',
  validate([
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').isIn(['EMPLOYEE', 'EMPLOYER', 'ADMIN']).withMessage('Role must be valid enum'),
  ]),
  register
);

router.post(
  '/login',
  validate([
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ]),
  login
);

router.post(
  '/refresh',
  validate([
    body('refreshToken').notEmpty().withMessage('Refresh token is required'),
  ]),
  refresh
);

module.exports = router;
