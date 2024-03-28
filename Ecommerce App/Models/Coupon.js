const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema({
  couponCode: {
    type: String,
    required: true,
    unique: true,
  },
  discountedPercentage: {
    type: number,
    required: true,
  },
  maxDiscountInRs: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const CouponModel = mongoose.model("coupons", CouponSchema);

module.exports = { CouponModel };
