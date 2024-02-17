const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { uploadImage } = require("../services/cloudStorage");
const { authenticateToken } = require("../middlewares/authorization");
const { registerUser, loginUser } = require("../services/authService");

const {
  repostSphinx,
  undoRepostSphinx,
} = require("../controllers/Reposts/repostController");
const {
  likeSphinx,
  dislikeSphinx,
} = require("../controllers/Likes/likesController");

// Authentication-related actions
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/upload-image").post(upload.single("userImage"), uploadImage);

// User profile and other related actions
router.route("/likes").post(authenticateToken, likeSphinx);
router.route("/dislike/:sphinxId").delete(authenticateToken, dislikeSphinx);
router.route("/repost").post(authenticateToken, repostSphinx);
router.route("/repost/:sphinxId").delete(authenticateToken, undoRepostSphinx);

module.exports = router;
