const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/productMiddleware");
const checkoutController = require("../Controllers/checkout");

router.post(
  "/",
  authMiddleware(["admin", "user"]),
  checkoutController.checkoutCart
);

router.post(
  "/confirmPayment",
  authMiddleware(["admin", "user"]),
  checkoutController.confirmPayment
);

module.exports = { router };
