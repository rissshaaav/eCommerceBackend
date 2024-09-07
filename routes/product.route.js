const express = require("express");
const productRouter = express.Router();

const isAdmin = require("../middlewares/isAdmin.middleware");
const addProductController = require("../controllers/addProduct.controller");
const updateProductController = require("../controllers/updateProduct.controller");
const deleteProductController = require("../controllers/deleteProduct.controller");
const allProductsController = require("../controllers/allProducts.controller");

productRouter.post("/new", isAdmin, addProductController);
productRouter.put("/update/:productId", isAdmin, updateProductController);
productRouter.get("/products", isAdmin, allProductsController);
productRouter.delete("/delete/:productId", isAdmin, deleteProductController);

module.exports = productRouter;