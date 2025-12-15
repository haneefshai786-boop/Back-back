import Vendor from "../models/Vendor.js";
import Category from "../models/Category.js";

// Create vendor
export const createVendor = async (req, res) => {
  const vendor = await Vendor.create({ name: req.body.name, folder: req.body.folder });
  res.status(201).json(vendor);
};

// Update vendor
export const updateVendor = async (req, res) => {
  const vendor = await Vendor.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
  res.json(vendor);
};

// Delete vendor
export const deleteVendor = async (req, res) => {
  const vendor = await Vendor.findByIdAndDelete(req.params.id);
  res.json({ message: "Vendor deleted", vendor });
};

// Get all vendors
export const getVendors = async (req, res) => {
  const vendors = await Vendor.find();
  res.json(vendors);
};

// Get categories by vendor
export const getCategoriesByVendor = async (req, res) => {
  const categories = await Category.find({ vendor: req.params.vendorId });
  res.json(categories);
};
