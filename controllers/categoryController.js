import Category from "../models/Category.js";
import SubCategory from "../models/SubCategory.js";

// Create category
export const createCategory = async (req, res) => {
  const category = await Category.create({ name: req.body.name, vendor: req.body.vendor });
  res.status(201).json(category);
};

// Update category
export const updateCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
  res.json(category);
};

// Delete category
export const deleteCategory = async (req, res) => {
  await SubCategory.deleteMany({ category: req.params.id });
  const category = await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Category deleted", category });
};

// Get all categories
export const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

// Get subcategories by category
export const getSubCategoriesByCategory = async (req, res) => {
  const subcategories = await SubCategory.find({ category: req.params.categoryId });
  res.json(subcategories);
};
