const express = require("express");
const router = express.Router();
const UserController = require("../Controller/User");
router.post("/registerUser", UserController.registerUser);
router.get("/loginUser", UserController.login);
router.patch("/updateUser", UserController.updateUser);
router.delete("deleteuser", UserController.deleteUser);

module.exports = router;
