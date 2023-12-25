const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Must Provide Full Name"],
    trim: true,
    maxLength: [20, "Name can't be more than 20 characters"],
  },
  userName: {
    type: String,
    required: [true, "Must Provide user Name"],
    trim: true,
    maxLength: [20, "Name can't be more than 20 characters"],
  },
  email: {
    type: String,
    required: [true, "Must Provide email"],
  },
  password: {
    type: String,
    required: [true, "Must Provide Password"],
  },
  userImage: {
    type: String,
    require: [true, "Must Provide user image"],
  },
});

userSchema.pre("save", async function (next) {
  const hash = await bcrypt.hashSync(this.password, 10);
  this.password = hash;
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = mongoose.model("User", userSchema);
