const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  sphinxId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sphinx",
    required: [true, "Must Provide sphinx id"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Must Provide user id"],
  },
  content: {
    type: String,
    required: [true, "Must Provide content"],
    trim: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Quote", quoteSchema);
