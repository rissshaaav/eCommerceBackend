const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

exports.jwtSign = (userId, role, expiry) => {
  const token = jwt.sign(
    {
      userId,
      role,
    },
    JWT_SECRET,
    { expiresIn: expiry }
  );

  return token;
};
