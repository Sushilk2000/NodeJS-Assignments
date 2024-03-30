const express = require("express");
const router = express.Router();

const authMiddleware = require("../Middlewares/productMiddleware");

const orderController = require("../Controllers/orders");

router.get("/", authMiddleware(["admin", "user"]), orderController.getOrders);

module.exports = { router };
