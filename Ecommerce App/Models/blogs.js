const mongoose = require("mongoose");
const blogsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const authorSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  blogs: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Blogs",
  },
});
const authorModel = mongoose.model("authors", authorSchema);
const blogsModel = mongoose.model("Blogs", blogsSchema);
module.exports = { blogsModel, authorModel };
