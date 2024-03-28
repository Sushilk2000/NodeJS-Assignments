import { CouponModel } from "../Models/Coupon";

const createCoupon = async (req, res) => {
  try {
    await CouponModel.create(req.body);
    res.json({
      success: true,
      message: "Coupon created successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went Wrong",
    });
  }
};

const getCoupon = async (req, res) => {
  try {
    const couponList = await CouponModel.find({
      isActive: true,
    });
    res.json({
      success: true,
      message: "List of Coupons",
      couponList: couponList,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went Wrong",
    });
  }
};

module.exports = {
  getCoupon,
  createCoupon,
};
