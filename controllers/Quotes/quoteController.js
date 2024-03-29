const asyncWrapper = require("../../utils/async");
const Quote = require("../../models/Quotes");
const { getUserId } = require("../../helpers/jwt_helper");

const getSphinxQuoteList = asyncWrapper(async (req, res) => {
  const sphinxId = req.params.id;

  const sphinxQuotes = await Quote.find({ sphinxId });

  const meta = {
    newest_id: null,
    oldest_id: null,
    result_count: 0,
  };
  res.status(200).json({ data: sphinxQuotes, meta });
});

const quoteASphinx = asyncWrapper(async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  const userId = getUserId(token);

  const sphinxId = req.params.id;

  const quote = await Quote.create({ ...req.body, userId, sphinxId });

  res.status(201).json({ quote });
});

module.exports = {
  getSphinxQuoteList,
  quoteASphinx,
};
