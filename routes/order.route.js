const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated.middleware");
const checkoutController = require("../controllers/checkout.controller");
const orderRouter = express.Router();

orderRouter.post("/checkout", isAuthenticated, checkoutController);

module.exports = orderRouter;