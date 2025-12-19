import Product from "../models/Product.js";

/* ===========================
   ADMIN: CREATE PRODUCT
=========================== */
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      subcategory,
      vendor,
      description,
      image
    } = req.body;

    if (!name || !price || !subcategory || !vendor) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const product = await Product.create({
      name,
      price,
      subcategory,
      vendor,
      description,
      image
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===========================
   USER: GET ALL PRODUCTS
=========================== */
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

/* ===========================
   USER: BY SUBCATEGORY
=========================== */
export const getProductsBySubCategory = async (req, res) => {
  try {
    const products = await Product.find({
      subcategory: req.params.id
    })
      .populate("vendor")
      .populate("subcategory");

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
