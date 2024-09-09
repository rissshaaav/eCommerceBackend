const User = require("../models/user.model");
const { jwtDecoded } = require("../utils/jwt.util");
const validateFields = require("../utils/validateFields.util");

const isAuthenticated = async (req, res, next) => {
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

    const user = await User.findById(decoded.userId);
    if (!user) {
      const error = new Error("Invalid Token! Authentication failed.");
      error.statusCode = 401;
      throw error;
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = isAuthenticated;
