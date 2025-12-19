import Product from "../models/Product.js";

/**
 * ADMIN – Create product
 */
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      image,
      description,
      vendor,
      subcategory,
    } = req.body;

    if (!name || !price || !vendor || !subcategory) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const product = await Product.create({
      name,
      price,
      image,
      description,
      vendor,
      subcategory,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * USER – Get products by subcategory
 */
export const getProductsBySubCategory = async (req, res) => {
  try {
    const products = await Product.find({
      subcategory: req.params.subCategoryId,
    }).populate("vendor", "name");

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * USER – Get single product
 */
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("vendor", "name");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
