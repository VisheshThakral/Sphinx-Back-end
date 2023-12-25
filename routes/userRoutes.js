const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/authorization");
const { registerUser, loginUser } = require("../services/authService");
const { updateSphinxLikes } = require("../controllers/Likes/likesController");

// Authentication-related actions
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// User profile and other related actions
router.route("/likes").post(authenticateToken, updateSphinxLikes);

module.exports = router;
