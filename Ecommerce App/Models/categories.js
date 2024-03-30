const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true,
  },
});

const categoriesModel = mongoose.model("Categories", categoriesSchema);

module.exports = { categoriesModel };
