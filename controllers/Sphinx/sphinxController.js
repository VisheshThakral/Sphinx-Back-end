const asyncWrapper = require("../../utils/async");
const Sphinx = require("../../models/Sphinx");
const { getUserId } = require("../../helpers/jwt_helper");

const createSphinx = asyncWrapper(async (req, res) => {
  // Extract user ID from the authorization token
  const token = req.headers["authorization"].split(" ")[1];
  const userId = getUserId(token);

  // Create a new Sphinx with the provided data and user ID
  const sphinx = await Sphinx.create({ ...req.body, userId });

  // Return the created Sphinx in the response
  res.status(201).json({ sphinx });
});

const deleteSphinx = asyncWrapper(async (req, res) => {
  const sphinxId = req.params.sphinxId;

  const sphinx = await Sphinx.findOneAndDelete({ _id: sphinxId });

  if (sphinx) {
    res.status(201).json({ msg: "Sphinx Deleted Successfully" });
  } else {
    res.status(404).json({ msg: "Sphinx not found" });
  }
});

module.exports = {
  createSphinx,
  deleteSphinx,
};
