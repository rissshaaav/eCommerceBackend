const Product = require("../models/product.model");
const validateFields = require("../utils/validateFields.util");

const addProductController = async (req, res, next) => {
  const { name, description, price, stock, category, imageUrl } = req.body;
  try {
    const missingFields = validateFields(
      ["name", "description", "price", "stock", "category", "imageUrl"],
      req.body
    );
    if (missingFields) {
      const error = new Error(missingFields);
      error.statusCode = 400;
      throw error;
    }

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
      imageUrl,
    });
    const savedProduct = await newProduct.save();
    res
      .status(201)
      .json({ message: "new product added successfully", savedProduct });
  } catch (error) {
    next(error);
  }
};

module.exports = addProductController;
