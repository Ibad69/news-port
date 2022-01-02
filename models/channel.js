const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const channelSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
    },

    coverImage: {
      type: String,
    },

    blockStatus: {
      type: Boolean,
      required: true,
      default: 0,
    },

    posting: {
      type: Boolean,
      required: true,
      default: 0,
    },

    posts: [
      {
        title: { type: "String" },
        description: { type: "String" },
        blockStatus: { type: "Boolean", default: 0 },
        likes: [
          {
            userId: { type: Schema.Types.ObjectId, ref: "User" },
          },
        ],

        dislikes: [
          {
            userId: { type: Schema.Types.ObjectId, ref: "User" },
          },
        ],
        views: { type: "Number", default: 0 },
        comments: [
          {
            userId: { type: Schema.Types.ObjectId, ref: "User" },
            comment: { type: "String" },
          },
        ],
        image: [
          {
            imageUrl: { type: "String" },
          },
        ],
        video: [
          {
            videoUrl: { type: "String" },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Channel", channelSchema);
