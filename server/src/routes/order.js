const Order = require("../models/order");
const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order");

router.post("/order", OrderController.addNewOrder);
router.get("/order/:id", OrderController.getOrder);
router.get("/order", OrderController.getAllOrder);

module.exports = router;
