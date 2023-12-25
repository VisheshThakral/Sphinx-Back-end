const Sphinx = require("../models/Sphinx");

const getSphinxListWithLikes = async (skip, limitNumber) => {
  return await Sphinx.aggregate([
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "sphinxId",
        as: "likes",
      },
    },
    {
      $project: {
        sphinxId: { $toString: "$_id" },
        content: 1,
        likes: { $toInt: { $size: "$likes" } },
      },
    },
    {
      $unset: "_id",
    },
    {
      $skip: skip,
    },
    {
      $limit: limitNumber,
    },
  ]);
};

const getTotalSphinxCount = async () => {
  return await Sphinx.countDocuments();
};

module.exports = {
  getSphinxListWithLikes,
  getTotalSphinxCount,
};
