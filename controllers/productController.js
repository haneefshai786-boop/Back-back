import Product from "../models/Product.js";

// Create product
export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

// Update product
export const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
};

// Delete product
export const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted", product });
};

// Get all products
export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};
