const Sphinx = require("../models/Sphinx");
const mongoose = require("mongoose");

const isUserInteraction = (array, field, value) => ({
  $in: [new mongoose.Types.ObjectId(value), "$" + array + "." + field],
});

const getSphinxes = async (skip, limitNumber, userId) => {
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
      $lookup: {
        from: "reposts",
        localField: "_id",
        foreignField: "sphinxId",
        as: "reposts",
      },
    },
    {
      $addFields: {
        likes: { $size: "$likes" },
        reposts: { $size: "$reposts" },
        isLikedByUser: isUserInteraction("likes", "userId", userId),
        isRepostedByUser: isUserInteraction("reposts", "userId", userId),
      },
    },
    {
      $project: {
        sphinxId: { $toString: "$_id" },
        content: 1,
        likes: 1,
        reposts: 1,
        isLikedByUser: 1,
        isRepostedByUser: 1,
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
  getSphinxes,
  getTotalSphinxCount,
};
