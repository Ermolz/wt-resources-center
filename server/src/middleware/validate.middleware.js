const { sendError } = require('../utils/response');

const validate = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      const details = error.errors?.map((e) => ({
        field: e.path?.join('.') || 'unknown',
        message: e.message || 'Validation error',
      })) || [];
      return sendError(res, 'VALIDATION_ERROR', 'Validation error', details, 400);
    }
  };
};

module.exports = validate;

