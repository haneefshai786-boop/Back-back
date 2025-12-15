import Folder from "../models/Folder.js";
import Vendor from "../models/Vendor.js";

// Create folder
export const createFolder = async (req, res) => {
  const folder = await Folder.create({ name: req.body.name });
  res.status(201).json(folder);
};

// Update folder
export const updateFolder = async (req, res) => {
  const folder = await Folder.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
  res.json(folder);
};

// Delete folder
export const deleteFolder = async (req, res) => {
  const folder = await Folder.findByIdAndDelete(req.params.id);
  res.json({ message: "Folder deleted", folder });
};

// Get all folders
export const getFolders = async (req, res) => {
  const folders = await Folder.find();
  res.json(folders);
};

// Get vendors by folder
export const getVendorsByFolder = async (req, res) => {
  const vendors = await Vendor.find({ folder: req.params.folderId });
  res.json(vendors);
};
