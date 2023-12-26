const Sphinx = require("../models/Sphinx");
const mongoose = require("mongoose");

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
      $addFields: {
        likesCount: { $size: '$likes' },
        isLikedByUser: {
          $cond: {
            if: {
              $gt: [
                {
                  $size: {
                    $filter: {
                      input: "$likes",
                      as: "like",
                      cond: {
                        $eq: ["$$like.userId", new mongoose.Types.ObjectId(userId)],
                      },
                    },
                  },
                },
                0,
              ],
            },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        sphinxId: { $toString: "$_id" },
        content: 1,
        likes: { $toInt: { $size: "$likes" } },
        isLikedByUser: 1,
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
