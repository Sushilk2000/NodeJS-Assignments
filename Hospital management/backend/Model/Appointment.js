const mongoose = require("mongoose");
const AppointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dateOfAppointment: {
    type: Date,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "pending",
  },
});
const AppointmentHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dateOfAppointment: {
    type: Date,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "pending",
  },
  success: {
    type: Boolean,
    default: false,
    enum: [false, true],
  },
  notes: {
    type: String,
    default: "",
  },
});
const AppointmentModel = mongoose.model("Appointments", AppointmentSchema);
const AppointmentHistoryModel = mongoose.model(
  "AppointmentHistory",
  AppointmentHistorySchema
);
module.exports = { AppointmentModel, AppointmentHistoryModel };
