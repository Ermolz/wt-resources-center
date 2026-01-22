const { z } = require('zod');

const registerSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required'),
  }),
});

const confirmSchema = z.object({
  params: z.object({
    token: z.string().min(1, 'Token is required'),
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
  confirmSchema,
};

