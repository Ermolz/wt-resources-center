const nodemailer = require('nodemailer');

const isDevelopment = process.env.NODE_ENV === 'development';

const transporter = isDevelopment
  ? {
      sendMail: async (options) => {
        console.log('=== EMAIL (MOCK MODE) ===');
        console.log('To:', options.to);
        console.log('Subject:', options.subject);
        console.log('HTML:', options.html);
        console.log('========================');
        return { messageId: 'mock-message-id' };
      },
    }
  : nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

module.exports = transporter;

