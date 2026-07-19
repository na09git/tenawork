const express = require('express');
const { createApplication, getApplications } = require('../controllers/applicationController');
const authGuard = require('../middleware/authGuard');

const router = express.Router();

router.use(authGuard);

router.post('/', createApplication);
router.get('/', getApplications);

module.exports = router;
