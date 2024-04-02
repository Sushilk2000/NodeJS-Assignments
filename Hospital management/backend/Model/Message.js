const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    minlenght: [10, "phone must contain at least 10 characters"],
    maxlength: [10, "phone must contain at most 10 characters"],
  },
  message: {
    type: String,
    required: true,
    minlenght: [10, "message must contain at least 10 characters"],
  },
});

const messageModel = mongoose.model("Messages", messageSchema);
module.exports = messageModel;
