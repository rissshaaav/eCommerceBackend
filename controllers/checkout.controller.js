const Cart = require("../models/cart.model");
const Order = require("../models/order.model");
const Product = require("../models/product.model");

const checkoutController = async (req, res, next) => {
  const userId = req.user._id;
  try {
    // get user cart
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
      const error = new Error("Cart not found");
      error.statusCode = 404;
      throw error;
    }

    // check product availablity & calculate total cost
    let totalAmount = 0;
    for (let item of cart.items) {
      const product = item.product;
      if (product.stock < item.quantity) {
        const error = new Error(`Insufficient stock for ${product.name}`);
        error.statusCode = 400;
        throw error;
      }
      totalAmount += product.price * item.quantity;
    }

    // create new order
    const newOrder = new Order({
      user: userId,
      items: cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      totalAmount,
    });

    // save order
    const savedOrder = await newOrder.save();

    // decrease product stock
    for (let item of cart.items) {
      const product = await Product.findById(item.product._id);
      product.stock -= item.quantity;
      await product.save();
    }

    // clear user's cart
    await Cart.findOneAndUpdate({ user: userId }, { items: [], totalPrice: 0 });

    // process payment
    const paymentSuccess = true; // Simulate successful payment for now

    if (paymentSuccess) {
      // Update the order's payment and order status
      savedOrder.paymentStatus = "completed";
      savedOrder.orderStatus = "shipped"; // Order is ready for shipping
      await savedOrder.save();

      return res.status(200).json({
        message: "Order placed and payment successful",
        order: savedOrder,
      });
    } else {
      return res
        .status(400)
        .json({ message: "Payment failed, please try again" });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = checkoutController;
