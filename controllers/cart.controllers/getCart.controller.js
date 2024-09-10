const Cart = require("../../models/cart.model")

const getCartController = async (req, res, next) => {
    const userId = req.user._id;
    try {
        const cart = await Cart.findOne({user: userId});
        if(!cart){
            const error = new Error('Cart not found')
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({cart});
    } catch (error) {
        next(error);
    }
};
module.exports = getCartController;