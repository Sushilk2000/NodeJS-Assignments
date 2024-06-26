const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  tokens: {
    type: Array,
    default: [],
  },
  wishlist: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "products",
  },
  address: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    district: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: Number,
    },
    country: {
      type: String,
    },
  },
  likedProducts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "products",
    default: [],
  },
  dislikedProducts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "products",
    default: [],
  },
});
userSchema.pre("save", function () {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
});
const UserModel = mongoose.model("users", userSchema);

module.exports = { UserModel, userSchema };
