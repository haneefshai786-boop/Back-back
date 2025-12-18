import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ message: "Invalid email" });

  const isMatch = await admin.matchPassword(password);
  if (!isMatch) return res.status(401).json({ message: "Invalid password" });

  res.json({
    _id: admin._id,
    name: admin.name,
    email: admin.email,
    token: generateToken(admin._id)
  });
};
