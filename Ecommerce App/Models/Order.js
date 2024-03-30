const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  products: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      quantity: { type: Number, required: true },
      variant: { type: String, required: true, default: "Default" },
    },
  ],
});

const orderHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  orders: [
    {
      cart: cartSchema,
      total: {
        type: Number,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
      deliveryDate: {
        type: String,
        required: true,
      },
      coupon: {
        type: String,
        default: null,
      },
      paymentStatus: {
        type: String,
        required: true,
      },
      paymentMode: {
        type: String,
        required: true,
      },
      RPOrder: {
        type: Object,
        default: null,
      },
    },
  ],
});

const orderModel = mongoose.model("orderHistory", orderHistorySchema);

module.exports = {
  orderModel,
};
