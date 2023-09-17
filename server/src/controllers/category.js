const Category = require("../models/category");

const addNewCategory = async (req, res) => {
  const category = await Category.create(req.body);
  return res.json({ category, msg: "New Category Added" });
};

const getCategories = async (req, res) => {
  const categoryList = await Category.find();
  return res.json(categoryList);
};

const getCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404).json({ error: "Category not found" });
  }
  return res.json(category);
};

module.exports = {
  addNewCategory,
  getCategories,
  getCategory,
};
