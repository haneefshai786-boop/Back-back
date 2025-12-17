// routes/seed.js
const express = require("express");
const router = express.Router();

const Folder = require("../models/Folder");
const Vendor = require("../models/Vendor");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const Product = require("../models/Product");

router.post("/seed", async (req, res) => {
  try {
    // Clear existing data (optional)
    await Folder.deleteMany({});
    await Vendor.deleteMany({});
    await Category.deleteMany({});
    await SubCategory.deleteMany({});
    await Product.deleteMany({});

    // Seed folders
    const folders = await Folder.insertMany([
      { name: "Restaurant" },
      { name: "Grocery" },
    ]);

    // Seed vendors
    const vendors = await Vendor.insertMany([
      { name: "Pizza Planet", folder: folders[0]._id },
      { name: "Burger House", folder: folders[0]._id },
      { name: "Fresh Mart", folder: folders[1]._id },
    ]);

    // Seed categories
    const categories = await Category.insertMany([
      { name: "Pizza", vendor: vendors[0]._id },
      { name: "Burgers", vendor: vendors[1]._id },
      { name: "Fruits", vendor: vendors[2]._id },
    ]);

    // Seed subcategories
    const subCategories = await SubCategory.insertMany([
      { name: "Veg Pizza", category: categories[0]._id },
      { name: "Cheese Burger", category: categories[1]._id },
      { name: "Seasonal Fruits", category: categories[2]._id },
    ]);

    // Seed products
    await Product.insertMany([
      { name: "Margherita", price: 199, subCategory: subCategories[0]._id },
      { name: "Paneer Pizza", price: 249, subCategory: subCategories[0]._id },
      { name: "Cheese Burger", price: 149, subCategory: subCategories[1]._id },
      { name: "Apple Pack", price: 120, subCategory: subCategories[2]._id },
    ]);

    res.send("Seed data added successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error seeding data");
  }
});

module.exports = router;
