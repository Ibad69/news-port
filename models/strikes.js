const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const strikeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    contactNo: {
      type: String,
    },

    description: {
      type: String,
    },

    isActive: {
      type: Boolean,
      required: true,
      default: 1,
    },

    isDeleted: {
      type: Boolean,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Strike", strikeSchema);
