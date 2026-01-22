const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt');
const prisma = require('../config/database');
const { sendError } = require('../utils/response');

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return sendError(res, 'AUTHENTICATION_REQUIRED', 'Authentication required', null, 401);
    }

    const decoded = jwt.verify(token, secret);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user || !user.isActive) {
      return sendError(res, 'INVALID_USER', 'Invalid or inactive user', null, 401);
    }

    req.user = user;
    next();
  } catch (error) {
    return sendError(res, 'INVALID_TOKEN', 'Invalid token', null, 401);
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'ADMIN') {
    return sendError(res, 'ADMIN_ACCESS_REQUIRED', 'Admin access required', null, 403);
  }
  next();
};

module.exports = { authenticate, requireAdmin };

