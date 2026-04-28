function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
}

function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: error.message || 'Internal server error.',
    ...(process.env.NODE_ENV !== 'production' ? { stack: error.stack } : {}),
  });
}

module.exports = { notFoundHandler, errorHandler };
