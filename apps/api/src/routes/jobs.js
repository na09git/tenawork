// ACTION: CREATE
// FILE: src/routes/jobs.js
const express = require('express');
const { getJobs, getJobById, createJob, updateJob, deleteJob } = require('../controllers/jobController');
const authGuard = require('../middleware/authGuard');

const router = express.Router();

// Public routes
router.get('/', getJobs);
router.get('/:id', getJobById);

// Protected routes (EMPLOYER only, enforced in controller)
router.use(authGuard);

router.post('/', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

module.exports = router;
