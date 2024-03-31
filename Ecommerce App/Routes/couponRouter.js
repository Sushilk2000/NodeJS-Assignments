const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/productMiddleware");
const couponController = require("../Controllers/coupon");

router.post(
  "/",
  authMiddleware(["user", "admin"]),
  couponController.createCoupon
);
router.get("/", authMiddleware(["user", "admin"]), couponController.getCoupon);

module.exports = router;
