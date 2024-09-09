const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    min: 1,
    required: true,
  },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
    totalPrice: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

cartSchema.pre("save", async function (next) {
  await this.populate("items.product");
  this.totalPrice = this.items.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );
  next();
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
