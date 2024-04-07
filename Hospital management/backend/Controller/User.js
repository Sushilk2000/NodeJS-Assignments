const UserModel = require("../Model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { urlencoded } = require("express");
const registerUser = async (req, res) => {
  try {
    const user = req.body;
    await UserModel.create(user);
    res.status(200).json({
      success: true,
      message: "User created successfully",
      user: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error,
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user._id,
      req.body
    );
    res.json({
      success: true,
      message: "User updated successfully",
      updatedUser: updatedUser,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error,
    });
  }
};
const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      const inputPassword = req.body.password;
      const isPasswordCorrect = bcrypt.compareSync(
        inputPassword,
        user.password
      );
      if (!isPasswordCorrect) {
        res.status(404).json({
          success: false,
          message: "Invalid password",
          error: isPasswordCorrect,
        });
      } else {
        const exptime = Math.floor(Date.now() / 1000 + 3600);
        const token = jwt.sign(
          {
            name: user.firstName,
            role: user.role,
            id: user._id,
            exp: exptime,
          },
          "abcabcabc"
        );
        delete user._id;
        delete user.password;
        res.json({
          success: true,
          message: "User logged in successfully",
          token: token,
          user: user,
        });
      }
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error,
    });
  }
};
const deleteUser = (req, res) => {
  try {
    const deletedUser = UserModel.findByIdAndDelete(req.user._id);
    res.json({
      success: true,
      message: "User deleted successfully",
      deletedUser: deletedUser,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error,
    });
  }
};
const createDoctor = async (req, res) => {
  try {
    const doctor = req.body;
    doctor.role = "doctor";
    await UserModel.create(doctor);
    res.status(200).json({
      success: true,
      message: "Doctor created successfully",
      doctor: doctor,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error,
    });
  }
};
const createAdmin = async (req, res) => {
  try {
    const admin = req.body;
    admin.role = "admin";
    await UserModel.create(admin);
    res.status(200).json({
      success: true,
      message: "Admin created successfully",
      admin: admin,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error,
    });
  }
};
const getDoctors = async (req, res) => {
  try {
    const doctors = await UserModel.find({ role: "doctor" });
    res.json({
      success: true,
      doctors: doctors,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error,
    });
  }
};
module.exports = {
  registerUser,
  login,
  updateUser,
  deleteUser,
  createDoctor,
  createAdmin,
  getDoctors,
};
