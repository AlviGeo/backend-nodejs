// Import JWT
const jwt = require("jsonwebtoken");

// Import Model
const db = require("../models");
const User = db.User;

const { SECRET_TOKEN, SECRET_EXPIRED } = process.env;

// Middleware to verify JWT token
const verifyToken = async (req, res, next) => {
  const { id } = req.body;

  try {
    const token = await User.findOne({
      where: { id: id },
      attributes: ["access_token"],
    });
    if (!token) {
      return res.status(400).json({
        status: "error",
        message: "Please log in first!",
      });
    }

    const decoded = jwt.verify(token.access_token, SECRET_TOKEN);
    if (!decoded) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid token." });
    }

    req.user = decoded.data;
    next();
  } catch (err) {
    return res.status(401).json({ status: "error", message: "Invalid token" });
  }
};

module.exports = verifyToken;
