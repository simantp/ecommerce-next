const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Product = require("../models/product");
const path = require("path");

const addNewProduct = async (req, res) => {
  if (!ObjectId.isValid(req.body.category)) {
    return res.status(400).json({ error: "Invalid category ID" });
  }

  try {
    const imageUrl = `/uploads/products/${req.file.filename}`;

    const { name, description, price, slug, category } = req.body;

    const newProduct = {
      name,
      description,
      price,
      slug,
      category,
      productImageFilename: req.file.filename,
      productImagePath: `http://localhost:3005${imageUrl}`,
    };

    const product = await Product.create(newProduct);
    const productWithImageUrl = {
      ...product.toObject(),
      productImageUrl: imageUrl,
    };

    return res.json({ product: productWithImageUrl, msg: "New Product Added" });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ error: "Failed to create product" });
  }
};

const getProducts = async (req, res) => {
  const productList = await Product.find();
  return res.json(productList);
};

const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404).json({ error: "Product not found" });
  }
  return res.json(product);
};

module.exports = {
  addNewProduct,
  getProducts,
  getProduct,
};
