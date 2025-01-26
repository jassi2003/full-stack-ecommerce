

async function userLogoutController(req,res){
    try{
res.clearCookie("token")

res.json({
    message:"logged out successfully",
    error:false,
    success:true,
    data:[]
})
    }
    catch(error){
        res.json({
            message:error.message || error,
            error:true,
            success:false,
        })  
    }
}

module.exports=userLogoutController