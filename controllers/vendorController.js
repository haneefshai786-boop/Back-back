import Vendor from "../models/Vendor.js";

// Create vendor (admin)
export const createVendor = async (req, res) => {
  try {
    const vendor = await Vendor.create(req.body);
    res.status(201).json(vendor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all vendors
export const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate("folder");
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ REQUIRED – Vendors by folder
export const getVendorsByFolder = async (req, res) => {
  try {
    const vendors = await Vendor.find({
      folder: req.params.folderId,
    });
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
