import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory", required: true },
  image: String,
});

export default mongoose.model("Product", productSchema);
