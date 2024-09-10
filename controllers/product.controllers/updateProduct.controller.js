const Product = require("../../models/product.model");

const updateProductController = async (req, res, next) => {
  const { productId } = req.params;
  const { name, description, price, stock, category, imageUrl } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, description, price, stock, category, imageUrl },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }
    res
      .status(200)
      .json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    next(error);
  }
};
module.exports = updateProductController;
