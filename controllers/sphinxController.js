const asyncWrapper = require("../utils/async");
const Sphinx = require("../models/Sphinx");

const getAllSphinx = asyncWrapper(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 10;

  const startIndex = (page - 1) * perPage;

  const sphinx = await Sphinx.find({}).skip(startIndex).limit(perPage);
  const totalSphinx = await Sphinx.countDocuments({});

  const paginationInfo = {
    total: totalSphinx,
    perPage: perPage,
    currentPage: page,
    totalPages: Math.ceil(totalSphinx / perPage),
  };
  res.status(200).json({ sphinx, paginationInfo });
});

const createSphinx = asyncWrapper(async (req, res) => {
  const sphinx = await Sphinx.create(req.body);
  res.status(201).json({ sphinx });
});

const updateSphinxLikes = asyncWrapper(async (req, res) => {
  const { id } = req.body;
  const updatedSphinx = await Sphinx.findByIdAndUpdate(
    id,
    { $inc: { likes: 1 } },
    { new: true }
  );

  if (updatedSphinx) {
    res.status(201).json(updatedSphinx);
  } else {
    res.status(404).json({ success: false, message: "Sphinx not found" });
  }
});

module.exports = {
  getAllSphinx,
  createSphinx,
  updateSphinxLikes,
};
