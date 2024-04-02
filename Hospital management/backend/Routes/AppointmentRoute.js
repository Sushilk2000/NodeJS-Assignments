const express = require("express");
const router = express.Router();
const AppointmentsController = require("../Controller/Appointment");
router.get(
  "/getAllAppointments",
  AppointmentsController.getAllActiveAppointments
);
router.post("/createAppointment", AppointmentsController.createAppointment);
router.get(
  "/getAppointmentByDoctor/:doctorId",
  AppointmentsController.activeAppointmentsByDocter
);
router.delete(
  "/deleteAppointment/:AppointmentId",
  AppointmentsController.deleteAppointment
);
router.patch(
  "/updateAppointment/:AppointmentId/:field",
  AppointmentsController.updateAppointment
);
router.get(
  "/getAppointmentHistory",
  AppointmentsController.UserAppointmentHistory
);
module.exports = router;
