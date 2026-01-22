const tagService = require('../services/tag.service');
const { sendSuccess } = require('../utils/response');

const getAll = async (req, res, next) => {
  try {
    const tags = await tagService.getAll();
    return sendSuccess(res, tags);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll };

