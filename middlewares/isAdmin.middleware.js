const { jwtDecoded } = require("../utils/jwt.util");
const User = require("../models/user.model");
const validateFields = require("../utils/validateFields.util");

const isAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      const error = new Error("Authentication token not found");
      error.statusCode = 400;
      throw error;
    }

    const decoded = jwtDecoded(token);
    
    const missingFields = validateFields(["userId", "role"], decoded);
    if (missingFields) {
      const error = new Error("test ", missingFields);
      error.statusCode = 400;
      throw error;
    }

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access Denied" });
    }
    const user = await User.findById(decoded.userId);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = isAdmin;
