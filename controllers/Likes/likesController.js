const asyncWrapper = require("../../utils/async");
const Sphinx = require("../../models/Sphinx");
const Like = require("../../models/Likes");
const User = require("../../models/User");
const { getUserId } = require("../../helpers/jwt_helper");

const likeSphinx = asyncWrapper(async (req, res) => {
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

  // Check if the user has already liked the Sphinx
  const existingLike = await Like.findOne({ userId, sphinxId });
  if (existingLike) {
    return res.status(400).json({ error: "User has already liked the Sphinx." });
  }

  // Create a new like and return it in the response
  const newLike = await Like.create({ sphinxId, userId });
  res.status(201).json(newLike);
});

const dislikeSphinx = asyncWrapper(async (req, res) => {
  // Extract user ID from the authorization token
  const token = req.headers["authorization"].split(" ")[1];
  const userId = getUserId(token);
  const sphinxId= req.params.sphinxId;

  const like = await Like.findOneAndDelete({ userId, sphinxId });
  if (like) {
    res.status(200).json({ message: "Like deleted successfully" });
  } else {
    res.status(404).json({ message: "Like not found" });
  }
});

module.exports = {
  likeSphinx,
  dislikeSphinx,
};
