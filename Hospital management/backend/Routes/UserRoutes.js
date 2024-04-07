const express = require("express");
const router = express.Router();
const UserController = require("../Controller/User");
router.post("/registeruser", UserController.registerUser);
router.post("/loginuser", UserController.login);
router.patch("/updateuser", UserController.updateUser);
router.delete("deleteuser", UserController.deleteUser);
router.post("/createdoctor", UserController.createDoctor);
router.post("/createadmin", UserController.createAdmin);
module.exports = router;
