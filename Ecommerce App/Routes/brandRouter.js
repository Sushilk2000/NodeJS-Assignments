const express = require("express");
const router = express.Router();

const authMiddleware = require("../Middlewares/productMiddleware");
const brandController = require("../Controllers/brandController");

router.get("/", authMiddleware(["admin", "user"]), brandController.getBrands);

module.exports = router;
