// ACTION: CREATE
// FILE: src/middleware/validate.js
const { validationResult } = require('express-validator');

const validate = (rules) => {
  return [
    ...rules,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((err) => err.msg);
        return res.status(400).json({ success: false, error: errorMessages });
      }
      next();
    },
  ];
};

module.exports = validate;
