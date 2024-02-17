const express = require("express");
const router = express.Router();

const { createSphinx } = require("../controllers/sphinxController");
const { authenticateToken } = require("../middlewares/authorization");
const {
  getSphinxList,
} = require("../controllers/Timelines/timelineController");

router.get("/list", authenticateToken, getSphinxList);
router.route("/create").post(authenticateToken, createSphinx);

module.exports = router;
