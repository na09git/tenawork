// ACTION: CREATE
// FILE: src/routes/match.js
const express = require('express');
const { getEmployeeMatches, getEmployerMatches } = require('../controllers/matchController');
const authGuard = require('../middleware/authGuard');

const router = express.Router();

router.use(authGuard);

router.post('/employee', getEmployeeMatches);
router.post('/employer', getEmployerMatches);

module.exports = router;
