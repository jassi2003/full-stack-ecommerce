const productModel = require("../../models/productModel")

const getCategoryProductController=async(req,res)=>{
    try{
const productCategory= await productModel.distinct("category")
// console.log("category",productCategory)

//array to store product from each category
const productByCategory=[];

for(const category of productCategory){
    const product=await productModel.findOne({category})

    if(product){
        productByCategory.push(product);
    }
}
res.json({
    message:"product category",
    error:false,
    success:true,
    data:productByCategory
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
module.exports= getCategoryProductController