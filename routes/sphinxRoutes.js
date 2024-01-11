const express = require("express");
const router = express.Router();
const {
  getSphinxList,
} = require("../controllers/Timelines/timelineController");
const {
  createSphinx,
  uploadImage,
} = require("../controllers/sphinxController");
const { authenticateToken } = require("../middlewares/authorization");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/list", authenticateToken, getSphinxList);
router.route("/create").post(authenticateToken, createSphinx);
router.route("/upload-image").post((req, res, next) => {
  upload.single("userImage");
  next();
}, uploadImage);

module.exports = router;
