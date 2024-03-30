const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/productMiddleware");
const userController = require("../Controllers/userController");
router.post("/register", userController.userRegistrator);
router.post("/login", userController.userLogin);
router.post("/logout", userController.userLogout);
router.get(
  "/likedProducts",
  authMiddleware(["admin", "user"]),
  userController.getLikedProducts
);
router.get(
  "/dislikedProducts",
  authMiddleware(["admin", "user"]),
  userController.getDislikedProducts
);
router.post(
  "/deleteUser",
  authMiddleware(["admin", "user"]),
  userController.deleteUser
);
router.post(
  "/updateUser",
  authMiddleware(["admim", "user"]),
  userController.userUpdate
);
router.post(
  "/updateWishlist",
  authMiddleware(["admim", "user"]),
  userController.WishlistUpdatation
);
router.post(
  "/addtocart",
  authMiddleware(["admim", "user"]),
  userController.addToCart
);
router.post(
  "/updateproductquantity",
  authMiddleware(["admim", "user"]),
  userController.updateProductQuantity
),
  router.post(
    "/deleteproductfromcart",
    authMiddleware(["admim", "user"]),
    userController.deleteProductFromCart
  );
// router.post("/forgotpassword", userController.forgotPassword);
module.exports = router;
