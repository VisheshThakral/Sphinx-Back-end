const express = require("express");
const router = express.Router();

const {
  createSphinx,
  deleteSphinx,
} = require("../controllers/Sphinx/sphinxController");
const { authenticateToken } = require("../middlewares/authorization");
const {
  getSphinxList,
} = require("../controllers/Timelines/timelineController");
const {
  getSingleSphinx,
} = require("../controllers/Sphinx/sphinxLookUpController");
const {
  quoteASphinx,
  getSphinxQuoteList,
} = require("../controllers/Quotes/quoteController");

router.get("/list", getSphinxList);
router.get("/:id", getSingleSphinx);
router.get("/:id/quotes", getSphinxQuoteList);
router.route("/create").post(authenticateToken, createSphinx);
router.route("/delete/:sphinxId").delete(authenticateToken, deleteSphinx);
router.route("/:id/quote_sphinxes").post(authenticateToken, quoteASphinx);

module.exports = router;
