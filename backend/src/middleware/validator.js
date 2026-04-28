const { validationResult } = require('express-validator');

function handleValidation(req, res, next) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return res.status(422).json({
    success: false,
    message: 'Validation failed.',
    errors: errors.array().map((item) => ({
      field: item.path,
      message: item.msg,
    })),
  });
}

module.exports = { handleValidation };
