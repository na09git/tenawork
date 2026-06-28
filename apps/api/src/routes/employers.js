// ACTION: CREATE
// FILE: src/routes/employers.js
const express = require('express');
const { getProfile, updateProfile } = require('../controllers/employerController');
const authGuard = require('../middleware/authGuard');

const router = express.Router();

router.use(authGuard);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);

module.exports = router;
