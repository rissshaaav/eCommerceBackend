const express = require("express");
const cartRouter = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated.middleware");
const addItemToCartController = require("../controllers/addItemToCart.controller");

cartRouter.post("/add", isAuthenticated, addItemToCartController);

module.exports = cartRouter;
