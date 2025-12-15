import SubCategory from "../models/SubCategory.js";
import Product from "../models/Product.js";

// Create subcategory
export const createSubCategory = async (req, res) => {
  const subcategory = await SubCategory.create({ name: req.body.name, category: req.body.category });
  res.status(201).json(subcategory);
};

// Update subcategory
export const updateSubCategory = async (req, res) => {
  const subcategory = await SubCategory.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
  res.json(subcategory);
};

// Delete subcategory
export const deleteSubCategory = async (req, res) => {
  await Product.deleteMany({ subCategory: req.params.id });
  const subcategory = await SubCategory.findByIdAndDelete(req.params.id);
  res.json({ message: "Subcategory deleted", subcategory });
};

// Get all subcategories
export const getSubCategories = async (req, res) => {
  const subcategories = await SubCategory.find();
  res.json(subcategories);
};

// Get products by subcategory
export const getProductsBySubCategory = async (req, res) => {
  const products = await Product.find({ subCategory: req.params.subCategoryId });
  res.json(products);
};
