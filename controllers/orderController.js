import Order from "../models/Order.js";

// User creates order
export const createOrder = async (req, res) => {
  const { products, paymentMethod } = req.body;
  if (!products || !products.length)
    return res.status(400).json({ message: "Cart is empty" });

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
};

// Get user orders
export const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};

// Admin gets all orders
export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("user");
  res.json(orders);
};

// Admin updates order status
export const updateOrderStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(order);
};
