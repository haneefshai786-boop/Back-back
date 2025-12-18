import Order from "../models/Order.js";

// ✅ CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const { products, paymentMethod = "COD" } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
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

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET LOGGED-IN USER ORDERS
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("products.product");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
