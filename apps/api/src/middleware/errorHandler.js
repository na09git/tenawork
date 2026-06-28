// ACTION: CREATE
// FILE: src/middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  // Handle specific PostgreSQL errors
  if (err.code === '23505') {
    return res.status(409).json({ success: false, error: 'Already exists' });
  }
  
  if (err.code === '23503') {
    return res.status(400).json({ success: false, error: 'Invalid reference' });
  }

  return res.status(500).json({ success: false, error: 'Internal server error' });
};

module.exports = errorHandler;
