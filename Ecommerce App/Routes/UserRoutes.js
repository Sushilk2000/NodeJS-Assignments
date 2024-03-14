const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/productMiddleware");
const userController = require("../Controllers/userController");
router.post("/register", userController.userRegistrator);
router.post("/login", userController.userLogin);
router.post("/logout", userController.userLogout);
router.get(
  "products/liked",
  authMiddleware(["admin", "user"]),
  userController.getLikedProducts
);
router.get(
  "products/disliked",
  authMiddleware(["admin", "user"]),
  userController.getDislikedProducts
);
module.exports = router;
