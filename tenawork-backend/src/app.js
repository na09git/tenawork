const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('./modules/auth/auth.routes');
const employeeRoutes = require('./modules/employees/employees.routes');
const employerRoutes = require('./modules/employers/employers.routes');
const matchingRoutes = require('./modules/matching/matching.routes');
const { errorHandler } = require('./shared/middleware/errorHandler');
const { requestLogger } = require('./shared/middleware/requestLogger');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/employers', employerRoutes);
app.use('/api/matching', matchingRoutes);

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Global error handler
app.use(errorHandler);

module.exports = app;
