const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  userName: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: [true],
    enum: ["customer", "admin"],
    default: "customer",
  },
  avatarImage: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  country: { type: String, default: "Nepal", required: true },
  streetAddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
