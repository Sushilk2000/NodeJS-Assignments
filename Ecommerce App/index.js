const express = require("express");
const mongoose = require("mongoose");
const authMiddleware = require("./Middlewares/productMiddleware");
const app = express();
const userRouters = require("./Routes/UserRoutes");
const productRouters = require("./Routes/ProductRoute");
app.use(express.json());
mongoose
  // `mongodb+srv://sushilkkkkk:Justmenu@cluster0.pil2sin.mongodb.net/`
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });
app.use("/api/v1/user", userRouters);
app.use("/api/v1/product", authMiddleware, productRouters);
app.listen(10000, () => {
  console.log(`Server is up and running at port 10000`);
});
