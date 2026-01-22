const vendorService = require('../services/vendor.service');
const { sendSuccess } = require('../utils/response');

const getAll = async (req, res, next) => {
  try {
    const vendors = await vendorService.getAll();
    return sendSuccess(res, vendors);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll };

