const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../config/jwt');
const prisma = require('../config/database');
const { generateConfirmationToken } = require('../utils/token');
const { sendConfirmationEmail } = require('../utils/email');

const register = async (email, password) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const confirmationToken = generateConfirmationToken();

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      confirmationToken,
    },
  });

  await sendConfirmationEmail(email, confirmationToken);

  return { id: user.id, email: user.email };
};

const confirm = async (token) => {
  const user = await prisma.user.findUnique({
    where: { confirmationToken: token },
  });

  if (!user) {
    throw new Error('Invalid confirmation token');
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      isActive: true,
      confirmationToken: null,
    },
  });

  return { id: user.id, email: user.email };
};

const login = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  if (!user.isActive) {
    throw new Error('Account not confirmed');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, secret, {
    expiresIn,
  });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  };
};

module.exports = { register, confirm, login };

