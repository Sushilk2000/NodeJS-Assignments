const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    default: "",
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  liked: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "users",
    default: [],
  },
  disliked: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "users",
    default: [],
  },
  rating: {
    type: [
      {
        value: {
          type: Number,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
      },
    ],
    default: [],
  },
  reviews: {
    type: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
        review: {
          type: String,
        },
      },
    ],
  },
});

const productModel = mongoose.model("products", productSchema);
module.exports = { productModel };
