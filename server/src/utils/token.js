const crypto = require('crypto');

const generateConfirmationToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

module.exports = { generateConfirmationToken };

