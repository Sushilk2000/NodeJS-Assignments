const jwt = require("jsonwebtoken");
const authMiddleware = (role = async (req, res, next) => {
  try {
    const tokenFromHeaders = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(tokenFromHeaders, "abcabcabcabc");
    const payload = jwt.decode(tokenFromHeaders);
    if (role.includes(payload.role)) {
      const user = await UserModel.findById(payload.id);
      req.user = user;
      next();
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
});

module.exports = authMiddleware;
