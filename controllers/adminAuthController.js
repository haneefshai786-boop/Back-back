import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id, role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Login admin
export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      token: generateToken(admin._id),
      username: admin.username,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Register admin (one-time)
export const registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const exists = await Admin.findOne({ username });
    if (exists) return res.status(400).json({ message: "Admin already exists" });

    const admin = await Admin.create({ username, password });

    res.json({
      token: generateToken(admin._id),
      username: admin.username,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
