const mongoose = require("mongoose");
const Sphinx = require("../models/Sphinx");
const { getImageURL } = require("./cloudStorage");

const isUserInteraction = (array, field, value) => ({
  $in: [new mongoose.Types.ObjectId(value), `$${array}.${field}`],
});

const getSphinxes = async (skip, limitNumber, userId) => {
  const results = await Sphinx.aggregate([
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
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $addFields: {
        likesCount: { $size: "$likes" },
        repostsCount: { $size: "$reposts" },
        isLikedByUser: isUserInteraction("likes", "userId", userId),
        isRepostedByUser: isUserInteraction("reposts", "userId", userId),
        userName: { $arrayElemAt: ["$userDetails.userName", 0] },
        fullName: { $arrayElemAt: ["$userDetails.fullName", 0] },
        userImage: { $arrayElemAt: ["$userDetails.userImage", 0] },
      },
    },
    {
      $sort: { createdAt: -1 }, // Sort by createdAt field in descending order
    },
    {
      $project: {
        sphinxId: { $toString: "$_id" },
        content: 1,
        likesCount: 1,
        repostsCount: 1,
        isLikedByUser: 1,
        isRepostedByUser: 1,
        userName: 1,
        fullName: 1,
        userImage: 1, // Include userImage in the projection
        createdAt: 1,
      },
    },
    {
      $unset: "_id", // Optionally remove the _id field if not needed
    },
    {
      $skip: skip,
    },
    {
      $limit: limitNumber,
    },
  ]);

  // Use Promise.all to wait for all getImageURL promises to resolve
  const sphinxesWithImageUrls = await Promise.all(
    results.map(async (sphinx) => ({
      ...sphinx,
      userImage: await getImageURL(sphinx.userImage), // Apply getImageURL function
    }))
  );

  return sphinxesWithImageUrls;
};

const getTotalSphinxCount = async () => {
  return await Sphinx.countDocuments();
};

module.exports = {
  getSphinxes,
  getTotalSphinxCount,
};
