const getPaginationParams = (req) => {
  const page = parseInt(req.query.page) || 1;
  return { pageNumber: parseInt(page), limitNumber: 10 };
};

const calculateSkip = (pageNumber, limitNumber) =>
  (pageNumber - 1) * limitNumber;

const calculatePaginationInfo = (total, perPage, currentPage) => ({
  total,
  perPage,
  currentPage,
  totalPages: Math.ceil(total / perPage),
});

module.exports = {
  getPaginationParams,
  calculateSkip,
  calculatePaginationInfo,
};
