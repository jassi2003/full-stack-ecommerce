const cartModel=require("../../models/addToCart")


const deleteCartProductController= async(req,res)=>{
    try{
const currentUser=req.userId
const productId=req?.body?._id

const deleteProduct=await cartModel.deleteOne({_id:productId})

res.json({
    message:"product from cart deleted",
    data:deleteProduct,
    error:false,
    success:true
})

    }
    catch(err){
        res.status(400).json({
            message:err.message || err,
            error:true,
            success:false
        })
    }

}
module.exports= deleteCartProductController