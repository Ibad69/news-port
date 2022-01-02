const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },

    DOB: {
      type: Date,
      required: true,
    },

    mobile: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },

    password: {
      type: String,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
      required: true,
    },

    posting: {
      type: Boolean,
    },

    zipCode: {
      type: String,
      required: true,
    },

    userBlocks: [
      {
        userId: { type: "String" },
      },
    ],

    blockByAdmin: {
      type: Boolean,
      default: 0,
    },

    userFollowers: [{ userId: { type: Schema.Types.ObjectId, ref: "User" } }],

    userFollowing: [{ userId: { type: Schema.Types.ObjectId, ref: "User" } }],

    pendingRequest: [{ userId: { type: Schema.Types.ObjectId, ref: "User" } }],

    resetToken: {
      type: String,
      required: false,
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
  }
  // { strictPopulate: false },
  // { strict: false }
);

module.exports = mongoose.model("User", userSchema);
