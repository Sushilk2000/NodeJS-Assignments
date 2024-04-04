const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
      validator: function (val) {
        return this.role === "patient";
      },
      message: "AppointmentHistory is only available for patients",
    },
    select: false,
  },
});
UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});
const UserModel = mongoose.model("Users", UserSchema);
module.exports = UserModel;
