const express = require("express");
const router = express.Router();
// const { authenticateToken } = require("../middlewares/authorization");
const { registerUser, loginUser } = require("../services/authService");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

module.exports = router;
