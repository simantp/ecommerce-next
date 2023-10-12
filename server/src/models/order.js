const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const orderItemSchema = new Schema(
  {
    productId: {
      type: ObjectId,
      ref: "Product",
    },
    title: String,
    price: Number,
    quantity: Number,
  },
  {
    _id: false,
  }
);

const orderSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },
    orders: [
      {
        orderList: [orderItemSchema],
        total: Number,
        orderStatus: {
          type: String,
          enum: ["pending", "shipped", "delivered", "cancelled"],
          default: "pending",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
