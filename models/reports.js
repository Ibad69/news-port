const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const reportSchema = new Schema({
  reportOption: {
    type: String,
    required: true,
  },

  reports: [
    {
      reportedByUser: { type: Schema.Types.ObjectId, ref: "User" },
      reportedPost: { type: Schema.Types.ObjectId, ref: "Post" },
      reportText: { type: String },
    },
  ],
});

module.exports = mongoose.model("Report", reportSchema);
