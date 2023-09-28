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
    default: "customer",
    enum: ["customer", "admin"],
  },
  avatarImage: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
