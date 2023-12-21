const User = require("../models/User");
const asyncWrapper = require("../utils/async");
const { signAccessToken } = require("../utils/jwt_helper");

const registerUser = asyncWrapper(async (req, res) => {
  const value = req.body;
  const user = await User.findOne({ email: value.email });
  if (user) {
    return res.send("User already exists");
  }
  const userToBeStored = new User(value);
  await userToBeStored.save();
  res.send("User registered Successfully");
});

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user === null) {
    return res.send("User doesn't exist");
  }

  const isMatch = await user.isValidPassword(password);
  if (!isMatch) {
    return res.status(401).send("Password is incorrect");
  }
  const accessToken = await signAccessToken(user._id.toString());
  res
    .header("Authorization", "Bearer " + accessToken)
    .json({ userId: user._id, msg: "Login Successfully" });
};

module.exports = {
  registerUser,
  loginUser,
};
