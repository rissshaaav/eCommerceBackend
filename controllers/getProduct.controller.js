const Product = require("../models/product.model");

const getProductController = async (req, res, next) => {
    const {productId} = req.params;
    try {
        const product = await Product.findById(productId);
        if(!product){
            const error = new Error('Product not found')
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({product});
    } catch (error) {
        next(error);
    }
};
module.exports = getProductController;