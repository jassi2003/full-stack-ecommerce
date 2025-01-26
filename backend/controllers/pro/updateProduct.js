const productModel = require("../../models/productModel")
const uploadProductPermission=require("../../helpers/permission")
const { findByIdAndUpdate } = require("../../models/userModel")



async function updateProductController(req,res){
    try{

if(!uploadProductPermission(req.userId)){
    throw new Error("permission denied")
}
const{_id, ...resBody}=req.body

const updateProdut= await productModel.findByIdAndUpdate(_id,resBody)

res.status(201).json({
    message:"product updated successfully",
    error:false,
    success:true,
    data:updateProdut
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

module.exports=updateProductController