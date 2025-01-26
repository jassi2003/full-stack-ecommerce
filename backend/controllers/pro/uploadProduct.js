const productModel = require("../../models/productModel")
const uploadProductPermission=require("../../helpers/permission")

async function uploadProductController(req,res){
    try{
        console.log("Request body:", req.body); // Debugging
        const sessionUserId=req.userId
        if(!uploadProductPermission(sessionUserId)){
            throw new Error("permission denied")
        }


const uploadProduct=new productModel(req.body)
const saveProduct=await uploadProduct.save()
res.status(201).json({
    message:"product uploaded successfully",
    success:true,
    error:false,
    data:saveProduct
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

module.exports = uploadProductController
