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

exports.jwtDecoded = token => {
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded;
}