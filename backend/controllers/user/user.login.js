const userModel = require("../../models/userModel"); // Updated path
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')


async function userLoginController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            throw new Error("Email is required");
        }

        if (!password) {
            throw new Error("Password is required");
        }

    const findUser= await userModel.findOne({email})
    if(!findUser){
        throw new Error("email was incorrect");
 }

 const checkPassword= await bcrypt.compare(password,findUser.password)
console.log("checkdpass",checkPassword)
       
if(checkPassword){
const tokenData={
    _id:findUser._id,
    email:findUser.email,
}
const token=await jwt.sign(tokenData,process.env.TOKEN_SECRET_KEY,{expiresIn:60*60*8});
const tokenOption={
    httpOnly:true,
    secure:true
}
res.cookie("token",token,tokenOption).status(200).json({
    message:"Successfully logged In...",
    data:token,
    success:true,
    error:false
})
}else{
    throw new Error(" password was incorrect");
}

}  catch(error){
        res.json({
            message:error.message || error,
            error:true,
            success:false,
        })
    }
}

module.exports= userLoginController
