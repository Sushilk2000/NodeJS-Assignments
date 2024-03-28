import { cartModel } from "../Models/Cart";
import { UserModel } from "../Models/UserModel";
import { OrderModel } from "../Models/Order";
import dayjs from "dayjs";
const razorpay = require("razorpay");
var instance = new razorpay({
  key_id: "Your Key Id",
  key_secret: "Your key secret",
});

export const checkout = async (req, res) => {
  try {
    const UserId = req.user._id;
    const User = await UserModel.findById(UserId, { address: 1 });
    if ("{}" === JSON.stringify(User.address)) {
      throw new Error("No address");
    }

    const cart = await cartModel.findOne({ user: UserId }).populate({
      path: "products.item",
      select: "name price",
    });
    if (cart.products.length === 0) {
      throw new Error("Cart is Empty");
    }
    const total = cart.products.reduce((sum, cartItem) => {
      sum + cartItem.quantity * cartItem.price, 0;
    });
    const randomNumber = Math.floor(Math.random() * 7);
    const deliveryDate = dayjs().add(randomNumber, "days").valueOf();

    const order = {
      cart,
      total,
      date: Date.now(),
      deliveryDate: deliveryDate,
      coupon: req.body.coupon || null,
      orderStatus: "placed",
      paymentMode: req.body.paymentMode || "COD",
      transactionId: null,
    };
    const orderObject = await OrderModel.findOne({
      userId: UserId,
    });

    if (!orderObject) {
      const newOrder = await OrderModel({
        userId: UserId,
        orders: [order],
      });
      await newOrder.save();
    } else {
      await OrderModel.findOneAndUpdate(
        { userId: UserId },
        { $push: { orders: order } }
      );
    }
    await cartModel.findByIdAndDelete(cart._id);
    res.json({
      success: true,
      message: "Checkout successful",
      order: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Checkout Failed",
    });
  }
};
