const { Cursor } = require("mongoose")
const addToCartModel = require("../../models/addToCart")

const viewCartProductsController = async (req, res) => {
    try {
        const currentUser = req.userId

        const allProducts = await addToCartModel.find({ userId:currentUser }).populate("productId")

        return res.json({
            message: "ok",
            success: true,
            error: false,
            data: allProducts
        })

    }
    catch (err) {
        res.status(400).json({
            error: true,
            success: false,
            message: err.message || err
        })
    }
}

module.exports = viewCartProductsController