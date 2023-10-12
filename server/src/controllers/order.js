const Order = require("./order");

const addNewOrder = async (req, res) => {
  try {
    const orderData = await Order.create(req.body);
    return res.json({ orderData, msg: "New Order Added" });
  } catch (error) {
    console.error("Error creating new order:", error);
    return res.status(500).json({ error: "Failed to create a new order" });
  }
};

const getOrder = async (req, res) => {
  try {
    const orders = await Order.find().populate("user");
    return res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ error: "Failed to retrieve orders" });
  }
};

module.exports = {
  addNewOrder,
  getOrder,
};
