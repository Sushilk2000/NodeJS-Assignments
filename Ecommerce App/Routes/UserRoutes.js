const express = require("express");
const router = express.Router();

const userController = require("../Controllers/userController");
router.post("/register", userController.userRegistrator);
router.post("/login", userController.userLogin);
router.post("/logout", userController.userLogout);
module.exports = router;
