const validateFields = (fields, body) => {
  const missingFields = fields.filter((field) => !body[field]);
  return missingFields.length === 0
    ? null
    : `Missing Fields: ${missingFields.join(", ")}`;
};
module.exports = validateFields;
