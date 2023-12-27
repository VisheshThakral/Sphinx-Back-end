const mongoose = require("mongoose");

const repostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sphinxId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sphinx",
    required: true,
  },
});

module.exports = mongoose.model("Repost", repostSchema);


