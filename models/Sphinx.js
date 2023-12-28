const mongoose = require("mongoose");

const sphinxSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Sphinx", sphinxSchema);
