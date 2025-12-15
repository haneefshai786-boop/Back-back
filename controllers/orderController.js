import Order from "../models/Order.js";

// Create order
export const createOrder = async (req, res) => {
  const { products, paymentMethod } = req.body;

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

  // ✅ Stripe only if needed
  if (paymentMethod === "stripe") {
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({
        message: "Stripe key not configured",
      });
    }

    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalPrice * 100),
      currency: "usd",
      metadata: { orderId: order._id.toString() },
    });

    return res.status(201).json({
      order,
      clientSecret: paymentIntent.client_secret,
    });
  }

  // COD or no payment
  res.status(201).json(order);
};

// User orders
export const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate("products.product");
  res.json(orders);
};

// Admin all orders
export const getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("user")
    .populate("products.product");
  res.json(orders);
};

// Admin update order
export const updateOrderStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(order);
};
