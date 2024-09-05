const User = require("../models/user.model");

const checkUserExists = async (username, email) => {
  const countExistingUsers = await User.countDocuments({
    $or: [{ username, email }],
  });
  return countExistingUsers > 0;
};
module.exports = checkUserExists;
