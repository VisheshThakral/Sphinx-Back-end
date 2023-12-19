const mongoose = require("mongoose");

const sphinxSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must Provide name"],
    trim: true,
    maxLength: [20, "Name can't be more than 20 characters"],
  },
  content: {
    type: String,
    required: [true, "Must Provide content"],
    trim: true,
  },
  userName: {
    type: String,
    required: [true, "Must Provide user name"],
    trim: true,
  },
  likes: {
    type: Number,
    required: [true, "Must Provide likes count"],
  },
  repost: {
    type: Number,
    required: [true, "Must Provide repost count"],
  },
  views: {
    type: Number,
    required: [true, "Must Provide views count"],
  },
  authImg: {
    type: String,
  },
  comments: {
    type: Number,
    required: [true, "Must Provide comments count"],
  },
  createdAt: {
    type: Date,
    required: [true, "Must Provide comments count"],
  },
});

module.exports = mongoose.model("Sphinx", sphinxSchema);
