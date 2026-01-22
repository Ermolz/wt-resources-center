const authService = require('../services/auth.service');
const { sendSuccess, sendError } = require('../utils/response');

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.register(email, password);
    return sendSuccess(res, {
      user: result,
      message: 'Registration successful. Please check your email to confirm your account.',
    }, 201);
  } catch (error) {
    next(error);
  }
};

const confirm = async (req, res, next) => {
  try {
    const { token } = req.params;
    const result = await authService.confirm(token);
    return sendSuccess(res, {
      user: result,
      message: 'Account confirmed successfully',
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    return sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};

module.exports = { register, confirm, login };

