const prisma = require('../config/database');

const getAll = async () => {
  return prisma.chipset.findMany({
    orderBy: {
      name: 'asc',
    },
  });
};

module.exports = { getAll };

