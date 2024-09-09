const Cart = require("../models/cart.model");

const removeItemFromCartController = async (req, res, next) => {
  const { productId } = req.params;
  const userId = req.user._id;
  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        const error = new Error("Cart not found");
        error.statusCode = 404;
        throw error;
    }
    console.log(cart);
    const itemIndex = cart.items.findIndex(
      (item) => item.product.equals(productId)
    );
    if (itemIndex === -1) {
      const error = new Error("Product not in cart");
      error.statusCode = 404;
      throw error;
    }

    cart.items.splice(itemIndex, 1);

    await cart.save();
    res.status(200).json({ message: "Product removed to the cart" });
  } catch (error) {
    next(error);
  }
};
module.exports = removeItemFromCartController;
