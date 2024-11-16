const express=require('express');
const userSignupController=require('../controllers/user/user.signup')


const router=express.Router();

router.post("/signup",userSignupController)
module.exports=router;