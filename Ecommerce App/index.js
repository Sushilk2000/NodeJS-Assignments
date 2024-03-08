const express = require("express");
const mongoose = require("mongoose");

const app = express();
const userRouters = require("./Routes/UserRoutes");
app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://sushilkkkkk:justmenu123@appcluster0.ct5uxuz.mongodb.net/"
  )
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
