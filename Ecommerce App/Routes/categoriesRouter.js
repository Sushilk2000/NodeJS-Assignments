const express = require("express");
const router = express.Router();

const authMiddleware = require("../Middlewares/productMiddleware");
const categoryController = require("../Controllers/categoryController");

router.get(
  "/",
  authMiddleware(["admin", "user"]),
  categoryController.getCategories
);

module.exports = { router };
