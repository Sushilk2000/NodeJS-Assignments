const express = require("express");
const mongoose = require("mongoose");
const authMiddleware = require("./Middlewares/productMiddleware");
const app = express();
const userRouters = require("./Routes/UserRoutes");
const productRouters = require("./Routes/ProductRoute");
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

app.listen(10000, () => {
  console.log(`Server is up and running at port 10000`);
});
