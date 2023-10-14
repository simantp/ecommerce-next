const Order = require("../models/order");

const addNewOrder = async (req, res) => {
  try {
    const { userId, orderList, total } = req.body;

    const existingOrder = await Order.findOne({ user: userId });

    if (existingOrder) {
      existingOrder.orders.push({ orderList, total });
      await existingOrder.save();
      return res
        .status(200)
        .json({ orderData: existingOrder, msg: "Order Updated" });
    } else {
      const orderData = await Order.create({
        user: userId,
        orders: [{ orderList, total }],
      });
      return res.status(200).json({ orderData, msg: "New Order Added" });
    }
  } catch (error) {
    console.error("Error creating new order:", error);
    return res.status(500).json({ error: "Failed to create/update the order" });
  }
};

const getOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const orders = await Order.find({ user: id }).populate("user");

    return res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ error: "Failed to retrieve orders" });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find().populate("user");

    return res.json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return res.status(500).json({ error: "Failed to retrieve all orders" });
  }
};

const updateOrderStatus = async (req, res) => {};

module.exports = {
  addNewOrder,
  getOrder,
  getAllOrder,
  updateOrderStatus,
};
