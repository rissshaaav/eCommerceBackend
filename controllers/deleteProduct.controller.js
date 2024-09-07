const Product = require("../models/product.model");

const deleteProductController = async (req, res, next) => {
    const { productId } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if(!deletedProduct){
            const error = new Error('Product not found')
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({message: "Product deleted successfully", deletedProduct});
    } catch (error) {
        next(error);
    }
};
module.exports = deleteProductController;