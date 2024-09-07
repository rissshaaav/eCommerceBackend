const express = require("express");
const isAdmin = require("../middlewares/isAdmin.middleware");
const addProductController = require("../controllers/addProduct.controller");
const updateProductController = require("../controllers/updateProduct.controller");
const productRouter = express.Router();

productRouter.post("/new", isAdmin, addProductController);
productRouter.post("/update/:productId", isAdmin, updateProductController);

module.exports = productRouter;