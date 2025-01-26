const addToCartModel = require("../../models/addToCart")

const addToCartController=async(req,res)=>{
    try{
const {productId}=req?.body
const currentUser=req.userId

const isProductAvailable= await addToCartModel.findOne({productId})
// console.log("addtocrt",isProductAvailable)
if(isProductAvailable){
    return res.json({
        message:"product already exists",
        success:false,
        error:true
    })
}

const payload={
    productId:productId,
    quantity:1,
    userId:currentUser
}

const newAddToCart=new addToCartModel(payload)

const saveProduct=await newAddToCart.save()
return res.json({
    error:false,
    success:true,
    data:saveProduct,
    message:"product added to cart successfully"
})



    }
    catch(err){
        res.status(400).json({
            error:true,
            success:false,
            message:err.message ||err
        })
    }
}

module.exports = addToCartController