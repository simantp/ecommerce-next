const Category = require("../models/category");
const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category");

router.post("/addcategory", CategoryController.addNewCategory);
router.get("/categories", CategoryController.getCategories);
router.get("/category/:id", CategoryController.getCategory);

module.exports = router;
