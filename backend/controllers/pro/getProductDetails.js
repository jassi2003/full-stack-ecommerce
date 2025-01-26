const productModel=require("../../models/productModel")

const getProductDetailsController= async(req,res)=>{
    try{
const {productId}=req.body;
const getDetails=await productModel.findById(productId)

res.json({
    success:true,
    error:false,
    data:getDetails,
    message:"product details ok"
})
    }
    catch(err){
        res.json({
            success:false,
            error:true,
            message:err?.message || err,
        })
    }

}

module.exports=getProductDetailsController