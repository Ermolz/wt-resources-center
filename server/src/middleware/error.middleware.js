const { sendError } = require('../utils/response');

const errorHandler = (err, req, res, _next) => {
  console.error('Error:', err);

  if (err.name === 'ValidationError' || err.name === 'ZodError') {
    const details = err.errors || err.issues || [];
    const formattedDetails = Array.isArray(details)
      ? details.map((e) => ({
          field: e.path?.join('.') || e.field || 'unknown',
          message: e.message || e.msg || 'Validation error',
        }))
      : [];
    return sendError(res, 'VALIDATION_ERROR', 'Validation error', formattedDetails, 400);
  }

  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return sendError(res, 'INVALID_TOKEN', 'Invalid or expired token', null, 401);
  }

  if (err.code === 'P2002') {
    return sendError(res, 'DUPLICATE_ENTRY', 'Duplicate entry', null, 409);
  }

  if (err.code === 'P2025') {
    return sendError(res, 'NOT_FOUND', err.message || 'Resource not found', null, 404);
  }

  const statusCode = err.status || err.statusCode || 500;
  const errorCode = err.code || 'INTERNAL_SERVER_ERROR';
  const message = err.message || 'Internal server error';

  return sendError(res, errorCode, message, null, statusCode);
};

module.exports = errorHandler;

