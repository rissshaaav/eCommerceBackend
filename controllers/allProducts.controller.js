const Product = require("../models/product.model");

const allProductsController = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json({products});
    } catch (error) {
        next(error);
    }
};
module.exports = allProductsController;