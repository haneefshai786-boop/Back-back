import Product from "../models/Product.js";

// Create product (Admin only)
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, image, vendor, subcategory } = req.body;

    if (!name || !price || !vendor || !subcategory) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const product = await Product.create({
      name,
      price,
      description,
      image,
      vendor,
      subcategory,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("vendor")
      .populate("subcategory");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single product by id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("vendor")
      .populate("subcategory");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
