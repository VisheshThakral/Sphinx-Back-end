const asyncWrapper = require("../../utils/async");
const Sphinx = require("../../models/Sphinx");
const Repost = require("../../models/Reposts");
const User = require("../../models/User");
const { getUserId } = require("../../helpers/jwt_helper");

const repostSphinx = asyncWrapper(async (req, res) => {
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
    return res.status(404).json({ error: "Sphinx or user not found." });
  }

  // Check if the user has already reposted the tweet
  const existingRepost = await Repost.findOne({ userId, sphinxId });
  if (existingRepost) {
    return res
      .status(400)
      .json({ error: "User has already reposted the tweet." });
  }

  // Create a new repost and return it in the response
  const newRepost = await Repost.create({ sphinxId, userId });
  res.status(201).json(newRepost);
});

const undoRepostSphinx = asyncWrapper(async (req, res) => {
  // Extract user ID from the authorization token
  const token = req.headers["authorization"].split(" ")[1];
  const userId = getUserId(token);
  const sphinxId = req.params.sphinxId;

  const repost = await Repost.findOneAndDelete({ userId, sphinxId });
  if (repost) {
    res.status(200).json({ message: "Repost deleted successfully" });
  } else {
    res.status(404).json({ message: "repost not found" });
  }
});

module.exports = {
  repostSphinx,
  undoRepostSphinx
};
