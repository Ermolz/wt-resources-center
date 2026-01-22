const transporter = require('../config/email');

const sendConfirmationEmail = async (email, token) => {
  const confirmationUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/confirm/${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'noreply@gpuvault.com',
    to: email,
    subject: 'Confirm your GPU Vault account',
    html: `
      <h1>Welcome to GPU Vault!</h1>
      <p>Please click the link below to confirm your account:</p>
      <a href="${confirmationUrl}">${confirmationUrl}</a>
      <p>This link will expire in 24 hours.</p>
    `,
  });
};

module.exports = { sendConfirmationEmail };

