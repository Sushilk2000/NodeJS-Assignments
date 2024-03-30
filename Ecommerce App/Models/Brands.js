const mongoose = require("mongoose");
const brandsSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  products: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "products",
    default: [],
  },
});

const brandModel = mongoose.model("Brands", brandsSchema);
module.exports = {
  brandModel,
};
