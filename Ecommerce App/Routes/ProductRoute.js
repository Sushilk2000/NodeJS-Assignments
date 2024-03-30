const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/productMiddleware");
const productController = require("../Controllers/productController");
router.post("/", authMiddleware(["admin"]), productController.createProduct);
router.get(
  "/",
  authMiddleware(["admin", "user"]),
  productController.getProduct
);
router.patch(
  "/edit/:productId",
  authMiddleware(["admin"]),
  productController.editProduct
);
router.get(
  "/productByBrand/:brand",
  authMiddleware(["admin", "user"]),
  productController.getProductbyBrand
);
router.post(
  "/:productId/likedislike/:action",
  authMiddleware(["admin", "user"]),
  productController.likeDislikeProduct
);
router.post(
  "/:productId/review/",
  authMiddleware(["admin", "user"]),
  productController.ratingAndReview
);
router.post(
  "/:productId/delete",
  authMiddleware(["admin"]),
  productController.deleteProduct
);

module.exports = router;
