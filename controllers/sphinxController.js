const asyncWrapper = require("../utils/async");
const Sphinx = require("../models/Sphinx");
const { getUserId } = require("../utils/jwt_helper");

const createSphinx = asyncWrapper(async (req, res) => {
  // Extract user ID from the authorization token
  const token = req.headers["authorization"].split(" ")[1];
  const userId = getUserId(token);

  // Create a new Sphinx with the provided data and user ID
  const sphinx = await Sphinx.create({ ...req.body, userId });

  // Return the created Sphinx in the response
  res.status(201).json({ sphinx });
});

module.exports = {
  createSphinx,
};
