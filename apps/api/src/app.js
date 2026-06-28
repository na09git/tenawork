// ACTION: CREATE
// FILE: src/app.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const employeeRoutes = require("./routes/employees");
const employerRoutes = require("./routes/employers");
const jobRoutes = require("./routes/jobs");
const matchRoutes = require("./routes/match");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ success: true, service: "tenawork-api" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/employers", employerRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/match", matchRoutes);

// Error Handling
app.use(errorHandler);

module.exports = app;
