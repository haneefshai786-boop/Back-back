import Product from "../models/Product.js";

// ✅ CREATE (admin)
export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

// ✅ GET ALL PRODUCTS (user)
export const getProducts = async (req, res) => {
  const products = await Product.find()
    .populate("vendor")
    .populate("subcategory");
  res.json(products);
};

// ✅ GET PRODUCTS BY SUBCATEGORY
export const getProductsBySubCategory = async (req, res) => {
  const products = await Product.find({ subcategory: req.params.id })
    .populate("vendor")
    .populate("subcategory");
  res.json(products);
};
