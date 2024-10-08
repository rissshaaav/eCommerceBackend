const User = require("../../models/user.model");
const checkUserExists = require("../../utils/checkUserExists.util");
const validateFields = require("../../utils/validateFields.util");
const {jwtSign} = require("../../utils/jwt.util");


const signupController = async (req, res, next) => {
  const { name, email, username, password, role } = req.body;

  try {
    const missingFields = validateFields(
      ["name", "email", "username", "password"],
      req.body
    );
    if (missingFields) {
      const error = new Error(missingFields);
      error.statusCode = 400;
      throw error;
    }

    const userExists = await checkUserExists(username, email);
    
    if (userExists) {
      const error = new Error("username or email already exists");
      error.statusCode = 409;
      throw error;
    }

    const newUserObject = new User({ name, email, username, password, role });
    const savedUser = await newUserObject.save();

    const token = jwtSign(savedUser._id, savedUser.role, '2h');

    if (savedUser) {
      res
        .status(201)
        .json({ message: "new user created successfully", token });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = signupController;
