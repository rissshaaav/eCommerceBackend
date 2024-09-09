const express = require("express");
const cartRouter = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated.middleware");
const addItemToCartController = require("../controllers/addItemToCart.controller");
const removeItemFromCartController = require("../controllers/removeItemFromCart.controller");

cartRouter.post("/add", isAuthenticated, addItemToCartController);
cartRouter.delete(
  "/delete/:productId",
  isAuthenticated,
  removeItemFromCartController
);

module.exports = cartRouter;
