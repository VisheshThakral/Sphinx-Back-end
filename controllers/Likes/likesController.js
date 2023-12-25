const asyncWrapper = require("../../utils/async");
const Sphinx = require("../../models/Sphinx");
const Like = require("../../models/Likes");
const User = require("../../models/User");
const { getUserId } = require("../../helpers/jwt_helper");

const updateSphinxLikes = asyncWrapper(async (req, res) => {
  // Extract user ID from the authorization token
  const token = req.headers["authorization"].split(" ")[1];
  const userId = getUserId(token);

  // Extract sphinx ID from the request body
  const { sphinxId } = req.body;

  // Check if the sphinx and user exist in the database
  const sphinxExists = await Sphinx.findById(sphinxId);
  const userExists = await User.findById(userId);

  // If either the sphinx or user does not exist, return a 404 error
  if (!sphinxExists || !userExists) {
    return res.status(404).json({ error: "Tweet or user not found." });
  }

  // Check if the user has already liked the tweet
  const existingLike = await Like.findOne({ userId, sphinxId });
  if (existingLike) {
    return res.status(400).json({ error: "User has already liked the tweet." });
  }

  // Create a new like and return it in the response
  const newLike = await Like.create({ sphinxId, userId });
  res.status(201).json(newLike);
});

module.exports = {
  updateSphinxLikes,
};
