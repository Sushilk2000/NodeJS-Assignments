const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/productMiddleware");
const checkoutController = require("../Controllers/checkout");

router.post(
  "/",
  authMiddleware(["user", "admin"]),
  checkoutController.checkoutCart
);

module.exports = { router };
