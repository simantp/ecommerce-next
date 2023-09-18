const Product = require("../models/product");
const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product");
const multer = require("multer");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/products";
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const imageName = Math.floor(Math.random() * 1000) + file.originalname;
    cb(null, imageName);
  },
});

const upload = multer({ storage: storage });

//router.get("/product-image/:id", ProductController.getProductImage);

router.post(
  "/products",
  upload.single("productImage"),
  ProductController.addNewProduct
);

router.get("/products", ProductController.getProducts);
router.get("/product/:id", ProductController.getProduct);

module.exports = router;
