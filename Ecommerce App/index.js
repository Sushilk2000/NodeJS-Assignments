const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRouters = require("./Routes/UserRoutes");
const productRouters = require("./Routes/ProductRoute");
const cartRouter = require("./Routes/cartRouter");
const brandRouters = require("./Routes/brandRouter");
const checkoutRouters = require("./Routes/checkoutRoute");
const categoriesRouters = require("./Routes/categoriesRouter");
const blogsRouters = require("./Routes/blogsRouter");
const couponRouters = require("./Routes/couponRouter");
const checkoutRouter = require("./Routes/checkoutRouter");
const orderRouter = require("./Routes/orderRouter");
app.use(express.json());
mongoose
  .connect("mongodb+srv://sushilkkkkk:Justmenu@cluster0.pil2sin.mongodb.net/")
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });
app.use("/api/v1/user", userRouters);
app.use("/api/v1/product", productRouters);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/brands", brandRouters);
app.use("/api/v1/checkout", checkoutRouters);
app.use("api/v1/categories", categoriesRouters);
app.use("api/v1/blogs", blogsRouters);
app.use("api/v1/coupon", couponRouters);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/checkout", checkoutRouter);
app.listen(10000, () => {
  console.log(`Server is up and running at port 10000`);
});
