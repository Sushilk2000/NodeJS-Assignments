const express = require("express");
const env = require("dotenv");
env.config({ path: "./Config/config.env" });
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");
const app = express();
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
const cors = require("cors");
app.use(cors({ origin: "*" }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT;
const AppointmentRouter = require("./Routes/AppointmentRoute");
const UserRouter = require("./Routes/UserRoutes");
const MessagesRouter = require("./Routes/messageRoute");
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("Could not connect to MongoDB");
  });
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/appointments", AppointmentRouter);
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/message", MessagesRouter);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
