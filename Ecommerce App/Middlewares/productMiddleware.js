const jwt = require("jsonwebtoken");
const authMiddleware = async (req, res, next) => {
  if (req.headers.authorization.startsWith("Bearer")) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "abcabcabcabc", (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Invalid token",
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    const token = req.headers.authorization;
    jwt.verify(token, "abcabcabcabc", (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Invalid token",
        });
      }
      req.decoded = decoded;
      next();
    });
  }
};

module.exports = authMiddleware;
