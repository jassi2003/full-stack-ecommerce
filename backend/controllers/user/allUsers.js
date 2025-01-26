const userModel=require("../../models/userModel")

async function allUsers(req,res){
    try{
console.log("users id of all users",req.userId)
const userFind=await userModel.find()
res.json({
    message:"all users details",
    data:userFind,
    success:true,
    error:false
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

module.exports=allUsers;