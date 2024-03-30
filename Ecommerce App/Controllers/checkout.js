const { cartModel } = require("../Models/Cart.js");
const { userModel } = require("../Models/UserModel.js");
const dayjs = require("dayjs");
const { orderModel } = require("../Models/Order.js");
const Razorpay = require("razorpay");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");
const { couponModel } = require("../Models/Coupon.js");

dotenv.config();
console.log(process.env.RAZORPAY_KEY_ID);
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const checkoutCart = async (req, res) => {
  try {
    const userID = req.user._id;
    const paymentMode = req.body.paymentMode;
    const coupon = req.body.coupon;

    const user = await userModel.findById(userID, { address: 1 });

    if ("{}" === JSON.stringify(user.address)) {
      throw new Error("No address");
    }

    const cart = await cartModel.findOne({ user: userID }).populate({
      path: "products.item",
      select: "name price",
    });

    if (cart.products.length === 0) {
      throw new Error("Cart is empty");
    }

    let total = cart.products.reduce(
      (sum, cartItem) => sum + cartItem.quantity * cartItem.item.price,
      0
    );

    if (coupon) {
      const couponData = await couponModel.findOne({ code: coupon }).populate({
        path: "coupons",
      });

      const discount = couponData.discount;
      const discountAmount = (total * discount) / 100;

      total = total - Math.min(discountAmount, couponData.limit);
    }

    const randomNumber = Math.floor(Math.random() * 7);
    const deliveryDate = dayjs().add(randomNumber, "days").valueOf();

    const options = {
      amount: total * 100,
      currency: "INR",
      receipt: uuidv4(),
      payment_capture: 1,
    };
    let RPOrder;
    if (paymentMode === "online") {
      try {
        RPOrder = await razorpay.orders.create(options);
      } catch (error) {
        console.error("Razorpay Order Creation Error:", error);
        throw new Error("Failed to create Razorpay order");
      }
    }

    const order = {
      cart,
      total,
      date: Date.now(),
      deliveryDate: deliveryDate,
      coupon: req.body.coupon || null,
      orderStatus: "Placed",
      paymentMode: paymentMode,
      paymentStatus: paymentMode === "cod" ? "Paid" : "Pending",
      RPOrder: paymentMode === "cod" ? null : RPOrder,
    };

    const Order = await orderModel.findOne({
      user: userID,
    });

    if (!Order) {
      const orderHistory = new orderModel({
        user: userID,
        orders: [order],
      });
      await orderHistory.save();
    } else {
      await orderModel.findOneAndUpdate(
        { user: userID },
        { $push: { orders: order } }
      );
    }

    await cartModel.findByIdAndDelete(cart._id);

    res.status(200).json({
      success: true,
      message: "Checkout successful and cart deleted",
      order: order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Checkout failed",
    });
  }
};

const confirmPayment = async (req, res) => {
  try {
    const orderID = req.body.orderID;

    const updatedOrder = await orderModel.findOneAndUpdate(
      { "orders.cart._id": orderID },
      { $set: { "orders.$.paymentStatus": "Paid" } }
    );

    res.json({
      success: true,
      message: "Payment successful",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Payment failed",
    });
  }
};

module.exports = {
  checkoutCart,
  confirmPayment,
};
