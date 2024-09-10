const express = require("express");
const cartRouter = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated.middleware");
const addItemToCartController = require("../controllers/addItemToCart.controller");
const removeItemFromCartController = require("../controllers/removeItemFromCart.controller");
const getCartController = require("../controllers/getCart.controller");
const updateCartItemQuantityController = require("../controllers/updateCartItemQuantity.controller");

cartRouter.post("/add", isAuthenticated, addItemToCartController);
cartRouter.get("/", isAuthenticated, getCartController);
cartRouter.put("/update", isAuthenticated, updateCartItemQuantityController);
cartRouter.delete(
  "/delete/:productId",
  isAuthenticated,
  removeItemFromCartController
);

module.exports = cartRouter;
