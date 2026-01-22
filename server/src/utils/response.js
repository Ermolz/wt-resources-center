const formatSuccess = (data, statusCode = 200, meta = {}) => {
  const response = {
    success: true,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta,
    },
  };
  return { response, statusCode };
};

const formatError = (code, message, details = null, statusCode = 400) => {
  const error = {
    code,
    message,
  };
  if (details) {
    error.details = Array.isArray(details) ? details : [details];
  }
  return {
    success: false,
    error,
    meta: {
      timestamp: new Date().toISOString(),
    },
    statusCode,
  };
};

const sendSuccess = (res, data, statusCode = 200, meta = {}) => {
  const { response, statusCode: code } = formatSuccess(data, statusCode, meta);
  return res.status(code).json(response);
};

const sendError = (res, code, message, details = null, statusCode = 400) => {
  const errorResponse = formatError(code, message, details, statusCode);
  return res.status(errorResponse.statusCode).json(errorResponse);
};

module.exports = {
  formatSuccess,
  formatError,
  sendSuccess,
  sendError,
};

