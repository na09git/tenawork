require('dotenv').config();

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || 5432,
  DB_USER: process.env.DB_USER || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || 'tenawork',
  JWT_SECRET: process.env.JWT_SECRET || 'changeme_secret',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  AI_ENGINE_URL: process.env.AI_ENGINE_URL || 'http://localhost:5001',
};

module.exports = env;
