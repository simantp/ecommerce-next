const Product = require("../models/product");
const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product");

router.post("/products", ProductController.addNewProduct);
router.get("/products", ProductController.getProducts);
router.get("/product/:id", ProductController.getProduct);

module.exports = router;
