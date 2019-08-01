const mongoose = require("mongoose");

const Box = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true
    },
    files: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File"
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Box", Box);
