const productModel = require("../../models/productModel")
 

const searchProductController= async(req,res)=>{
    try{

const query=req.query.q
// console.log("backend query",query)
const regex=new RegExp(query,"i","g")
const product= await productModel.find({
    "$or" : [
        {productName:regex},
        { category:regex}
    ]
})
res.json({
    message:"ok",
    error:false,
    success:true,
    data:product
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

module.exports= searchProductController