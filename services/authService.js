const User = require("../models/User");
const asyncWrapper = require("../utils/async");
const { createAccessToken } = require("../helpers/jwt_helper");

const registerUser = asyncWrapper(async (req, res) => {
  const value = req.body;
  const user = await User.findOne({ email: value.email });
  if (user) {
    return res.json({ msg: "User already exists" });
  }
  const userToBeStored = new User(value);
  await userToBeStored.save();
  res.json({ msg: "User registered Successfully" });
});

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user === null) {
    return res.json({ msg: "User doesn't exist" });
  }

  const isMatch = await user.isValidPassword(password);
  if (!isMatch) {
    return res.status(401).json({ msg: "Password is incorrect" });
  }
  const accessToken = await createAccessToken(user._id.toString());
  const { _id, __v, password: Password, ...userData } = user.toObject();

  res.header("Authorization", "Bearer " + accessToken).json({
    msg: "Login Successfully",
    data: {
      userId: user._id,
      ...userData,
    },
  });
};

module.exports = {
  registerUser,
  loginUser,
};
