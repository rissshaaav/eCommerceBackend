const Cart = require("../models/cart.model");

const updateCartItemQuantityController = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.user;
  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      const error = new Error("Cart not found");
      error.statusCode = 404;
      throw error;
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (itemIndex === -1) {
      const error = new Error("Product not found in the cart");
      error.statusCode = 404;
      throw error;
    }

    cart.items[itemIndex].quantity += quantity;

    await cart.save();
    res.status(200).json({ message: "cart item updated", cart });
  } catch (error) {
    next(error);
  }
};
module.exports = updateCartItemQuantityController;
