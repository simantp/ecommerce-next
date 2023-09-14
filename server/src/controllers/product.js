const Product = require("../models/product");

const addNewProduct = async (req, res) => {
  const product = await Product.create(req.body);
  return res.json({ product, msg: "New Product Added" });
};

const getProducts = async (req, res) => {
  const products = await Product.find();
  return res.json(products);
};

const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404).json({ error: "Product not found" });
  }
  return res.json(product);
};

module.exports = { addNewProduct, getProducts, getProduct };
