// ACTION: CREATE
// FILE: src/config/db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

pool.on('connect', () => {
  console.log('Successfully connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Test connection on startup
pool.query('SELECT 1').catch((err) => {
  console.error('Failed to connect to database on startup:', err.message);
  process.exit(-1);
});

const query = (text, params) => pool.query(text, params);

module.exports = {
  query,
  pool,
};
