const express = require("express");
const cartRouter = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated.middleware");
const addItemToCartController = require("../controllers/cart.controllers/addItemToCart.controller");
const removeItemFromCartController = require("../controllers/cart.controllers/removeItemFromCart.controller");
const getCartController = require("../controllers/cart.controllers/getCart.controller");
const updateCartItemQuantityController = require("../controllers/cart.controllers/updateCartItemQuantity.controller");

cartRouter.post("/add", isAuthenticated, addItemToCartController);
cartRouter.get("/", isAuthenticated, getCartController);
cartRouter.put("/update", isAuthenticated, updateCartItemQuantityController);
cartRouter.delete(
  "/delete/:productId",
  isAuthenticated,
  removeItemFromCartController
);

module.exports = cartRouter;
