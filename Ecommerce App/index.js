const express = require("express");
const mongoose = require("mongoose");

const app = express();
const userRouters = require("./Routes/UserRoutes");
app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });
app.use("/api/v1/user", userRouters);

app.listen(10000, () => {
  console.log(`Server is up and running at port 10000`);
});
