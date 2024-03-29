const asyncWrapper = require("../../utils/async");
const Sphinx = require("../../models/Sphinx");
const { getSingleSphinxDetails } = require("../../services/sphinxService");

const getSingleSphinx = asyncWrapper(async (req, res) => {
  const sphinxId = req.params.id;
  const sphinx = await getSingleSphinxDetails(sphinxId);

  res.status(201).json({ sphinx });
});

module.exports = {
  getSingleSphinx,
};
