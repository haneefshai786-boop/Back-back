import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  const { products, paymentMethod } = req.body;

  // ✅ FIX: prevent reduce crash
  if (!products || products.length === 0) {
    return res.status(400).json({
      message: "Cart is empty or products not provided",
    });
  }

  const totalPrice = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = await Order.create({
    user: req.user._id,
    products,
    totalPrice,
    paymentMethod,
  });

  res.status(201).json({
    message: "Order placed successfully",
    order,
  });
};
