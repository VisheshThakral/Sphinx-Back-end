const asyncWrapper = require("../../utils/async");
const { getUserId } = require("../../helpers/jwt_helper");
const {
  getPaginationParams,
  calculateSkip,
  calculatePaginationInfo,
} = require("../../helpers/paginationHelper");
const {
  getSphinxes,
  getTotalSphinxCount,
} = require("../../services/sphinxService");

const getSphinxList = asyncWrapper(async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  const userId = getUserId(token);
  const { pageNumber, limitNumber } = getPaginationParams(req);
  const skip = calculateSkip(pageNumber, limitNumber);

  const sphinxList = await getSphinxes(skip, limitNumber, userId);

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
