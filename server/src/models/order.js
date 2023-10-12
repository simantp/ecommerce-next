const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  OrderData: [{ type: Object }],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
