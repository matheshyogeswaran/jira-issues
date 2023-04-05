const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  summary: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  projectName: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdTime: {
    type: Date,
    required: true,
  },
});

const Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;
