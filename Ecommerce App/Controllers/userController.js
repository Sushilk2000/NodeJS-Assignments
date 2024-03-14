const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRegistrator = async (req, res) => {
  const newUser = new UserModel({
    ...req.body,
  });
  await newUser.save();
  res.json({
    success: true,
    message: "User registered successfully",
  });
};
const userLogin = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    console.log(user);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (isPasswordCorrect) {
      const exptime = Math.floor(Date.now() / 1000) + 3600;
      const token = jwt.sign(
        {
          name: user.firstName,
          role: user.role,
          exp: exptime,
        },
        "abcabcabcabc"
      );
      res.json({
        success: true,
        message: "User logged in successfully",
        token: token,
      });
    } else {
      res.json({
        success: false,
        message: "Invalid password",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
    console.log(error);
  }
};

const userLogout = async (req, res) => {
  try {
    res.json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
  }
};
const getLikedProducts = async (req, res) => {
  try {
    const result = await UserModel.findById(req.params.user._id).likedProducts;
    res.json({
      success: true,
      message: `User ${req.params.user.firstName} has liked following products`,
      results: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
    console.log(err);
  }
};
const getDislikedProducts = async (req, res) => {
  try {
    const result = await UserModel.findById(req.params.user._id)
      .dislikedProducts;
    res.json({
      success: true,
      message: `User ${req.params.user.firstName} has disliked following products`,
      results: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
    console.log(error);
  }
};
module.exports = {
  userRegistrator,
  userLogin,
  userLogout,
  getLikedProducts,
  getDislikedProducts,
};
