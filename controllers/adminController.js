import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

export const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  // Hardcoded admin credentials for now
  if (username === "admin" && password === "admin123") {
    const token = jwt.sign({ username, role: "admin" }, JWT_SECRET, { expiresIn: "7d" });
    return res.json({ token, username });
  }

  res.status(401).json({ message: "Invalid credentials" });
};
