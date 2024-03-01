const express = require("express");
const mongoose = require("mongoose");
const jobRoutes = require("./routes/jobs");
const app = express();
const port = 10000;
mongoose
  .connect(
    `mongodb+srv://sushilkkkkk:QoI4DCBcFnz04hHv@cluster0.td0apik.mongodb.net/`
  )
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });

app.use(express.json());
app.use("/api/v1/jobs/", jobRoutes);

app.listen(port, () => console.log("server is up and running at", port));
