import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  folder: { type: mongoose.Schema.Types.ObjectId, ref: "Folder", required: true },
});

export default mongoose.model("Vendor", vendorSchema);
