const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/productMiddleware");
const userController = require("../Controllers/userController");
router.post("/register", userController.userRegistrator);
router.post("/login", userController.userLogin);
router.post("/logout", userController.userLogout);
router.get(
  "user/likedProducts",
  authMiddleware(["admin", "user"]),
  userController.getLikedProducts
);
router.get(
  "user/dislikedProducts",
  authMiddleware(["admin", "user"]),
  userController.getDislikedProducts
);
router.post(
  "user/deleteUser",
  authMiddleware(["admin", "user"]),
  userController.deleteUser
);
router.post(
  "user/updateUser",
  authMiddleware(["admim", "user"]),
  userController.userUpdate
);
router.post(
  "user/updateWishlist",
  authMiddleware(["admim", "user"]),
  userController.WishlistUpdatation
);
router.post(
  "user/addtocart",
  authMiddleware(["admim", "user"]),
  userController.addToCart
);
router.post(
  "user/updateproductquantity",
  authMiddleware(["admim", "user"]),
  userController.updateProductQuantity
),
  router.post(
    "user/deleteproductfromcart",
    authMiddleware(["admim", "user"]),
    userController.deleteProductFromCart
  )((module.exports = router));
