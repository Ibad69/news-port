const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
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
});

module.exports = mongoose.model("Category", categorySchema);
