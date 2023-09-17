const Product = require("../models/product");
const path = require("path");
const fs = require("fs");

const uploadProductImage = async (req, res) => {
  if (req.file?.filename) {
    await Product.findByIdAndUpdate(req.params.id, {
      $set: { featuredImage: req.file?.filename },
    });
  }
  res.json({
    msg: "image uploaded",
  });
};

const getProductImage = async (req, res) => {
  const imagePath = path.join(
    __dirname,
    "../../uploads/products",
    featuredImage
  );

  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    const defaultImagePath = path.join(
      __dirname,
      "../../uploads/users/avatar.svg"
    );
    res.sendFile(defaultImagePath);
  }
};

const addNewProduct = async (req, res) => {
  const product = await Product.create(req.body);
  return res.json({ product, msg: "New Product Added" });
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
  uploadProductImage,
  getProductImage,
};
