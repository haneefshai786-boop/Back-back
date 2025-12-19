import Vendor from "../models/Vendor.js";
import Category from "../models/Category.js";

// ✅ Create vendor (ADMIN)
export const createVendor = async (req, res) => {
  const vendor = await Vendor.create(req.body);
  res.status(201).json(vendor);
};

// ✅ Update vendor (ADMIN)
export const updateVendor = async (req, res) => {
  const vendor = await Vendor.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(vendor);
};

// ✅ Delete vendor (ADMIN)
export const deleteVendor = async (req, res) => {
  await Vendor.findByIdAndDelete(req.params.id);
  res.json({ message: "Vendor deleted" });
};

// ✅ Get vendors by folder (USER)
export const getVendorsByFolder = async (req, res) => {
  const vendors = await Vendor.find({ folder: req.params.folderId });
  res.json(vendors);
};

// ✅ Get categories of a vendor (USER)
export const getCategoriesByVendor = async (req, res) => {
  const categories = await Category.find({
    vendor: req.params.vendorId,
  });
  res.json(categories);
};
