const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const postSchema = new Schema(
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
    },

    location: {
      type: String,
    },

    image: [
      {
        imageUrl: { type: "String" },
      },
    ],

    videos: [
      {
        videoUrl: { type: "String" },
      },
    ],

    blockStatus: {
      type: Boolean,
      required: true,
      default: 0,
    },

    availability: {
      type: Boolean,
      required: true,
      default: 1,
    },

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

    views: {
      type: Number,
      required: true,
      default: 0,
    },

    comments: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        comment: { type: "String" },
        createdAt: { type: Date, default: Date.now() },
      },
    ],
  },
  { timestamps: true }
  // { strictPopulate: false },
  // { strict: false }
);

module.exports = mongoose.model("Post", postSchema);
