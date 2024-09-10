const express = require("express");
const productRouter = express.Router();

const isAdmin = require("../middlewares/isAdmin.middleware");
const addProductController = require("../controllers/product.controllers/addProduct.controller");
const updateProductController = require("../controllers/product.controllers/updateProduct.controller");
const deleteProductController = require("../controllers/product.controllers/deleteProduct.controller");
const allProductsController = require("../controllers/product.controllers/allProducts.controller");
const getProductController = require("../controllers/product.controllers/getProduct.controller");

productRouter.post("/new", isAdmin, addProductController);
productRouter.get("/", isAdmin, allProductsController);
productRouter.get("/:productId", getProductController);
productRouter.put("/update/:productId", isAdmin, updateProductController);
productRouter.delete("/delete/:productId", isAdmin, deleteProductController);

module.exports = productRouter;
