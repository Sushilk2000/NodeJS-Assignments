const jwt = require("jsonwebtoken");
const { UserModel } = require("../Models/UserModel");
const authMiddleware = (role) => async (req, res, next) => {
  try {
    const tokenFromHeaders = req.headers.authorization.split(" ")[1];
    console.log("TOKEN", tokenFromHeaders);
    const payload = jwt.decode(tokenFromHeaders);
    console.log("PAYLOAD", payload);

    if (role.includes(payload.role)) {
      const user = await UserModel.findById(payload.id);
      console.log("USER", user);
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(403).json({
          success: false,
          message: "User not found",
        });
      }
    } else {
      res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(403).json({
      success: false,
      message: "Forbidden",
    });
  }
};

module.exports = authMiddleware;
