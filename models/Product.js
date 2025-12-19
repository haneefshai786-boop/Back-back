import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory", required: true },
});

export default mongoose.model("Product", productSchema);
