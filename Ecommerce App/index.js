const express = require("express");
const mongoose = require("mongoose");

const app = express();
const userRouters = require("./Routes/UserRoutes");
app.use(express.json());
mongoose
  .connect(`mongodb+srv://sushilkkkkk:Justmenu@cluster0.pil2sin.mongodb.net/`)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });
app.use("/api/v1/user", userRouters);

app.listen(10000, () => {
  console.log(`Server is up and running at port 10000`);
});