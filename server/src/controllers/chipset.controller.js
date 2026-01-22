const chipsetService = require('../services/chipset.service');
const { sendSuccess } = require('../utils/response');

const getAll = async (req, res, next) => {
  try {
    const chipsets = await chipsetService.getAll();
    return sendSuccess(res, chipsets);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll };

