const { AppointmentModel } = require("../Model/Appointment");
const { AppointmentHistoryModel } = require("../Model/Appointment");

const createAppointment = async (req, res) => {
  try {
    const appointmentData = req.body;
    const appointment = await AppointmentModel.create(appointmentData);
    res.json({
      success: true,
      message: "Appointments created successfully",
      AppointmentDetails: appointment,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};
const UserAppointmentHistory = async (req, res) => {
  try {
    const Appointments = await AppointmentModel.find({ user: req.user._id });
    res.json({
      success: true,
      Appointments: Appointments,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};
const activeAppointmentsByDocter = async (req, res) => {
  try {
    const appointments = await AppointmentModel.find({
      doctor: req.params.doctorId,
    });
    res.json({
      success: true,
      appointments: appointments,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const deleted = await AppointmentModel.findByIdAndDelete(
      req.params.AppointmentId
    );
    res.json({
      success: true,
      message: "Appointment has been deleted successfully",
      appointment: deleted,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const updateField = req.params.field;
    const updateValue = req.body.updateValue;
    const updateObject = {
      $set: {},
    };
    updateObject.$set[updateField] = updateValue;
    const updated = AppointmentModel.findByIdAndUpdate(
      req.params.AppointmentId,
      updateObject
    );
    res.json({
      success: true,
      message: "Appointment updated successfully",
      Appointment: updated,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};
const getAllActiveAppointments = async (req, res) => {
  try {
    const Appointments = await AppointmentModel.find();
    res.json({
      success: true,
      Appointments: Appointments,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};
module.exports = {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  UserAppointmentHistory,
  activeAppointmentsByDocter,
  getAllActiveAppointments,
};
