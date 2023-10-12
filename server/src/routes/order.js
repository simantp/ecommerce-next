const Order = require("../models/order");
const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order");

router.post("/order", OrderController.addNewOrder);
router.get("/order", OrderController.getOrder);

module.exports = router;
