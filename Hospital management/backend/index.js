const express = require("express");
const app = express();
const port = 10000;
const AppointmentRouter = require("./Routes/AppointmentRoute");
const UserRouter = require("./Routes/UserRoutes");
app.use("/api/v1/appointments", AppointmentRouter);
app.use("/api/v1/user", UserRouter);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
