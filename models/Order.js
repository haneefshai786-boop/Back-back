import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
      price: Number,
    }
  ],
  totalPrice: Number,
  status: { type: String, enum: ["pending","paid","shipped","completed"], default:"pending" },
  paymentMethod: { type: String, enum: ["stripe","cod"], default:"cod" },
  paymentStatus: { type: String, enum: ["pending","paid","failed"], default:"pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
