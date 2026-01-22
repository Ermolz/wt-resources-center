const prisma = require('../config/database');

const getAll = async () => {
  return prisma.vendor.findMany({
    orderBy: {
      name: 'asc',
    },
  });
};

module.exports = { getAll };

