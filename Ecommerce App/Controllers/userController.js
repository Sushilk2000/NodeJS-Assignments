const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
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
      res.json({
        success: true,
        message: "User logged in successfully",
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
  }
};

const userLogout = (req, res) => {
  try {
    res.json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userRegistrator,
  userLogin,
  userLogout,
};
