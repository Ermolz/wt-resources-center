const prisma = require('../config/database');

const getAll = async () => {
  return prisma.tag.findMany({
    orderBy: {
      name: 'asc',
    },
  });
};

module.exports = { getAll };

