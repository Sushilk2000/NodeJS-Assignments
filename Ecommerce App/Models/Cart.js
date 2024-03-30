const mongoose = require("mongoose");
const cartProduct = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
  quantity: {
    type: Number,
  },
});

const cartSchema = new mongoose.Schema({
  products: {
    type: [cartProduct],
  },
  cartTotal: {
    type: Number,
    required: false,
    default: 0,
  },
  cartDiscountedTotal: {
    type: Number,
    required: false,
    default: 0,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const cartModel = mongoose.model("cart", cartSchema);

module.exports = {
  cartModel,
  cartProduct,
  cartSchema,
};
