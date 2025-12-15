import Admin from "../models/Admin.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Generate JWT token
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

// Admin login
export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (admin && (await admin.matchPassword(password))) {
    res.json({ token: generateToken(admin._id), username: admin.username });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

// User register
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password });
  res.status(201).json({ token: generateToken(user._id), name: user.name, email: user.email });
};

// User login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({ token: generateToken(user._id), name: user.name, email: user.email });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
