import Product from "../models/Product.js";

/**
 * @desc   Create product (ADMIN)
 * @route  POST /api/products
 * @access Admin
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
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc   Get all products (USER)
 * @route  GET /api/products
 * @access Public
 */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("vendor")
      .populate("subcategory");

    res.json(products);
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc   Get products by subcategory
 * @route  GET /api/subcategories/:subCategoryId/products
 * @access Public
 */
export const getProductsBySubCategory = async (req, res) => {
  try {
    const products = await Product.find({
      subcategory: req.params.subCategoryId,
    })
      .populate("vendor")
      .populate("subcategory");

    res.json(products);
  } catch (error) {
    console.error("Get products by subcategory error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc   Get single product
 * @route  GET /api/products/:id
 * @access Public
 */
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("vendor")
      .populate("subcategory");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Get product error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
