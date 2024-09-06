const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requied: true,
      trim: true,
    },
    description: {
      type: String,
      requied: true,
      trim: true,
    },
    price: {
      type: Number,
      min: 0,
      requied: true,
    },
    stock: {
      type: Number,
      min: 0,
      requied: true,
    },
    category: {
      type: String,
      requied: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      requied: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
