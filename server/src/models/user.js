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
  firstName: { type: String },
  lastName: { type: String },
  country: { type: String, default: "Nepal" },
  streetAddress: { type: String },
  city: { type: String },
  state: { type: String },
  orderData: [{ type: Object }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
