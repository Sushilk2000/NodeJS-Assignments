const express = require("express");
const router = express.Router();

const authMiddleware = require("../Middlewares/productMiddleware");
const blogsController = require("../Controllers/blogsController");

router.post("/", authMiddleware(["admin", "user"]), blogsController.createBlog);
router.get(
  "/getById",
  authMiddleware(["admin", "user"]),
  blogsController.getBlog
);
router.get(
  "/blogsByAuthor",
  authMiddleware(["admin", "user"]),
  blogsController.getBlogsByAuthor
);
router.get(
  "/authors",
  authMiddleware(["admin", "user"]),
  blogsController.getAuthors
);

module.exports = router;
