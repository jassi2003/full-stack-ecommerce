const cartModel=require("../../models/addToCart")


const updateCartProductController= async(req,res)=>{
    try{
const currentUser=req.userId
const productId=req?.body?._id
const qnty=req.body.quantity

const UpdateProduct=await cartModel.updateOne({_id:productId},{...(qnty &&{quantity:qnty})})

res.json({
    message:"ok",
    data:UpdateProduct,
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
module.exports= updateCartProductController