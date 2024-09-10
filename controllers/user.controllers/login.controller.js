const User = require("../../models/user.model");
const { jwtSign } = require("../../utils/jwt.util");
const validateFields = require("../../utils/validateFields.util");

const loginController = async (req, res, next) => {
  const { email, username, password } = req.body;
  try {
    const missingFields = validateFields(["password"], req.body);
    if(missingFields){
        const error = new Error(missingFields);
        error.statusCode = 400;
        throw error;
    }
    if(!username && !email){
        const error = new Error("Either username or email must be provided");
        error.statusCode = 400;
        throw error;
    }

    const userFromDB = await User.findOne({
        $or: [{email}, {username}]
    })
    if(!userFromDB){
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    const isMatch = await userFromDB.comparePassword(password);
    if(!isMatch){
        const error = new Error("Invalid Password");
        error.statusCode = 401;
        throw error;
    }

    const token = jwtSign(userFromDB._id, userFromDB.role, '1h');

    res.status(200).json({message: "Login successful", token});
  } catch (error) {
    next(error);
  }
};

module.exports = loginController;