const express = require("express");
const router = express.Router();

const productController = require("../Controllers/productController");
router.post("/", productController.createProduct);
router.get("/", productController.getProduct);
router.patch("/", productController.editProduct);
module.exports = router;
