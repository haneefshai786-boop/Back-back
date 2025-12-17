import express from "express";
import Folder from "../models/Folder.js";
import Vendor from "../models/Vendor.js";
import Category from "../models/Category.js";
import SubCategory from "../models/SubCategory.js";
import Product from "../models/Product.js";

const router = express.Router();

// Seed data
router.post("/seed", async (req, res) => {
  try {
    // Clear existing data (optional)
    await Folder.deleteMany();
    await Vendor.deleteMany();
    await Category.deleteMany();
    await SubCategory.deleteMany();
    await Product.deleteMany();

    // Folders
    const folders = await Folder.insertMany([
      { name: "Restaurant" },
      { name: "Grocery" },
    ]);

    // Vendors
    const vendors = await Vendor.insertMany([
      { name: "Pizza Planet", folder: folders[0]._id },
      { name: "Burger House", folder: folders[0]._id },
      { name: "Fresh Mart", folder: folders[1]._id },
    ]);

    // Categories
    const categories = await Category.insertMany([
      { name: "Pizza", vendor: vendors[0]._id },
      { name: "Burgers", vendor: vendors[1]._id },
      { name: "Fruits", vendor: vendors[2]._id },
    ]);

    // SubCategories
    const subCategories = await SubCategory.insertMany([
      { name: "Veg Pizza", category: categories[0]._id },
      { name: "Cheese Burger", category: categories[1]._id },
      { name: "Seasonal Fruits", category: categories[2]._id },
    ]);

    // Products
    await Product.insertMany([
      { name: "Margherita", price: 199, subCategory: subCategories[0]._id },
      { name: "Paneer Pizza", price: 249, subCategory: subCategories[0]._id },
      { name: "Cheese Burger", price: 149, subCategory: subCategories[1]._id },
      { name: "Apple Pack", price: 120, subCategory: subCategories[2]._id },
    ]);

    res.status(200).json({ message: "Seed data added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Seed error", error });
  }
});

export default router;
