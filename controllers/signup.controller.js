const User = require("../models/user.model");

const signupController = async (req, res) => {
  const { name, email, username, password, role } = req.body;

  try {
    if (!(name && email && username && password)) {
      return res
        .status(400)
        .json({ message: "Missing necessary input fields!" });
    }

    const countExistingUsers = await User.countDocuments({
      $or: [{ username }, { email }],
    });
    if (countExistingUsers > 0) {
      return res
        .status(409)
        .json({ message: "username or email already exists" });
    }

    const newUserObject = new User({ name, email, username, password, role });
    const savedUser = await newUserObject.save();
    if (savedUser) {
      res
        .status(201)
        .json({ message: "new user created successfully", savedUser });
      // console.log(savedUser);
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: `New User Controller: Internal server error: ${error.message}`,
    });
  }
};

module.exports = signupController;
