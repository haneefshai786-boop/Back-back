import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

const generateToken = (id) =>
  jwt.sign({ id, role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
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
