const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    length: 10,
  },
  address: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"],
  },
  dob: {
    type: Date,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "doctor", "patient"],
  },
  AppointmentHistory: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Appointments",
    validate: {
      validator: function () {
        return this.role === "patient";
      },
      message: "AppointmentHistory is only available for patient",
    },
    select: false,
  },
});

const UserModel = mongoose.model("Users", UserSchema);
module.exports = UserModel;
