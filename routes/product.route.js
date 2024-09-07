const express = require("express");
const isAdmin = require("../middlewares/isAdmin.middleware");
const addProductController = require("../controllers/addProduct.controller");
const updateProductController = require("../controllers/updateProduct.controller");
const deleteProductController = require("../controllers/deleteProduct.controller");
const productRouter = express.Router();

productRouter.post("/new", isAdmin, addProductController);
productRouter.post("/update/:productId", isAdmin, updateProductController);
productRouter.put("/delete/:productId", isAdmin, deleteProductController);

module.exports = productRouter;