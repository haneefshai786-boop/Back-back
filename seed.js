import fetch from "node-fetch";

const BASE_URL = "http://localhost:10000/api"; // Termux-friendly

// Admin credentials
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123"
};

// Data to seed
const folders = ["Restaurant", "Grocery", "Vegetables"];
const vendors = ["Dominos", "BigMart", "FreshFarm"];
const categories = ["Pizza", "Snacks", "Drinks"];
const subCategories = ["Veg Pizza", "Non-Veg Pizza", "Cold Drinks"];
const products = [
  { name: "Margherita", price: 199, description: "Classic cheese pizza" },
  { name: "Pepsi", price: 50, description: "Cold drink" }
];

let token;

// Helper: POST request with auth
const post = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

const seed = async () => {
  try {
    // 1️⃣ Login as admin
    const loginRes = await fetch(`${BASE_URL}/admin/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ADMIN_CREDENTIALS)
    });

    const loginData = await loginRes.json();
    if (!loginData.token) throw new Error("Admin login failed");
    token = loginData.token;
    console.log("✅ Logged in as admin");

    // 2️⃣ Create Folders
    const folderIds = [];
    for (let name of folders) {
      const folder = await post(`${BASE_URL}/folders`, { name });
      console.log("Folder:", folder);
      folderIds.push(folder._id);
    }

    // 3️⃣ Create Vendors
    const vendorIds = [];
    for (let i = 0; i < vendors.length; i++) {
      const vendor = await post(`${BASE_URL}/vendors`, {
        name: vendors[i],
        folder: folderIds[i] || folderIds[0]
      });
      console.log("Vendor:", vendor);
      vendorIds.push(vendor._id);
    }

    // 4️⃣ Create Categories
    const categoryIds = [];
    for (let i = 0; i < categories.length; i++) {
      const category = await post(`${BASE_URL}/categories`, {
        name: categories[i],
        vendor: vendorIds[i] || vendorIds[0]
      });
      console.log("Category:", category);
      categoryIds.push(category._id);
    }

    // 5️⃣ Create SubCategories
    const subCategoryIds = [];
    for (let i = 0; i < subCategories.length; i++) {
      const subCategory = await post(`${BASE_URL}/subcategories`, {
        name: subCategories[i],
        category: categoryIds[i] || categoryIds[0]
      });
      console.log("SubCategory:", subCategory);
      subCategoryIds.push(subCategory._id);
    }

    // 6️⃣ Create Products
    for (let i = 0; i < products.length; i++) {
      const product = await post(`${BASE_URL}/products`, {
        ...products[i],
        subCategory: subCategoryIds[i] || subCategoryIds[0]
      });
      console.log("Product:", product);
    }

    console.log("✅ Seed completed successfully!");

  } catch (err) {
    console.error("Seed failed:", err.message || err);
  }
};

seed();
