const asyncWrapper = require("../../utils/async");
const {
  getPaginationParams,
  calculateSkip,
  calculatePaginationInfo,
} = require("../../helpers/paginationHelper");
const {
  getSphinxListWithLikes,
  getTotalSphinxCount,
} = require("../../services/sphinxService");

const getSphinxList = asyncWrapper(async (req, res) => {
  const { pageNumber, limitNumber } = getPaginationParams(req);
  const skip = calculateSkip(pageNumber, limitNumber);

  const sphinxList = await getSphinxListWithLikes(skip, limitNumber);

  const totalSphinx = await getTotalSphinxCount();
  const paginationInfo = calculatePaginationInfo(
    totalSphinx,
    limitNumber,
    pageNumber
  );

  res.json({ sphinx: sphinxList, paginationInfo });
});

module.exports = {
  getSphinxList,
};
